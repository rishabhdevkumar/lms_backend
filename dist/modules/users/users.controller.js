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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const users_dto_1 = require("./dto/users.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async add(body) {
        return this.usersService.add(body);
    }
    async authenticate(body) {
        return this.usersService.authenticate(body);
    }
    async getAll() {
        return this.usersService.getAll();
    }
    async updateRoot(body) {
        return this.usersService.update(body);
    }
    async update(body, paramId) {
        if (paramId && !body.id) {
            body.id = paramId;
        }
        return this.usersService.update(body);
    }
    async details(id) {
        return this.usersService.details(id);
    }
    async getSelf(user) {
        return this.usersService.getSelf(user?.id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add a new user' }),
    (0, swagger_1.ApiBody)({ type: users_dto_1.AddUserDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User created successfully', type: users_dto_1.UserResponseDto }),
    (0, common_1.Post)(['', 'add']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.AddUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Authenticate user and return JWT token' }),
    (0, swagger_1.ApiBody)({ type: users_dto_1.AuthenticateUserDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Authentication successful', type: users_dto_1.UserAuthTokenResponseDto }),
    (0, common_1.Post)('authenticate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.AuthenticateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "authenticate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all users', type: [users_dto_1.UserResponseDto] }),
    (0, common_1.Get)(['', 'getall']),
    (0, common_1.Post)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update existing user' }),
    (0, swagger_1.ApiBody)({ type: users_dto_1.UpdateUserDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User updated successfully' }),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateRoot", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update existing user' }),
    (0, swagger_1.ApiBody)({ type: users_dto_1.UpdateUserDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User updated successfully' }),
    (0, common_1.Post)('update'),
    (0, common_1.Put)('update'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UpdateUserDto, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get user details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID', example: '1' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User details', type: users_dto_1.UserResponseDto }),
    (0, common_1.Get)(['details/:id', ':id']),
    (0, common_1.Post)('details/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "details", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get logged in user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Current authenticated user profile', type: users_dto_1.UserResponseDto }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('get_self'),
    (0, common_1.Post)('get_self'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getSelf", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map