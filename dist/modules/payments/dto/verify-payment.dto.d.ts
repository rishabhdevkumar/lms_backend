export declare class VerifyPaymentDto {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    users_id?: number;
    course_id?: number;
    payment_method?: string;
}
