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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payments_service_1 = require("./payments.service");
const dto_1 = require("./dto");
let PaymentsController = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    getPublicKey() {
        return this.paymentsService.getPublicKey();
    }
    async createPaymentOrder(dto) {
        return this.paymentsService.createPaymentOrder(dto);
    }
    async verifyPayment(dto) {
        return this.paymentsService.verifyPayment(dto);
    }
    async getUserOrders(userId) {
        return this.paymentsService.getUserOrders(userId);
    }
    async getPaymentsByOrderId(orderId) {
        return this.paymentsService.getPaymentsByOrderId(orderId);
    }
    async createEnrollment(dto) {
        return this.paymentsService.createEnrollment(dto);
    }
    async getAllEnrollments() {
        return this.paymentsService.getAllEnrollments();
    }
    async getUserEnrollments(userId) {
        return this.paymentsService.getUserEnrollments(userId);
    }
    async getCourseEnrollments(courseId) {
        return this.paymentsService.getCourseEnrollments(courseId);
    }
    async checkEnrollment(dto) {
        return this.paymentsService.checkEnrollment(dto);
    }
    async updateEnrollmentStatus(dto) {
        return this.paymentsService.updateEnrollmentStatus(dto);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get public Razorpay Key ID for client checkout integration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Razorpay Key ID and status' }),
    (0, common_1.Get)('key'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "getPublicKey", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a Razorpay payment order for course purchase' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Order created with Razorpay order details and DB order ID' }),
    (0, common_1.Post)('create-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePaymentOrderDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "createPaymentOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Verify Razorpay signature, record payment, and activate enrollment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Verification result and enrollment details' }),
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.VerifyPaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "verifyPayment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all payment orders for a user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: Number, description: 'Student User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of payment orders' }),
    (0, common_1.Post)('orders/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getUserOrders", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get payment transaction records by internal order ID' }),
    (0, swagger_1.ApiParam)({ name: 'orderId', type: Number, description: 'Payment Order ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of payment transaction attempts' }),
    (0, common_1.Post)('history/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getPaymentsByOrderId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Enroll student in a course directly (e.g. manual / offline enrollment)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Enrollment created' }),
    (0, common_1.Post)('enrollments/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateEnrollmentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "createEnrollment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all course enrollments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all course enrollments' }),
    (0, common_1.Post)('enrollments/getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getAllEnrollments", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get enrollments for a specific user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: Number, description: 'Student User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of user course enrollments' }),
    (0, common_1.Post)('enrollments/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getUserEnrollments", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all enrollments for a specific course' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', type: Number, description: 'Course ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of course enrollments' }),
    (0, common_1.Post)('enrollments/course/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getCourseEnrollments", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Check if student is enrolled and has active paid access to course' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Access status and enrollment info' }),
    (0, common_1.Post)('enrollments/check'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CheckEnrollmentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "checkEnrollment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update enrollment payment status (pending, paid, failed, refunded)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status update result' }),
    (0, common_1.Post)('enrollments/update-status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateEnrollmentStatusDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "updateEnrollmentStatus", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, swagger_1.ApiTags)('Payments'),
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map