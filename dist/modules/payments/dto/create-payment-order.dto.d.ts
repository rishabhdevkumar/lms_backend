export declare class CreatePaymentOrderDto {
    users_id: number;
    course_id: number;
    amount: number;
    currency?: string;
    receipt?: string;
    notes?: Record<string, any>;
}
