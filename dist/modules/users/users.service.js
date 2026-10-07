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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
const jwt = require("jsonwebtoken");
let UsersService = UsersService_1 = class UsersService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async add(dto) {
        if (!dto || !dto.name || !dto.email || !dto.password) {
            return { ok: false, msg: 'Name, email, and password are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_users_add(?, ?, ?, ?)', [dto.name, dto.email, dto.password, dto.role || 'student']);
            let responseObj = null;
            if (Array.isArray(result)) {
                for (const resultSet of result) {
                    if (Array.isArray(resultSet) && resultSet.length > 0) {
                        const firstRow = resultSet[0];
                        if (firstRow && ('ok' in firstRow || 'msg' in firstRow)) {
                            responseObj = firstRow;
                            break;
                        }
                    }
                }
            }
            if (!responseObj) {
                responseObj = result?.[0]?.[0] || { ok: false, msg: 'No response from database' };
            }
            if (responseObj.ok !== undefined) {
                responseObj.ok = Boolean(responseObj.ok);
            }
            if (typeof responseObj.data === 'string') {
                try {
                    responseObj.data = JSON.parse(responseObj.data);
                }
                catch (e) {
                }
            }
            return responseObj;
        }
        catch (error) {
            this.logger.error('Error in add user:', error);
            return { ok: false, msg: 'An error occurred while adding user', error: error.message };
        }
    }
    async authenticate(body) {
        const identifier = body.email;
        const { password } = body;
        if (!identifier || !password) {
            return { ok: false, msg: 'Email and password are mandatory' };
        }
        try {
            const rows = await this.db.execute('CALL sp_users_authenticate(?,?)', [
                identifier,
                password,
            ]);
            const authResult = rows[0]?.[0];
            if (authResult) {
                if (authResult.ok === true || authResult.ok === 1) {
                    authResult.ok = true;
                    const secret = process.env.TOKEN_SECRET || 'your_secret_key';
                    let userData = authResult.data;
                    if (typeof userData === 'string') {
                        try {
                            userData = JSON.parse(userData);
                        }
                        catch (e) {
                        }
                    }
                    const payloadId = userData?.id || authResult.id;
                    const payloadRollNo = userData?.roll_no || authResult.roll_no;
                    const payloadEmail = userData?.email || authResult.email;
                    const token = jwt.sign({ id: payloadId, roll_no: payloadRollNo, email: payloadEmail }, secret, { expiresIn: '24h' });
                    if (typeof authResult.data === 'object' && authResult.data !== null) {
                        authResult.data.token = token;
                    }
                    else {
                        authResult.token = token;
                    }
                    return authResult;
                }
                else {
                    authResult.ok = Boolean(authResult.ok);
                    return authResult;
                }
            }
            return { ok: false, msg: 'Invalid credentials' };
        }
        catch (err) {
            this.logger.error('Error in user authenticate:', err);
            return { ok: false, msg: 'Server error', error: err.message };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_users_getall()', []);
            return data[0] || [];
        }
        catch (error) {
            this.logger.error('Error in users getall:', error);
            return [];
        }
    }
    async update(dto) {
        if (!dto || !dto.id) {
            return { ok: false, msg: 'User ID is required' };
        }
        let phoneStr = null;
        if (dto.phone !== undefined && dto.phone !== null && String(dto.phone).trim() !== '') {
            phoneStr = String(dto.phone).trim();
            if (!/^[0-9]{10}$/.test(phoneStr)) {
                return { ok: false, msg: 'Phone number must contain exactly 10 digits' };
            }
        }
        const nameStr = dto.name !== undefined && dto.name !== null && String(dto.name).trim() !== '' ? String(dto.name).trim() : null;
        const emailStr = dto.email !== undefined && dto.email !== null && String(dto.email).trim() !== '' ? String(dto.email).trim() : null;
        const passwordStr = dto.password !== undefined && dto.password !== null && String(dto.password).trim() !== '' ? String(dto.password).trim() : null;
        if (!nameStr && !emailStr && !passwordStr && !phoneStr) {
            return { ok: false, msg: 'At least one field (name, email, password, or phone) must be provided for update' };
        }
        try {
            const result = await this.db.execute('CALL sp_users_update(?, ?, ?, ?, ?)', [dto.id, nameStr, emailStr, passwordStr, phoneStr]);
            const resObj = result?.[0]?.[0];
            if (resObj) {
                if (resObj.ok !== undefined)
                    resObj.ok = Boolean(resObj.ok);
                return resObj;
            }
            return { ok: true, msg: 'User updated successfully' };
        }
        catch (error) {
            this.logger.error('Error in update user:', error);
            return { ok: false, msg: 'Failed to update user', error: error.message };
        }
    }
    async details(userId) {
        try {
            const rows = await this.db.execute('CALL sp_users_get_by_id(?)', [Number(userId) || userId]);
            if (rows[0] && rows[0].length > 0) {
                return { ok: true, data: rows[0][0] };
            }
            else {
                return { ok: false, msg: 'User not found' };
            }
        }
        catch (err) {
            this.logger.error('Error in user details:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
    async getSelf(userId) {
        try {
            const rows = await this.db.execute('CALL sp_users_get_by_id(?)', [userId]);
            if (rows[0] && rows[0].length > 0) {
                return { ok: true, user: rows[0][0] };
            }
            return { ok: false, msg: 'User not found' };
        }
        catch (error) {
            return { ok: false, msg: 'Database error: ' + error.message, user: {} };
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UsersService);
//# sourceMappingURL=users.service.js.map