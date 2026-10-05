import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class FacultyService {
  private readonly logger = new Logger(FacultyService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(f: any) {
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
    } catch (error) {
      this.logger.error('Error adding faculty:', error);
      return { ok: false, msg: 'An error occurred while adding faculty' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_faculty_getall()', []);
      let faculties = data[0] || [];
      faculties = faculties.map((faculty: any) => {
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
    } catch (error) {
      this.logger.error('Error getting faculties:', error);
      return [];
    }
  }

  async search(s: any) {
    try {
      const data = await this.db.execute('CALL sp_faculty_search(?,?,?,?)', [
        s.department_id || '',
        s.faculty_code || '',
        s.rc || 5,
        s.page || 1,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error searching faculty:', error);
      return [];
    }
  }

  async update(s: any) {
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
    } catch (error) {
      this.logger.error('Error updating faculty:', error);
      return { ok: false, msg: 'Failed to update faculty' };
    }
  }

  async authenticate(f: any) {
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
    } catch (error) {
      this.logger.error('Authentication Error:', error);
      return { error: 'Internal Server Error' };
    }
  }

  async count() {
    try {
      const rows = await this.db.execute('CALL sp_faculty_count()');
      const total = rows[0]?.[0]?.total_faculty ?? 0;
      return { ok: true, total_faculty: total };
    } catch (error) {
      this.logger.error('Error fetching faculty count:', error);
      return { ok: false, msg: 'Database error: ' + error.message };
    }
  }

  async getSelf(fid: any) {
    try {
      const data = await this.db.execute('CALL sp_faculty_get_self(?)', [fid]);
      return { ok: true, user: data[0][0] };
    } catch (error) {
      return { ok: false, msg: 'Database error: ' + error.message, user: {} };
    }
  }

  async delete(id: string) {
    try {
      await this.db.execute('CALL sp_faculty_delete(?)', [id]);
      return { ok: true, msg: 'Faculty deleted successfully' };
    } catch (err) {
      this.logger.error('Delete faculty error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }
}
