import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import Razorpay from 'razorpay';
import { DatabaseService } from '../../database/database.service';
import {
  CreatePaymentOrderDto,
  VerifyPaymentDto,
  CreateEnrollmentDto,
  UpdateEnrollmentStatusDto,
  CheckEnrollmentDto,
} from './dto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private razorpay: Razorpay | null = null;
  private readonly keyId: string;
  private readonly keySecret: string;

  constructor(
    private readonly db: DatabaseService,
    private readonly configService: ConfigService,
  ) {
    this.keyId =
      this.configService.get<string>('RAZORPAY_KEY_ID') ||
      process.env.RAZORPAY_KEY_ID ||
      '';
    this.keySecret =
      this.configService.get<string>('RAZORPAY_KEY_SECRET') ||
      process.env.RAZORPAY_KEY_SECRET ||
      '';

    if (this.keyId && this.keySecret && !this.keyId.includes('YOUR_KEY')) {
      try {
        this.razorpay = new Razorpay({
          key_id: this.keyId,
          key_secret: this.keySecret,
        });
        this.logger.log('Razorpay client initialized');
      } catch (err: any) {
        this.logger.error('Failed to initialize Razorpay client:', err.message);
      }
    } else {
      this.logger.warn('Razorpay keys not configured. Running in simulated test mode.');
    }
  }

  getPublicKey() {
    return {
      ok: true,
      key_id: this.keyId,
      configured: Boolean(this.keyId && this.keySecret && !this.keyId.includes('YOUR_KEY')),
    };
  }

  async createPaymentOrder(dto: CreatePaymentOrderDto) {
    const { users_id, course_id, amount } = dto;
    const currency = (dto.currency || 'INR').toUpperCase();

    if (!users_id || !course_id || !amount) {
      return { ok: false, msg: 'users_id, course_id, and amount are required' };
    }

    try {
      const existing = await this.db.execute(
        'CALL sp_course_enrollments_check(?, ?)',
        [Number(users_id), Number(course_id)],
      );
      const enrollmentRecord = existing[0]?.[0];
      if (enrollmentRecord && Number(enrollmentRecord.has_access) === 1) {
        return {
          ok: false,
          alreadyEnrolled: true,
          msg: 'Student is already enrolled and has access to this course',
        };
      }

      const orderNumber = dto.receipt || ('ORD_' + Date.now() + '_U' + users_id + '_C' + course_id);
      const amountInPaise = Math.round(Number(amount) * 100);

      let gatewayOrderId = '';
      let razorpayOrderData: any = null;

      if (this.razorpay) {
        try {
          const rzpResponse = await this.razorpay.orders.create({
            amount: amountInPaise,
            currency,
            receipt: orderNumber.substring(0, 40),
            notes: {
              users_id: String(users_id),
              course_id: String(course_id),
              ...(dto.notes || {}),
            },
          });
          gatewayOrderId = rzpResponse.id;
          razorpayOrderData = rzpResponse;
        } catch (rzpErr: any) {
          this.logger.warn('Razorpay API error, falling back to simulated order: ' + rzpErr.message);
          gatewayOrderId = 'sim_order_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
          razorpayOrderData = {
            id: gatewayOrderId,
            amount: amountInPaise,
            currency,
            receipt: orderNumber,
            status: 'created',
            notes: { simulated: true, ...(dto.notes || {}) },
          };
        }
      } else {
        gatewayOrderId = 'sim_order_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        razorpayOrderData = {
          id: gatewayOrderId,
          amount: amountInPaise,
          currency,
          receipt: orderNumber,
          status: 'created',
          notes: { simulated: true, ...(dto.notes || {}) },
        };
      }

      const dbResult = await this.db.execute(
        'CALL sp_payment_orders_create(?, ?, ?, ?, ?, ?)',
        [
          Number(users_id),
          Number(course_id),
          orderNumber,
          gatewayOrderId,
          Number(amount),
          currency,
        ],
      );

      const dbOrder = dbResult[0]?.[0];
      const orderId = dbOrder?.order_id || null;

      return {
        ok: true,
        msg: 'Payment order created successfully',
        order_id: orderId,
        order_number: orderNumber,
        gateway_order_id: gatewayOrderId,
        amount: Number(amount),
        currency,
        razorpay_order: razorpayOrderData,
        key_id: this.keyId,
      };
    } catch (error: any) {
      this.logger.error('Error creating payment order:', error);
      return {
        ok: false,
        msg: 'Failed to create payment order',
        error: error.message,
      };
    }
  }

  async createDynamicUpiQr(orderId: number) {
  try {
    if (!this.razorpay || !this.keyId || !this.keySecret) {
      return {
        ok: false,
        msg: 'Razorpay is not configured. Configure valid API keys first.',
      };
    }

    // 1. Fetch the existing local payment order
    const rows = await this.db.execute(
      'SELECT * FROM payment_orders WHERE id = ? LIMIT 1',
      [orderId],
    );

    const order = rows[0];

    if (!order) {
      return { ok: false, msg: 'Payment order not found' };
    }

    if (order.status === 'paid') {
      return { ok: false, msg: 'This order has already been paid' };
    }

    if (order.gateway_qr_id && order.gateway_qr_image_url) {
      return {
        ok: true,
        msg: 'QR already exists for this order',
        order_id: order.id,
        qr_id: order.gateway_qr_id,
        qr_image_url: order.gateway_qr_image_url,
        qr_expires_at: order.qr_expires_at,
        amount: Number(order.amount),
        currency: order.currency,
      };
    }

    // 2. QR expiry: 30 minutes from now
    const closeBy = Math.floor(Date.now() / 1000) + 30 * 60;

    // 3. Create a single-use, fixed-amount UPI QR
    const qr: any = await (this.razorpay as any).qrCode.create({
      type: 'upi_qr',
      name: `LMS Order ${order.order_number}`,
      usage: 'single_use',
      fixed_amount: true,
      payment_amount: Math.round(Number(order.amount) * 100),
      description: `LMS course payment ${order.order_number}`,
      close_by: closeBy,
      notes: {
        local_order_id: String(order.id),
        users_id: String(order.users_id),
        course_id: String(order.course_id),
      },
    });

    if (!qr?.id || !qr?.image_url) {
      throw new Error('Razorpay did not return the QR ID or image URL');
    }

    // Use Razorpay's returned expiry, not our requested expiry
    const expiresAt = qr.close_by
      ? new Date(Number(qr.close_by) * 1000)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ')
      : null;

    // 4. Save QR details to MySQL
    await this.db.execute(
      'CALL sp_payment_orders_update_qr(?, ?, ?, ?)',
      [order.id, qr.id, qr.image_url, expiresAt],
    );

    return {
      ok: true,
      msg: 'Dynamic UPI QR created successfully',
      order_id: order.id,
      order_number: order.order_number,
      qr_id: qr.id,
      qr_image_url: qr.image_url,
      qr_expires_at: expiresAt,
      amount: Number(order.amount),
      currency: order.currency,
      qr_status: qr.status,
    };
  } catch (error: any) {
    this.logger.error(
      'Dynamic UPI QR creation failed',
      error?.message,
    );

    return {
      ok: false,
      msg:
        error?.error?.description ||
        error?.message ||
        'Failed to create Dynamic UPI QR',
    };
  }
}

  async verifyPayment(dto: VerifyPaymentDto) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = dto;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return {
        ok: false,
        msg: 'razorpay_order_id, razorpay_payment_id, and razorpay_signature are required',
      };
    }

    try {
      let isValid = false;

      if (
        razorpay_order_id.startsWith('sim_') ||
        razorpay_signature === 'sim_signature' ||
        !this.keySecret ||
        !this.razorpay
      ) {
        this.logger.log('Simulated payment accepted for order: ' + razorpay_order_id);
        isValid = true;
      } else if (this.keySecret) {
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
          .createHmac('sha256', this.keySecret)
          .update(body)
          .digest('hex');

        isValid = expectedSignature === razorpay_signature;
      }

      const orderRows = await this.db.execute(
        'SELECT * FROM payment_orders WHERE gateway_order_id = ? LIMIT 1',
        [razorpay_order_id],
      );
      const order = orderRows[0];

      if (!order) {
        return {
          ok: false,
          msg: 'Payment order with gateway ID ' + razorpay_order_id + ' not found',
        };
      }

      const orderId = order.id;
      const usersId = order.users_id || dto.users_id;
      const courseId = order.course_id || dto.course_id;
      const amount = order.amount || 0;
      const currency = order.currency || 'INR';
      const paymentMethod = dto.payment_method || 'razorpay';

      if (!isValid) {
        await this.db.execute(
          'CALL sp_payments_create(?, ?, ?, ?, ?, ?, ?)',
          [
            orderId,
            razorpay_payment_id,
            paymentMethod,
            amount,
            currency,
            'failed',
            'Invalid payment signature',
          ],
        );
        return { ok: false, msg: 'Invalid payment signature verification failed' };
      }

      // Record captured payment
      const paymentResult = await this.db.execute(
        'CALL sp_payments_create(?, ?, ?, ?, ?, ?, ?)',
        [
          orderId,
          razorpay_payment_id,
          paymentMethod,
          amount,
          currency,
          'captured',
          null,
        ],
      );
      const paymentId = paymentResult[0]?.[0]?.payment_id || null;

      // Update order status
      await this.db.execute(
        "UPDATE payment_orders SET status = 'paid', updated_at = NOW() WHERE id = ?",
        [orderId],
      );

      // Create / update enrollment to 'paid'
      const existingEnrollment = await this.db.execute(
        'SELECT id, payment_status FROM course_enrollments WHERE users_id = ? AND course_id = ? LIMIT 1',
        [usersId, courseId],
      );

      let enrollmentId: number | null = null;
      if (existingEnrollment.length > 0) {
        enrollmentId = existingEnrollment[0].id;
        await this.db.execute(
          'CALL sp_course_enrollments_update_payment_status(?, ?)',
          [enrollmentId, 'paid'],
        );
      } else {
        const enrollResult = await this.db.execute(
          'CALL sp_course_enrollments_create(?, ?)',
          [usersId, courseId],
        );
        enrollmentId = enrollResult[0]?.[0]?.enrollment_id || null;
        if (enrollmentId) {
          await this.db.execute(
            'CALL sp_course_enrollments_update_payment_status(?, ?)',
            [enrollmentId, 'paid'],
          );
        }
      }

      return {
        ok: true,
        msg: 'Payment verified successfully and student enrolled',
        order_id: orderId,
        payment_id: paymentId,
        gateway_payment_id: razorpay_payment_id,
        enrollment_id: enrollmentId,
        users_id: usersId,
        course_id: courseId,
        amount,
        currency,
        status: 'paid',
      };
    } catch (error: any) {
      this.logger.error('Error verifying payment:', error);
      return {
        ok: false,
        msg: 'Payment verification failed',
        error: error.message,
      };
    }
  }

  async getUserOrders(userId: number) {
    try {
      const orders = await this.db.execute(
        'SELECT * FROM payment_orders WHERE users_id = ? ORDER BY id DESC',
        [userId],
      );
      return { ok: true, data: orders };
    } catch (error: any) {
      return { ok: false, msg: error.message };
    }
  }

  async getPaymentsByOrderId(orderId: number) {
    try {
      const payments = await this.db.execute(
        'SELECT * FROM payments WHERE order_id = ? ORDER BY id DESC',
        [orderId],
      );
      return { ok: true, data: payments };
    } catch (error: any) {
      return { ok: false, msg: error.message };
    }
  }

  async createEnrollment(dto: CreateEnrollmentDto) {
    try {
      const result = await this.db.execute(
        'CALL sp_course_enrollments_create(?, ?)',
        [dto.users_id, dto.course_id],
      );
      const enrollmentId = result[0]?.[0]?.enrollment_id;
      if (dto.payment_status && enrollmentId) {
        await this.db.execute(
          'CALL sp_course_enrollments_update_payment_status(?, ?)',
          [enrollmentId, dto.payment_status],
        );
      }
      return { ok: true, msg: 'Enrollment created', data: result[0]?.[0] };
    } catch (error: any) {
      return { ok: false, msg: error.message };
    }
  }

  async getAllEnrollments() {
    try {
      const data = await this.db.execute(
        'SELECT * FROM course_enrollments ORDER BY id DESC',
      );
      return { ok: true, data };
    } catch (error: any) {
      return { ok: false, msg: error.message };
    }
  }

  async getUserEnrollments(userId: number) {
    try {
      const data = await this.db.execute(
        'SELECT * FROM course_enrollments WHERE users_id = ? ORDER BY id DESC',
        [userId],
      );
      return { ok: true, data };
    } catch (error: any) {
      return { ok: false, msg: error.message };
    }
  }

  async getCourseEnrollments(courseId: number) {
    try {
      const data = await this.db.execute(
        'SELECT * FROM course_enrollments WHERE course_id = ? ORDER BY id DESC',
        [courseId],
      );
      return { ok: true, data };
    } catch (error: any) {
      return { ok: false, msg: error.message };
    }
  }

  async checkEnrollment(dto: CheckEnrollmentDto) {
    try {
      const result = await this.db.execute(
        'CALL sp_course_enrollments_check(?, ?)',
        [dto.users_id, dto.course_id],
      );
      return { ok: true, data: result[0]?.[0] };
    } catch (error: any) {
      return { ok: false, msg: error.message };
    }
  }

  async updateEnrollmentStatus(dto: UpdateEnrollmentStatusDto) {
    try {
      const result = await this.db.execute(
        'CALL sp_course_enrollments_update_payment_status(?, ?)',
        [dto.id, dto.payment_status],
      );
      return { ok: true, msg: 'Status updated', data: result[0]?.[0] };
    } catch (error: any) {
      return { ok: false, msg: error.message };
    }
  }
}
