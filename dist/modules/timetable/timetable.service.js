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
var TimetableService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimetableService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let TimetableService = TimetableService_1 = class TimetableService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(TimetableService_1.name);
    }
    async add(a) {
        if (!a.session_id ||
            !a.course_id ||
            !a.semester_id ||
            !a.subject_id ||
            !a.faculty_id ||
            !a.day ||
            !a.start_time ||
            !a.end_time ||
            !a.block_id ||
            !a.room_id) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_add_timetable(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                a.session_id,
                a.course_id,
                a.semester_id,
                a.subject_id,
                a.faculty_id,
                a.day,
                a.start_time,
                a.end_time,
                a.block_id,
                a.room_id,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding timetable:', error);
            return { ok: false, msg: 'An error occurred while adding the record' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_timetable_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error getting timetables:', error);
            return [];
        }
    }
};
exports.TimetableService = TimetableService;
exports.TimetableService = TimetableService = TimetableService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], TimetableService);
//# sourceMappingURL=timetable.service.js.map