import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class VerifyPaymentDto {
  @ApiProperty({ example: 'order_DBJOWzybf0sJbb', description: 'Razorpay Order ID' })
  @IsNotEmpty()
  @IsString()
  razorpay_order_id: string;

  @ApiProperty({ example: 'pay_29QQoUBi66xm2f', description: 'Razorpay Payment ID' })
  @IsNotEmpty()
  @IsString()
  razorpay_payment_id: string;

  @ApiProperty({
    example: '9ef522640f25823a4d28d54529246dd099187ecf2e1a49f57fa3e6f0b005e83c',
    description: 'Razorpay signature generated on client checkout',
  })
  @IsNotEmpty()
  @IsString()
  razorpay_signature: string;

  @ApiPropertyOptional({ example: 1, description: 'Student User ID (optional fallback)' })
  @IsOptional()
  @IsNumber()
  users_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'Course ID (optional fallback)' })
  @IsOptional()
  @IsNumber()
  course_id?: number;

  @ApiPropertyOptional({ example: 'card', description: 'Payment method (card, netbanking, upi, wallet)' })
  @IsOptional()
  @IsString()
  payment_method?: string;
}
