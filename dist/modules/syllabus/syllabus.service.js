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
var SyllabusService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyllabusService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let SyllabusService = SyllabusService_1 = class SyllabusService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(SyllabusService_1.name);
    }
    parseSpResponse(result) {
        let responseObj = null;
        if (Array.isArray(result)) {
            for (const resultSet of result) {
                if (Array.isArray(resultSet) && resultSet.length > 0) {
                    const firstRow = resultSet[0];
                    if (firstRow && ('ok' in firstRow || 'msg' in firstRow || 'success' in firstRow || 'message' in firstRow)) {
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
            catch (e) { }
        }
        return responseObj;
    }
    async checkDuplicateName(courseId, semesterId, syllabusName, excludeId) {
        const trimmedName = syllabusName.trim().toLowerCase();
        let query = `
      SELECT id 
      FROM syllabus 
      WHERE course_id = ? 
        AND semester_id = ? 
        AND LOWER(TRIM(syllabus_name)) = ? 
        AND is_active = 1
    `;
        const params = [courseId, semesterId, trimmedName];
        if (excludeId && excludeId > 0) {
            query += ` AND id <> ?`;
            params.push(excludeId);
        }
        query += ` LIMIT 1`;
        const [rows] = await this.db.execute(query, params);
        return Array.isArray(rows) && rows.length > 0;
    }
    async add(dto) {
        const courseId = Number(dto?.course_id);
        const semesterId = Number(dto?.semester_id);
        const syllabusName = dto?.syllabus_name ? String(dto.syllabus_name).trim() : '';
        const syllabus = dto?.syllabus ? String(dto.syllabus).trim() : '';
        if (!courseId || !semesterId || !syllabusName || !syllabus) {
            return { ok: false, msg: 'Course ID, semester ID, syllabus name and syllabus content are required' };
        }
        if (syllabusName.length < 3) {
            return { ok: false, msg: 'Syllabus name must be at least 3 characters long' };
        }
        try {
            const isDuplicate = await this.checkDuplicateName(courseId, semesterId, syllabusName);
            if (isDuplicate) {
                return {
                    ok: false,
                    msg: 'Syllabus already exists for this course and semester',
                };
            }
            const result = await this.db.execute('CALL sp_syllabus_add(?, ?, ?, ?, ?)', [
                courseId,
                semesterId,
                syllabusName,
                syllabus,
                dto.syllabus_pdf ? String(dto.syllabus_pdf).trim() : null,
            ]);
            return this.parseSpResponse(result);
        }
        catch (error) {
            this.logger.error('Error adding syllabus:', error);
            return { ok: false, msg: 'An error occurred while adding the syllabus', error: error.message };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_syllabus_getall()', []);
            return data[0] || [];
        }
        catch (error) {
            this.logger.error('Error getting syllabus:', error);
            return [];
        }
    }
    async update(dto) {
        const id = Number(dto?.id);
        const courseId = Number(dto?.course_id);
        const semesterId = Number(dto?.semester_id);
        const syllabusName = dto?.syllabus_name ? String(dto.syllabus_name).trim() : '';
        const syllabus = dto?.syllabus ? String(dto.syllabus).trim() : '';
        if (!id || !courseId || !semesterId || !syllabusName || !syllabus) {
            return { ok: false, msg: 'ID, course ID, semester ID, syllabus name and syllabus content are required' };
        }
        if (syllabusName.length < 3) {
            return { ok: false, msg: 'Syllabus name must be at least 3 characters long' };
        }
        try {
            const isDuplicate = await this.checkDuplicateName(courseId, semesterId, syllabusName, id);
            if (isDuplicate) {
                return {
                    ok: false,
                    msg: 'Another syllabus already has this name for this course and semester',
                };
            }
            const result = await this.db.execute('CALL sp_syllabus_update(?, ?, ?, ?, ?, ?)', [
                id,
                courseId,
                semesterId,
                syllabusName,
                syllabus,
                dto.syllabus_pdf ? String(dto.syllabus_pdf).trim() : null,
            ]);
            return this.parseSpResponse(result);
        }
        catch (err) {
            this.logger.error('Update syllabus error:', err);
            return { ok: false, msg: 'Failed to update syllabus', error: err.message };
        }
    }
    async search(dto) {
        const rc = dto?.rc ? Number(dto.rc) : 10;
        const page = dto?.page ? Number(dto.page) : 1;
        try {
            const data = await this.db.execute('CALL sp_syllabus_search(?, ?, ?, ?, ?)', [
                dto?.course_id ? Number(dto.course_id) : null,
                dto?.semester_id ? Number(dto.semester_id) : null,
                dto?.syllabus_name ? String(dto.syllabus_name).trim() : null,
                rc,
                page,
            ]);
            return data[0] || [];
        }
        catch (error) {
            this.logger.error('Error searching syllabus:', error);
            return [];
        }
    }
    async getByCourseSemester(courseId, semesterId) {
        if (!courseId || !semesterId) {
            return { ok: false, msg: 'Course ID and semester ID are required' };
        }
        try {
            const data = await this.db.execute('CALL sp_syllabus_get_by_course_semester(?, ?)', [
                Number(courseId),
                Number(semesterId),
            ]);
            return data[0] || [];
        }
        catch (error) {
            this.logger.error('Error getting syllabus by course and semester:', error);
            return [];
        }
    }
    async delete(id) {
        if (!id || Number(id) <= 0) {
            return { ok: false, msg: 'Valid syllabus ID is required' };
        }
        try {
            const result = await this.db.execute('CALL sp_syllabus_delete(?)', [Number(id)]);
            return this.parseSpResponse(result);
        }
        catch (err) {
            this.logger.error('Delete syllabus error:', err);
            return { ok: false, msg: 'Failed to delete syllabus', error: err.message };
        }
    }
};
exports.SyllabusService = SyllabusService;
exports.SyllabusService = SyllabusService = SyllabusService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SyllabusService);
//# sourceMappingURL=syllabus.service.js.map