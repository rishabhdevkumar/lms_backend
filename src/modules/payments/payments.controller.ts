import { Controller, Get, Post, Body, Param , ParseIntPipe,} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import {
  CreatePaymentOrderDto,
  VerifyPaymentDto,
  CreateEnrollmentDto,
  UpdateEnrollmentStatusDto,
  CheckEnrollmentDto,
} from './dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @ApiOperation({ summary: 'Get public Razorpay Key ID for client checkout integration' })
  @ApiResponse({ status: 200, description: 'Razorpay Key ID and status' })
  @Get('key')
  getPublicKey() {
    return this.paymentsService.getPublicKey();
  }

  @ApiOperation({ summary: 'Create a Razorpay payment order for course purchase' })
  @ApiResponse({ status: 201, description: 'Order created with Razorpay order details and DB order ID' })
  @Post('create-order')
  async createPaymentOrder(@Body() dto: CreatePaymentOrderDto) {
    return this.paymentsService.createPaymentOrder(dto);
  }

  @Post('create-qr/:orderId')
  async createDynamicUpiQr(
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    return this.paymentsService.createDynamicUpiQr(orderId);
  }

  @ApiOperation({ summary: 'Verify Razorpay signature, record payment, and activate enrollment' })
  @ApiResponse({ status: 200, description: 'Verification result and enrollment details' })
  @Post('verify')
  async verifyPayment(@Body() dto: VerifyPaymentDto) {
    return this.paymentsService.verifyPayment(dto);
  }

  @ApiOperation({ summary: 'Get all payment orders for a user' })
  @ApiParam({ name: 'userId', type: Number, description: 'Student User ID' })
  @ApiResponse({ status: 200, description: 'List of payment orders' })
  @Post('orders/user/:userId')
  async getUserOrders(@Param('userId') userId: number) {
    return this.paymentsService.getUserOrders(userId);
  }

  @ApiOperation({ summary: 'Get payment transaction records by internal order ID' })
  @ApiParam({ name: 'orderId', type: Number, description: 'Payment Order ID' })
  @ApiResponse({ status: 200, description: 'List of payment transaction attempts' })
  @Post('history/:orderId')
  async getPaymentsByOrderId(@Param('orderId') orderId: number) {
    return this.paymentsService.getPaymentsByOrderId(orderId);
  }

  @ApiOperation({ summary: 'Enroll student in a course directly (e.g. manual / offline enrollment)' })
  @ApiResponse({ status: 201, description: 'Enrollment created' })
  @Post('enrollments/create')
  async createEnrollment(@Body() dto: CreateEnrollmentDto) {
    return this.paymentsService.createEnrollment(dto);
  }

  @ApiOperation({ summary: 'Get all course enrollments' })
  @ApiResponse({ status: 200, description: 'List of all course enrollments' })
  @Post('enrollments/getall')
  async getAllEnrollments() {
    return this.paymentsService.getAllEnrollments();
  }

  @ApiOperation({ summary: 'Get enrollments for a specific user' })
  @ApiParam({ name: 'userId', type: Number, description: 'Student User ID' })
  @ApiResponse({ status: 200, description: 'List of user course enrollments' })
  @Post('enrollments/user/:userId')
  async getUserEnrollments(@Param('userId') userId: number) {
    return this.paymentsService.getUserEnrollments(userId);
  }

  @ApiOperation({ summary: 'Get all enrollments for a specific course' })
  @ApiParam({ name: 'courseId', type: Number, description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'List of course enrollments' })
  @Post('enrollments/course/:courseId')
  async getCourseEnrollments(@Param('courseId') courseId: number) {
    return this.paymentsService.getCourseEnrollments(courseId);
  }

  @ApiOperation({ summary: 'Check if student is enrolled and has active paid access to course' })
  @ApiResponse({ status: 200, description: 'Access status and enrollment info' })
  @Post('enrollments/check')
  async checkEnrollment(@Body() dto: CheckEnrollmentDto) {
    return this.paymentsService.checkEnrollment(dto);
  }

  @ApiOperation({ summary: 'Update enrollment payment status (pending, paid, failed, refunded)' })
  @ApiResponse({ status: 200, description: 'Status update result' })
  @Post('enrollments/update-status')
  async updateEnrollmentStatus(@Body() dto: UpdateEnrollmentStatusDto) {
    return this.paymentsService.updateEnrollmentStatus(dto);
  }
}
