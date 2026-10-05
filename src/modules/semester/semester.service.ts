import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class SemesterService {
  private readonly logger = new Logger(SemesterService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(c: any) {
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
    } catch (error) {
      this.logger.error('Error adding semester:', error);
      return { ok: false, msg: 'An error occurred while adding the semester' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_semester_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting semesters:', error);
      return [];
    }
  }

  async update(sem: any) {
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
    } catch (err) {
      this.logger.error('Update semester error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }

  async search(sem: any) {
    try {
      const data = await this.db.execute('CALL sp_semester_search(?,?,?,?)', [
        sem.semester_name || '',
        sem.short_name || '',
        sem.rc || 5,
        sem.page || 1,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error searching semesters:', error);
      return [];
    }
  }

  async delete(id: string) {
    try {
      await this.db.execute('CALL sp_semester_delete(?)', [id]);
      return { ok: true, msg: 'Semester deleted successfully' };
    } catch (err) {
      this.logger.error('Delete semester error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }
}
