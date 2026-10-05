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
var SemesterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let SemesterService = SemesterService_1 = class SemesterService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(SemesterService_1.name);
    }
    async add(c) {
        if (!c.course_id || !c.semester_name || !c.short_name) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_semester_add(?, ?, ?)', [
                c.course_id,
                c.semester_name,
                c.short_name,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding semester:', error);
            return { ok: false, msg: 'An error occurred while adding the semester' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_semester_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error getting semesters:', error);
            return [];
        }
    }
    async update(sem) {
        if (!sem.id || !sem.course_id || !sem.semester_name || !sem.short_name) {
            return { ok: false, msg: 'All data is mandatory' };
        }
        try {
            const data = await this.db.execute('CALL sp_semester_update(?, ?, ?, ?)', [
                sem.id,
                sem.course_id,
                sem.semester_name,
                sem.short_name,
            ]);
            return { ok: true, result: data[0][0] };
        }
        catch (err) {
            this.logger.error('Update semester error:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
    async search(sem) {
        try {
            const data = await this.db.execute('CALL sp_semester_search(?,?,?,?)', [
                sem.semester_name || '',
                sem.short_name || '',
                sem.rc || 5,
                sem.page || 1,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error searching semesters:', error);
            return [];
        }
    }
    async delete(id) {
        try {
            await this.db.execute('CALL sp_semester_delete(?)', [id]);
            return { ok: true, msg: 'Semester deleted successfully' };
        }
        catch (err) {
            this.logger.error('Delete semester error:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
};
exports.SemesterService = SemesterService;
exports.SemesterService = SemesterService = SemesterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SemesterService);
//# sourceMappingURL=semester.service.js.map