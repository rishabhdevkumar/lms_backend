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
var CourseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let CourseService = CourseService_1 = class CourseService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(CourseService_1.name);
    }
    async add(c) {
        if (!c.session_id || !c.course_name || !c.short_name) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_course_add(?, ?, ?)', [
                c.session_id,
                c.course_name,
                c.short_name,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding course:', error);
            return { ok: false, msg: 'An error occurred while adding the course' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_course_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error getting courses:', error);
            return [];
        }
    }
    async update(course) {
        if (!course.id || !course.session_id || !course.course_name || !course.short_name) {
            return { ok: false, msg: 'All data is mandatory' };
        }
        try {
            const data = await this.db.execute('CALL sp_course_update(?, ?, ?, ?)', [
                course.id,
                course.session_id,
                course.course_name,
                course.short_name,
            ]);
            return { ok: true, result: data[0][0] };
        }
        catch (err) {
            this.logger.error('Update course error:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
    async search(c) {
        try {
            const data = await this.db.execute('CALL sp_course_search(?,?,?,?)', [
                c.course_name || '',
                c.short_name || '',
                c.rc || 5,
                c.page || 1,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Search course error:', error);
            return [];
        }
    }
    async delete(id) {
        try {
            await this.db.execute('CALL sp_course_delete(?)', [id]);
            return { ok: true, msg: 'Course deleted successfully' };
        }
        catch (err) {
            this.logger.error('Delete course error:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = CourseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CourseService);
//# sourceMappingURL=course.service.js.map