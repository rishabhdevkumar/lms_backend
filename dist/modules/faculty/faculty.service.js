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
var FacultyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
const jwt = require("jsonwebtoken");
let FacultyService = FacultyService_1 = class FacultyService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(FacultyService_1.name);
    }
    async add(f) {
        if (!f.first_name || !f.last_name || !f.email || !f.password || !f.phone) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_faculty_add(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                f.faculty_code,
                f.department_id,
                f.first_name,
                f.last_name,
                f.email,
                f.password,
                f.dob,
                f.phone,
                f.whatsapp_no,
                f.address,
                f.aadhar_no,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding faculty:', error);
            return { ok: false, msg: 'An error occurred while adding faculty' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_faculty_getall()', []);
            let faculties = data[0] || [];
            faculties = faculties.map((faculty) => {
                if (faculty.dob) {
                    const date = new Date(faculty.dob);
                    const yyyy = date.getFullYear();
                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                    const dd = String(date.getDate()).padStart(2, '0');
                    faculty.dob = `${yyyy}-${mm}-${dd}`;
                }
                return faculty;
            });
            return faculties;
        }
        catch (error) {
            this.logger.error('Error getting faculties:', error);
            return [];
        }
    }
    async search(s) {
        try {
            const data = await this.db.execute('CALL sp_faculty_search(?,?,?,?)', [
                s.department_id || '',
                s.faculty_code || '',
                s.rc || 5,
                s.page || 1,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error searching faculty:', error);
            return [];
        }
    }
    async update(s) {
        if (!s.id || !s.first_name || !s.last_name || !s.email) {
            return { ok: false, msg: 'All data is mandatory' };
        }
        try {
            const data = await this.db.execute('CALL sp_faculty_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                s.id,
                s.faculty_code,
                s.department_id,
                s.first_name,
                s.last_name,
                s.email,
                s.dob,
                s.phone,
                s.whatsapp_no,
                s.address,
                s.aadhar_no,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error updating faculty:', error);
            return { ok: false, msg: 'Failed to update faculty' };
        }
    }
    async authenticate(f) {
        if (!f.faculty_code || !f.password) {
            return { error: 'Faculty Code and Password are mandatory' };
        }
        try {
            const rows = await this.db.execute('CALL sp_faculty_authenticate(?, ?)', [
                f.faculty_code,
                f.password,
            ]);
            if (!rows || !rows[0] || !rows[0][0]) {
                return { error: 'Invalid credentials' };
            }
            const data = rows[0][0];
            if (data.ok) {
                const secret = process.env.TOKEN_SECRET || 'your_secret_key';
                const token = jwt.sign(data.data, secret, { expiresIn: '24h' });
                data.token = token;
            }
            return data;
        }
        catch (error) {
            this.logger.error('Authentication Error:', error);
            return { error: 'Internal Server Error' };
        }
    }
    async count() {
        try {
            const rows = await this.db.execute('CALL sp_faculty_count()');
            const total = rows[0]?.[0]?.total_faculty ?? 0;
            return { ok: true, total_faculty: total };
        }
        catch (error) {
            this.logger.error('Error fetching faculty count:', error);
            return { ok: false, msg: 'Database error: ' + error.message };
        }
    }
    async getSelf(fid) {
        try {
            const data = await this.db.execute('CALL sp_faculty_get_self(?)', [fid]);
            return { ok: true, user: data[0][0] };
        }
        catch (error) {
            return { ok: false, msg: 'Database error: ' + error.message, user: {} };
        }
    }
    async delete(id) {
        try {
            await this.db.execute('CALL sp_faculty_delete(?)', [id]);
            return { ok: true, msg: 'Faculty deleted successfully' };
        }
        catch (err) {
            this.logger.error('Delete faculty error:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
};
exports.FacultyService = FacultyService;
exports.FacultyService = FacultyService = FacultyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], FacultyService);
//# sourceMappingURL=faculty.service.js.map