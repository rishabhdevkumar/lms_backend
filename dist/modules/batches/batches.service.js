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
var BatchesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let BatchesService = BatchesService_1 = class BatchesService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(BatchesService_1.name);
    }
    async add(dto) {
        const courseId = dto.course_id;
        const usersId = dto.users_id || dto.instructor_id;
        if (!courseId || !usersId) {
            return { ok: false, msg: 'course_id and users_id (instructor) are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_batches_add(?, ?, ?, ?, ?, ?, ?, ?)', [
                courseId,
                usersId,
                dto.start_date || null,
                dto.end_date || null,
                dto.start_time || null,
                dto.end_time || null,
                dto.room || null,
                dto.status || 'upcoming',
            ]);
            return result[0]?.[0] || { ok: true, msg: 'Batch created successfully' };
        }
        catch (error) {
            this.logger.error('Error adding batch:', error);
            return { ok: false, msg: 'An error occurred while creating batch', error: error.message };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_batches_getall()', []);
            return data[0] || [];
        }
        catch (error) {
            this.logger.error('Error fetching all batches:', error);
            return [];
        }
    }
    async getById(id) {
        if (!id) {
            return { ok: false, msg: 'Batch ID is required' };
        }
        try {
            const data = await this.db.execute('CALL sp_batches_get_by_id(?)', [Number(id)]);
            const batch = data[0]?.[0] || null;
            if (!batch) {
                return { ok: false, msg: 'Batch not found' };
            }
            return { ok: true, data: batch };
        }
        catch (error) {
            this.logger.error('Error fetching batch by id:', error);
            return { ok: false, msg: 'Server error' };
        }
    }
    async update(dto) {
        const courseId = dto.course_id;
        const usersId = dto.users_id || dto.instructor_id;
        if (!dto.id || !courseId || !usersId) {
            return { ok: false, msg: 'id, course_id, and users_id are required' };
        }
        try {
            const data = await this.db.execute('CALL sp_batches_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                Number(dto.id),
                dto.batch_code || null,
                courseId,
                usersId,
                dto.start_date || null,
                dto.end_date || null,
                dto.start_time || null,
                dto.end_time || null,
                dto.room || null,
                dto.status || 'upcoming',
            ]);
            return data[0]?.[0] || { ok: true, msg: 'Batch updated successfully' };
        }
        catch (error) {
            this.logger.error('Error updating batch:', error);
            return { ok: false, msg: 'Failed to update batch', error: error.message };
        }
    }
    async delete(id) {
        if (!id) {
            return { ok: false, msg: 'Batch ID is required' };
        }
        try {
            const data = await this.db.execute('CALL sp_batches_delete(?)', [Number(id)]);
            return data[0]?.[0] || { ok: true, msg: 'Batch deleted successfully' };
        }
        catch (error) {
            this.logger.error('Error deleting batch:', error);
            return { ok: false, msg: 'Failed to delete batch', error: error.message };
        }
    }
    async enrollStudent(dto) {
        const batchId = dto.batch_id || dto.batches_id;
        const usersId = dto.users_id || dto.student_id;
        if (!batchId || !usersId) {
            return { ok: false, msg: 'batch_id and users_id (student) are required' };
        }
        try {
            const data = await this.db.execute('CALL sp_batch_students_add(?, ?)', [
                Number(batchId),
                Number(usersId),
            ]);
            return data[0]?.[0] || { ok: true, msg: 'Student enrolled successfully' };
        }
        catch (error) {
            this.logger.error('Error enrolling student in batch:', error);
            return { ok: false, msg: 'Failed to enroll student', error: error.message };
        }
    }
    async removeStudent(dto) {
        const batchId = dto.batch_id || dto.batches_id;
        const usersId = dto.users_id || dto.student_id;
        if (!batchId || !usersId) {
            return { ok: false, msg: 'batch_id and users_id (student) are required' };
        }
        try {
            const data = await this.db.execute('CALL sp_batches_remove_student(?, ?)', [
                Number(batchId),
                Number(usersId),
            ]);
            return data[0]?.[0] || { ok: true, msg: 'Student removed from batch successfully' };
        }
        catch (error) {
            this.logger.error('Error removing student from batch:', error);
            return { ok: false, msg: 'Failed to remove student', error: error.message };
        }
    }
    async getStudents(batchId) {
        if (!batchId) {
            return [];
        }
        try {
            const data = await this.db.execute('CALL sp_batches_get_students(?)', [Number(batchId)]);
            return data[0] || [];
        }
        catch (error) {
            this.logger.error('Error fetching students for batch:', error);
            return [];
        }
    }
};
exports.BatchesService = BatchesService;
exports.BatchesService = BatchesService = BatchesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], BatchesService);
//# sourceMappingURL=batches.service.js.map