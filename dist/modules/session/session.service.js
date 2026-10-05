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
var SessionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let SessionService = SessionService_1 = class SessionService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(SessionService_1.name);
    }
    async add(c) {
        if (!c.session_name || !c.short_name) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_session_add(?, ?)', [
                c.session_name,
                c.short_name,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding session:', error);
            return { ok: false, msg: 'An error occurred while adding the session' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_session_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error getting sessions:', error);
            return [];
        }
    }
    async update(se) {
        if (!se.id || !se.session_name || !se.short_name) {
            return { ok: false, msg: 'All data is mandatory' };
        }
        try {
            const data = await this.db.execute('CALL sp_session_update(?, ?, ?)', [
                se.id,
                se.session_name,
                se.short_name,
            ]);
            return { ok: true, result: data[0][0] };
        }
        catch (err) {
            this.logger.error('Update session error:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
    async search(s) {
        try {
            const data = await this.db.execute('CALL sp_session_search(?,?,?,?)', [
                s.session_name || '',
                s.short_name || '',
                s.rc || 5,
                s.page || 1,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error searching sessions:', error);
            return [];
        }
    }
    async delete(id) {
        try {
            await this.db.execute('CALL sp_session_delete(?)', [id]);
            return { ok: true, msg: 'Session deleted successfully' };
        }
        catch (err) {
            this.logger.error('Delete session error:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = SessionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SessionService);
//# sourceMappingURL=session.service.js.map