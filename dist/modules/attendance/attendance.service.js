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
var AttendanceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let AttendanceService = AttendanceService_1 = class AttendanceService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(AttendanceService_1.name);
    }
    async add(dto) {
        if (!dto.session_id || !dto.users_id || !dto.status || !dto.marked_by) {
            return {
                ok: false,
                msg: 'session_id, users_id, status, and marked_by are all required',
            };
        }
        try {
            const result = await this.db.execute('CALL sp_attendance_add(?, ?, ?, ?)', [
                Number(dto.session_id),
                Number(dto.users_id),
                String(dto.status).toLowerCase(),
                Number(dto.marked_by),
            ]);
            const response = result[0]?.[0];
            return response || { ok: true, msg: 'Attendance marked successfully' };
        }
        catch (error) {
            this.logger.error('Error marking attendance:', error);
            return {
                ok: false,
                msg: 'An error occurred while marking attendance',
                error: error.message,
            };
        }
    }
    async bulkAdd(dto) {
        if (!dto.session_id || !dto.marked_by || !Array.isArray(dto.attendances)) {
            return {
                ok: false,
                msg: 'session_id, marked_by, and attendances array are required',
            };
        }
        const results = [];
        let successCount = 0;
        let failCount = 0;
        for (const item of dto.attendances) {
            try {
                const result = await this.db.execute('CALL sp_attendance_add(?, ?, ?, ?)', [
                    Number(dto.session_id),
                    Number(item.users_id),
                    String(item.status).toLowerCase(),
                    Number(dto.marked_by),
                ]);
                const res = result[0]?.[0];
                if (res && (res.ok === 1 || res.ok === true)) {
                    successCount++;
                }
                else {
                    failCount++;
                }
                results.push({ users_id: item.users_id, ...res });
            }
            catch (err) {
                failCount++;
                results.push({
                    users_id: item.users_id,
                    ok: false,
                    msg: err.message,
                });
            }
        }
        return {
            ok: true,
            msg: `Bulk attendance completed: ${successCount} marked, ${failCount} failed`,
            total: dto.attendances.length,
            successCount,
            failCount,
            results,
        };
    }
    async update(dto) {
        if (!dto.id || !dto.status || !dto.marked_by) {
            return {
                ok: false,
                msg: 'id, status, and marked_by are required',
            };
        }
        try {
            const data = await this.db.execute('CALL sp_attendance_update(?, ?, ?)', [
                Number(dto.id),
                String(dto.status).toLowerCase(),
                Number(dto.marked_by),
            ]);
            const response = data[0]?.[0];
            return response || { ok: true, msg: 'Attendance updated successfully' };
        }
        catch (error) {
            this.logger.error('Error updating attendance:', error);
            return {
                ok: false,
                msg: 'Failed to update attendance',
                error: error.message,
            };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_attendance_getall()', []);
            return data[0] || [];
        }
        catch (error) {
            this.logger.error('Error fetching all attendance records:', error);
            return [];
        }
    }
    async getById(id) {
        if (!id) {
            return { ok: false, msg: 'Attendance ID is required' };
        }
        try {
            const data = await this.db.execute('CALL sp_attendance_getbyid(?)', [Number(id)]);
            const record = data[0]?.[0] || null;
            if (!record) {
                return { ok: false, msg: 'Attendance record not found' };
            }
            return { ok: true, data: record };
        }
        catch (error) {
            this.logger.error('Error fetching attendance by ID:', error);
            return { ok: false, msg: 'Server error', error: error.message };
        }
    }
    async getBySession(sessionId) {
        if (!sessionId) {
            return [];
        }
        try {
            const data = await this.db.execute('CALL sp_attendance_getby_session(?)', [Number(sessionId)]);
            return data[0] || [];
        }
        catch (error) {
            this.logger.error('Error fetching attendance by session:', error);
            return [];
        }
    }
    async getByStudent(usersId) {
        if (!usersId) {
            return [];
        }
        try {
            const data = await this.db.execute('CALL sp_attendance_getby_student(?)', [Number(usersId)]);
            return data[0] || [];
        }
        catch (error) {
            this.logger.error('Error fetching student attendance:', error);
            return [];
        }
    }
    async getByBatch(batchesId) {
        if (!batchesId) {
            return [];
        }
        try {
            const data = await this.db.execute('CALL sp_attendance_getby_batch(?)', [Number(batchesId)]);
            return data[0] || [];
        }
        catch (error) {
            this.logger.error('Error fetching attendance by batch:', error);
            return [];
        }
    }
    async getByDate(date) {
        if (!date) {
            return [];
        }
        try {
            const data = await this.db.execute('CALL sp_attendance_getby_date(?)', [date]);
            return data[0] || [];
        }
        catch (error) {
            this.logger.error('Error fetching attendance by date:', error);
            return [];
        }
    }
    async getPercentage(usersId) {
        if (!usersId) {
            return { ok: false, msg: 'Student users_id is required' };
        }
        try {
            const data = await this.db.execute('CALL sp_attendance_percentage(?)', [Number(usersId)]);
            const stats = data[0]?.[0] || null;
            if (!stats) {
                return {
                    ok: false,
                    msg: 'Unable to calculate attendance percentage',
                };
            }
            return { ok: true, data: stats };
        }
        catch (error) {
            this.logger.error('Error calculating attendance percentage:', error);
            return { ok: false, msg: 'Server error', error: error.message };
        }
    }
    async delete(id) {
        if (!id) {
            return { ok: false, msg: 'Attendance ID is required' };
        }
        try {
            const data = await this.db.execute('CALL sp_attendance_delete(?)', [Number(id)]);
            return (data[0]?.[0] || { ok: true, msg: 'Attendance deleted successfully' });
        }
        catch (error) {
            this.logger.error('Error deleting attendance:', error);
            return {
                ok: false,
                msg: 'Failed to delete attendance',
                error: error.message,
            };
        }
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = AttendanceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map