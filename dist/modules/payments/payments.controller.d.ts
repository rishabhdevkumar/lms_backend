import { PaymentsService } from './payments.service';
import { CreatePaymentOrderDto, VerifyPaymentDto, CreateEnrollmentDto, UpdateEnrollmentStatusDto, CheckEnrollmentDto } from './dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    getPublicKey(): {
        ok: boolean;
        key_id: string;
        configured: boolean;
    };
    createPaymentOrder(dto: CreatePaymentOrderDto): Promise<{
        ok: boolean;
        msg: string;
        alreadyEnrolled?: undefined;
        order_id?: undefined;
        order_number?: undefined;
        gateway_order_id?: undefined;
        amount?: undefined;
        currency?: undefined;
        razorpay_order?: undefined;
        key_id?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        alreadyEnrolled: boolean;
        msg: string;
        order_id?: undefined;
        order_number?: undefined;
        gateway_order_id?: undefined;
        amount?: undefined;
        currency?: undefined;
        razorpay_order?: undefined;
        key_id?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        msg: string;
        order_id: any;
        order_number: string;
        gateway_order_id: string;
        amount: number;
        currency: string;
        razorpay_order: any;
        key_id: string;
        alreadyEnrolled?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        msg: string;
        error: any;
        alreadyEnrolled?: undefined;
        order_id?: undefined;
        order_number?: undefined;
        gateway_order_id?: undefined;
        amount?: undefined;
        currency?: undefined;
        razorpay_order?: undefined;
        key_id?: undefined;
    }>;
    createDynamicUpiQr(orderId: number): Promise<{
        ok: boolean;
        msg: string;
        order_id: any;
        qr_id: any;
        qr_image_url: any;
        qr_expires_at: any;
        amount: number;
        currency: any;
        order_number?: undefined;
        qr_status?: undefined;
    } | {
        ok: boolean;
        msg: string;
        order_id: any;
        order_number: any;
        qr_id: any;
        qr_image_url: any;
        qr_expires_at: string;
        amount: number;
        currency: any;
        qr_status: any;
    } | {
        ok: boolean;
        msg: any;
        order_id?: undefined;
        qr_id?: undefined;
        qr_image_url?: undefined;
        qr_expires_at?: undefined;
        amount?: undefined;
        currency?: undefined;
        order_number?: undefined;
        qr_status?: undefined;
    }>;
    verifyPayment(dto: VerifyPaymentDto): Promise<{
        ok: boolean;
        msg: string;
        order_id?: undefined;
        payment_id?: undefined;
        gateway_payment_id?: undefined;
        enrollment_id?: undefined;
        users_id?: undefined;
        course_id?: undefined;
        amount?: undefined;
        currency?: undefined;
        status?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        msg: string;
        order_id: any;
        payment_id: any;
        gateway_payment_id: string;
        enrollment_id: number;
        users_id: any;
        course_id: any;
        amount: any;
        currency: any;
        status: string;
        error?: undefined;
    } | {
        ok: boolean;
        msg: string;
        error: any;
        order_id?: undefined;
        payment_id?: undefined;
        gateway_payment_id?: undefined;
        enrollment_id?: undefined;
        users_id?: undefined;
        course_id?: undefined;
        amount?: undefined;
        currency?: undefined;
        status?: undefined;
    }>;
    getUserOrders(userId: number): Promise<{
        ok: boolean;
        data: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: any;
        data?: undefined;
    }>;
    getPaymentsByOrderId(orderId: number): Promise<{
        ok: boolean;
        data: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: any;
        data?: undefined;
    }>;
    createEnrollment(dto: CreateEnrollmentDto): Promise<{
        ok: boolean;
        msg: string;
        data: any;
    } | {
        ok: boolean;
        msg: any;
        data?: undefined;
    }>;
    getAllEnrollments(): Promise<{
        ok: boolean;
        data: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: any;
        data?: undefined;
    }>;
    getUserEnrollments(userId: number): Promise<{
        ok: boolean;
        data: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: any;
        data?: undefined;
    }>;
    getCourseEnrollments(courseId: number): Promise<{
        ok: boolean;
        data: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: any;
        data?: undefined;
    }>;
    checkEnrollment(dto: CheckEnrollmentDto): Promise<{
        ok: boolean;
        data: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: any;
        data?: undefined;
    }>;
    updateEnrollmentStatus(dto: UpdateEnrollmentStatusDto): Promise<{
        ok: boolean;
        msg: string;
        data: any;
    } | {
        ok: boolean;
        msg: any;
        data?: undefined;
    }>;
}
