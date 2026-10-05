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
    async add(c) {
        if (!c.course_id || !c.semester_id || !c.syllabus_name || !c.syllabus) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_syllabus_add(?, ?, ?, ?)', [
                c.course_id,
                c.semester_id,
                c.syllabus_name,
                c.syllabus,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding syllabus:', error);
            return { ok: false, msg: 'An error occurred while adding the syllabus' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_syllabus_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error getting syllabus:', error);
            return [];
        }
    }
    async update(sy) {
        if (!sy.id || !sy.course_id || !sy.semester_id || !sy.syllabus_name || !sy.syllabus) {
            return { ok: false, msg: 'All data is mandatory' };
        }
        try {
            const data = await this.db.execute('CALL sp_syllabus_update(?, ?, ?, ?, ?)', [
                sy.id,
                sy.course_id,
                sy.semester_id,
                sy.syllabus_name,
                sy.syllabus,
            ]);
            return { ok: true, result: data[0][0] };
        }
        catch (err) {
            this.logger.error('Update syllabus error:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
    async delete(id) {
        try {
            await this.db.execute('CALL sp_syllabus_delete(?)', [id]);
            return { ok: true, msg: 'Syllabus deleted successfully' };
        }
        catch (err) {
            this.logger.error('Delete syllabus error:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
};
exports.SyllabusService = SyllabusService;
exports.SyllabusService = SyllabusService = SyllabusService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SyllabusService);
//# sourceMappingURL=syllabus.service.js.map