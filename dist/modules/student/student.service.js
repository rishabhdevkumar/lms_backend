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
var StudentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
const jwt = require("jsonwebtoken");
let StudentService = StudentService_1 = class StudentService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(StudentService_1.name);
    }
    async quickAdd(c) {
        if (!c.name || !c.email || !c.password) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_quick_student_add(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                c.roll_no,
                c.name,
                c.email,
                c.password,
                c.phone,
                c.dob,
                c.gender,
                c.blood_group,
                c.session_id,
                c.course_id,
                c.semester_id,
                c.father_name,
                c.father_mob_no,
                c.mother_name,
                c.other_mob_no,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error in quick_add student:', error);
            return { ok: false, msg: 'An error occurred while adding student' };
        }
    }
    async add(u) {
        if (!u.roll_no || !u.name || !u.email || !u.password) {
            return { ok: false, msg: 'All required fields must be filled' };
        }
        try {
            Object.keys(u).forEach((key) => {
                if (u[key] === undefined)
                    u[key] = null;
            });
            const result = await this.db.execute(`CALL sp_student_add(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [
                u.roll_no,
                u.name,
                u.email,
                u.password,
                u.phone,
                u.dob,
                u.gender,
                u.category,
                u.nationality,
                u.blood_group,
                u.session_id,
                u.course_id,
                u.semester_id,
                u.aadhar_no,
                u.father_name,
                u.father_mob_no,
                u.father_occupation,
                u.mother_name,
                u.mother_occupation,
                u.other_mob_no,
                u.temp_house_no,
                u.temp_pincode,
                u.temp_locality,
                u.temp_area,
                u.temp_city_id,
                u.temp_destrict_id,
                u.temp_state_id,
                u.temp_country_id,
                u.perm_house_no,
                u.perm_pincode,
                u.perm_locality,
                u.perm_area,
                u.perm_city_id,
                u.perm_destrict_id,
                u.perm_state_id,
                u.perm_country_id,
                u.qualification,
                u.board_10th,
                u.passing_year_10th,
                u.total_marks_10th,
                u.division_10th,
                u.percentage_10th,
                u.board_12th,
                u.passing_year_12th,
                u.total_marks_12th,
                u.division_12th,
                u.percentage_12th,
                u.pre_registration_no,
                u.pre_subject,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding student:', error);
            return { ok: false, msg: 'Error adding student', error: error.message };
        }
    }
    async authenticate(body) {
        const { roll_no, password } = body;
        if (!roll_no || !password) {
            return { ok: false, msg: 'Fields are mandatory' };
        }
        try {
            const rows = await this.db.execute('CALL sp_student_authenticate(?,?)', [
                roll_no,
                password,
            ]);
            const authResult = rows[0]?.[0];
            if (authResult && authResult.ok) {
                const secret = process.env.TOKEN_SECRET || 'your_secret_key';
                const token = jwt.sign({ id: authResult.data.id, roll_no: authResult.data.roll_no }, secret, { expiresIn: '24h' });
                authResult.data.token = token;
                return authResult;
            }
            return authResult || { ok: false, msg: 'Invalid credentials' };
        }
        catch (err) {
            this.logger.error('Error in student authenticate:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_student_getall()', []);
            let students = data[0] || [];
            students = students.map((student) => {
                if (student.dob) {
                    const date = new Date(student.dob);
                    const yyyy = date.getFullYear();
                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                    const dd = String(date.getDate()).padStart(2, '0');
                    student.dob = `${yyyy}-${mm}-${dd}`;
                }
                return student;
            });
            return students;
        }
        catch (error) {
            this.logger.error('Error in student getall:', error);
            return [];
        }
    }
    async details(studentId) {
        try {
            const rows = await this.db.execute('CALL sp_student_get_by_id(?)', [studentId]);
            if (rows[0] && rows[0].length > 0) {
                return { ok: true, data: rows[0][0] };
            }
            else {
                return { ok: false, msg: 'Student not found' };
            }
        }
        catch (err) {
            this.logger.error('Error in student details:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
    async update(s) {
        const params = [
            s.id || null,
            s.roll_no || null,
            s.name || null,
            s.email || null,
            s.phone || null,
            s.dob || null,
            s.gender || null,
            s.catagory || null,
            s.nationality || null,
            s.blood_group || null,
            s.addhar_no || null,
            s.father_name || null,
            s.father_mob_no || null,
            s.mother_name || null,
            s.other_mob_no || null,
            s.house_no || null,
            s.locality || null,
            s.area || null,
            s.city_id || null,
            s.destrict_id || null,
            s.state_id || null,
            s.pincode || null,
            s.country_id || null,
            s.session_id || null,
            s.course_id || null,
            s.semester_id || null,
            s.KU_reg_no || null,
            s.ku_roll_no || null,
        ];
        if (!s.id || !s.name || !s.email || !s.registration_no || !s.ku_roll_no) {
            return {
                ok: false,
                msg: 'All data (id, name, email, registration number, and KU roll number) are mandatory',
            };
        }
        try {
            const data = await this.db.execute('CALL sp_student_update(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', params);
            return data[0][0];
        }
        catch (error) {
            this.logger.error('Update student error:', error);
            return { ok: false, msg: 'Failed to update student due to an error' };
        }
    }
    async search(s) {
        try {
            const data = await this.db.execute('CALL sp_student_search(?,?,?,?,?)', [
                s.roll_no || '',
                s.email || '',
                s.phone || '',
                s.rc || 10,
                s.page || 1,
            ]);
            return data[0][0];
        }
        catch (error) {
            return { ok: false, msg: 'Database error: ' + error.message };
        }
    }
    async updateLanguage(body) {
        try {
            const studentId = body.student_id;
            const language = body.language || 'en';
            if (!studentId) {
                return { ok: false, msg: 'Incomplete data' };
            }
            const data = await this.db.execute('CALL sp_student_update_language(?, ?)', [
                studentId,
                language,
            ]);
            return { ok: true, student: data[0][0] };
        }
        catch (error) {
            return { ok: false, msg: 'Database error: ' + error.message, user: {} };
        }
    }
    async updateEmail(s) {
        try {
            if (!s.student_id || !s.email) {
                return { ok: false, msg: 'incomplete detail' };
            }
            const data = await this.db.execute('CALL sp_student_update_email(?, ?)', [
                s.student_id,
                s.email,
            ]);
            return { ok: true, status: data[0][0] };
        }
        catch (error) {
            return { ok: false, msg: 'Database error: ' + error.message, user: {} };
        }
    }
    async updatePassword(s) {
        try {
            if (!s.student_id || !s.password) {
                return { ok: false, msg: 'incomplete detail' };
            }
            const data = await this.db.execute('CALL sp_student_update_password(?, ?)', [
                s.student_id,
                s.password,
            ]);
            return { ok: true, status: data[0][0] };
        }
        catch (error) {
            return { ok: false, msg: 'Database error: ' + error.message, user: {} };
        }
    }
    async count() {
        try {
            const rows = await this.db.execute('CALL sp_student_count()');
            const total = rows[0]?.[0]?.total_students ?? 0;
            return { ok: true, total_students: total };
        }
        catch (error) {
            return { ok: false, msg: 'Database error: ' + error.message };
        }
    }
    async getNextId() {
        try {
            const data = await this.db.execute('CALL sp_student_next_id()', []);
            return data[0][0][0];
        }
        catch (err) {
            this.logger.error('Error fetching next student ID:', err);
            return { error: 'Failed to fetch next student ID' };
        }
    }
    async getNextRollNo() {
        try {
            const rows = await this.db.execute('CALL sp_student_next_roll_no()');
            if (rows[0] && rows[0][0] && typeof rows[0][0].next_roll_no === 'number') {
                return { next_roll_no: rows[0][0].next_roll_no };
            }
            return { error: 'Invalid DB response' };
        }
        catch (err) {
            this.logger.error('Error fetching next roll number:', err);
            return { error: 'Failed to fetch next roll number' };
        }
    }
    async getSelf(sid) {
        try {
            const data = await this.db.execute('CALL sp_student_get_self(?)', [sid]);
            return { ok: true, student: data[0][0] };
        }
        catch (error) {
            return { ok: false, msg: 'Database error: ' + error.message, user: {} };
        }
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = StudentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], StudentService);
//# sourceMappingURL=student.service.js.map