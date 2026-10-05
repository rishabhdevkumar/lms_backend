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
var SubjectService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let SubjectService = SubjectService_1 = class SubjectService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(SubjectService_1.name);
    }
    async add(sub) {
        if (!sub.course_id || !sub.semester_id || !sub.subject_name || !sub.short_name) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_subject_add(?, ?, ?, ?)', [
                sub.course_id,
                sub.semester_id,
                sub.subject_name,
                sub.short_name,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding subject:', error);
            return { ok: false, msg: 'An error occurred while adding the subject' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_subject_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error getting subjects:', error);
            return [];
        }
    }
    async update(sub) {
        if (!sub.id || !sub.course_id || !sub.semester_id || !sub.subject_name || !sub.short_name) {
            return { ok: false, msg: 'All data is mandatory' };
        }
        try {
            const data = await this.db.execute('CALL sp_subject_update(?, ?, ?, ?, ?)', [
                sub.id,
                sub.course_id,
                sub.semester_id,
                sub.subject_name,
                sub.short_name,
            ]);
            return { ok: true, result: data[0][0] };
        }
        catch (err) {
            this.logger.error('Update subject error:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
    async search(c) {
        try {
            const data = await this.db.execute('CALL sp_subject_search(?,?,?,?,?,?)', [
                c.course_id ? parseInt(c.course_id) : null,
                c.semester_id ? parseInt(c.semester_id) : null,
                c.subject_name || null,
                c.short_name || null,
                c.rc || 5,
                c.page || 1,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error searching subjects:', error);
            return [];
        }
    }
    async delete(id) {
        try {
            await this.db.execute('CALL sp_subject_delete(?)', [id]);
            return { ok: true, msg: 'Subject deleted successfully' };
        }
        catch (err) {
            this.logger.error('Delete subject error:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
};
exports.SubjectService = SubjectService;
exports.SubjectService = SubjectService = SubjectService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SubjectService);
//# sourceMappingURL=subject.service.js.map