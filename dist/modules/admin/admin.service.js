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
var AdminService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
const jwt = require("jsonwebtoken");
let AdminService = AdminService_1 = class AdminService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(AdminService_1.name);
    }
    async addAdmin(body) {
        if (!body.f_name || !body.l_name || !body.email || !body.password || !body.dob || !body.phone) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_admin_add(?, ?, ?, ?, ?, ?)', [
                body.f_name,
                body.l_name,
                body.email,
                body.password,
                body.dob,
                body.phone,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding admin:', error);
            return { ok: false, msg: 'An error occurred while adding the user' };
        }
    }
    async authenticate(body) {
        if (!body.email || !body.password) {
            return 'Email and Password are mandatory';
        }
        try {
            let data = await this.db.execute('CALL sp_admin_authenticate(?,?)', [
                body.email,
                body.password,
            ]);
            const result = data[0][0];
            if (result && result.ok) {
                const secret = process.env.TOKEN_SECRET || 'your_secret_key';
                const token = jwt.sign(result.data, secret, { expiresIn: '24h' });
                result.token = token;
            }
            return result;
        }
        catch (error) {
            this.logger.error('Authentication error:', error);
            return { ok: false, msg: 'Internal server error' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_admin_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Get all admin error:', error);
            return [];
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = AdminService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AdminService);
//# sourceMappingURL=admin.service.js.map