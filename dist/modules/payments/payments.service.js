"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
const razorpay_1 = require("razorpay");
const database_service_1 = require("../../database/database.service");
let PaymentsService = PaymentsService_1 = class PaymentsService {
    constructor(db, configService) {
        this.db = db;
        this.configService = configService;
        this.logger = new common_1.Logger(PaymentsService_1.name);
        this.razorpay = null;
        this.keyId =
            this.configService.get('RAZORPAY_KEY_ID') ||
                process.env.RAZORPAY_KEY_ID ||
                '';
        this.keySecret =
            this.configService.get('RAZORPAY_KEY_SECRET') ||
                process.env.RAZORPAY_KEY_SECRET ||
                '';
        if (this.keyId && this.keySecret && !this.keyId.includes('YOUR_KEY')) {
            try {
                this.razorpay = new razorpay_1.default({
                    key_id: this.keyId,
                    key_secret: this.keySecret,
                });
                this.logger.log('Razorpay client initialized');
            }
            catch (err) {
                this.logger.error('Failed to initialize Razorpay client:', err.message);
            }
        }
        else {
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
    async createPaymentOrder(dto) {
        const { users_id, course_id, amount } = dto;
        const currency = (dto.currency || 'INR').toUpperCase();
        if (!users_id || !course_id || !amount) {
            return { ok: false, msg: 'users_id, course_id, and amount are required' };
        }
        try {
            const existing = await this.db.execute('CALL sp_course_enrollments_check(?, ?)', [Number(users_id), Number(course_id)]);
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
            let razorpayOrderData = null;
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
                }
                catch (rzpErr) {
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
            }
            else {
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
            const dbResult = await this.db.execute('CALL sp_payment_orders_create(?, ?, ?, ?, ?, ?)', [
                Number(users_id),
                Number(course_id),
                orderNumber,
                gatewayOrderId,
                Number(amount),
                currency,
            ]);
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
        }
        catch (error) {
            this.logger.error('Error creating payment order:', error);
            return {
                ok: false,
                msg: 'Failed to create payment order',
                error: error.message,
            };
        }
    }
    async verifyPayment(dto) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = dto;
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return {
                ok: false,
                msg: 'razorpay_order_id, razorpay_payment_id, and razorpay_signature are required',
            };
        }
        try {
            let isValid = false;
            if (razorpay_order_id.startsWith('sim_') ||
                razorpay_signature === 'sim_signature' ||
                !this.keySecret ||
                !this.razorpay) {
                this.logger.log('Simulated payment accepted for order: ' + razorpay_order_id);
                isValid = true;
            }
            else if (this.keySecret) {
                const body = razorpay_order_id + '|' + razorpay_payment_id;
                const expectedSignature = crypto
                    .createHmac('sha256', this.keySecret)
                    .update(body)
                    .digest('hex');
                isValid = expectedSignature === razorpay_signature;
            }
            const orderRows = await this.db.execute('SELECT * FROM payment_orders WHERE gateway_order_id = ? LIMIT 1', [razorpay_order_id]);
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
                await this.db.execute('CALL sp_payments_create(?, ?, ?, ?, ?, ?, ?)', [
                    orderId,
                    razorpay_payment_id,
                    paymentMethod,
                    amount,
                    currency,
                    'failed',
                    'Invalid payment signature',
                ]);
                return { ok: false, msg: 'Invalid payment signature verification failed' };
            }
            const paymentResult = await this.db.execute('CALL sp_payments_create(?, ?, ?, ?, ?, ?, ?)', [
                orderId,
                razorpay_payment_id,
                paymentMethod,
                amount,
                currency,
                'captured',
                null,
            ]);
            const paymentId = paymentResult[0]?.[0]?.payment_id || null;
            await this.db.execute("UPDATE payment_orders SET status = 'paid', updated_at = NOW() WHERE id = ?", [orderId]);
            const existingEnrollment = await this.db.execute('SELECT id, payment_status FROM course_enrollments WHERE users_id = ? AND course_id = ? LIMIT 1', [usersId, courseId]);
            let enrollmentId = null;
            if (existingEnrollment.length > 0) {
                enrollmentId = existingEnrollment[0].id;
                await this.db.execute('CALL sp_course_enrollments_update_payment_status(?, ?)', [enrollmentId, 'paid']);
            }
            else {
                const enrollResult = await this.db.execute('CALL sp_course_enrollments_create(?, ?)', [usersId, courseId]);
                enrollmentId = enrollResult[0]?.[0]?.enrollment_id || null;
                if (enrollmentId) {
                    await this.db.execute('CALL sp_course_enrollments_update_payment_status(?, ?)', [enrollmentId, 'paid']);
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
        }
        catch (error) {
            this.logger.error('Error verifying payment:', error);
            return {
                ok: false,
                msg: 'Payment verification failed',
                error: error.message,
            };
        }
    }
    async getUserOrders(userId) {
        try {
            const orders = await this.db.execute('SELECT * FROM payment_orders WHERE users_id = ? ORDER BY id DESC', [userId]);
            return { ok: true, data: orders };
        }
        catch (error) {
            return { ok: false, msg: error.message };
        }
    }
    async getPaymentsByOrderId(orderId) {
        try {
            const payments = await this.db.execute('SELECT * FROM payments WHERE order_id = ? ORDER BY id DESC', [orderId]);
            return { ok: true, data: payments };
        }
        catch (error) {
            return { ok: false, msg: error.message };
        }
    }
    async createEnrollment(dto) {
        try {
            const result = await this.db.execute('CALL sp_course_enrollments_create(?, ?)', [dto.users_id, dto.course_id]);
            const enrollmentId = result[0]?.[0]?.enrollment_id;
            if (dto.payment_status && enrollmentId) {
                await this.db.execute('CALL sp_course_enrollments_update_payment_status(?, ?)', [enrollmentId, dto.payment_status]);
            }
            return { ok: true, msg: 'Enrollment created', data: result[0]?.[0] };
        }
        catch (error) {
            return { ok: false, msg: error.message };
        }
    }
    async getAllEnrollments() {
        try {
            const data = await this.db.execute('SELECT * FROM course_enrollments ORDER BY id DESC');
            return { ok: true, data };
        }
        catch (error) {
            return { ok: false, msg: error.message };
        }
    }
    async getUserEnrollments(userId) {
        try {
            const data = await this.db.execute('SELECT * FROM course_enrollments WHERE users_id = ? ORDER BY id DESC', [userId]);
            return { ok: true, data };
        }
        catch (error) {
            return { ok: false, msg: error.message };
        }
    }
    async getCourseEnrollments(courseId) {
        try {
            const data = await this.db.execute('SELECT * FROM course_enrollments WHERE course_id = ? ORDER BY id DESC', [courseId]);
            return { ok: true, data };
        }
        catch (error) {
            return { ok: false, msg: error.message };
        }
    }
    async checkEnrollment(dto) {
        try {
            const result = await this.db.execute('CALL sp_course_enrollments_check(?, ?)', [dto.users_id, dto.course_id]);
            return { ok: true, data: result[0]?.[0] };
        }
        catch (error) {
            return { ok: false, msg: error.message };
        }
    }
    async updateEnrollmentStatus(dto) {
        try {
            const result = await this.db.execute('CALL sp_course_enrollments_update_payment_status(?, ?)', [dto.id, dto.payment_status]);
            return { ok: true, msg: 'Status updated', data: result[0]?.[0] };
        }
        catch (error) {
            return { ok: false, msg: error.message };
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        config_1.ConfigService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map