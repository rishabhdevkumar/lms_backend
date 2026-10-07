"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let JwtAuthGuard = class JwtAuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        let token = request.headers['authorization'] || request.headers['Authorization'];
        if (!token) {
            const response = context.switchToHttp().getResponse();
            response.status(200).json({
                ok: false,
                type: 'LOGIN',
                msg: 'No token provided',
            });
            return false;
        }
        if (typeof token === 'string' && token.startsWith('Bearer ')) {
            token = token.slice(7).trim();
        }
        try {
            const secret = process.env.TOKEN_SECRET || 'your_secret_key';
            const decoded = jwt.verify(token, secret);
            request.user = decoded;
            request.student = decoded;
            request.faculty = decoded;
            return true;
        }
        catch (err) {
            const response = context.switchToHttp().getResponse();
            response.status(200).json({
                ok: false,
                type: 'LOGIN',
                msg: 'Invalid token',
            });
            return false;
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map