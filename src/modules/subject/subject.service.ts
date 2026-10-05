import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class SubjectService {
  private readonly logger = new Logger(SubjectService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(sub: any) {
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
    } catch (error) {
      this.logger.error('Error adding subject:', error);
      return { ok: false, msg: 'An error occurred while adding the subject' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_subject_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting subjects:', error);
      return [];
    }
  }

  async update(sub: any) {
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
    } catch (err) {
      this.logger.error('Update subject error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }

  async search(c: any) {
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
    } catch (error) {
      this.logger.error('Error searching subjects:', error);
      return [];
    }
  }

  async delete(id: string) {
    try {
      await this.db.execute('CALL sp_subject_delete(?)', [id]);
      return { ok: true, msg: 'Subject deleted successfully' };
    } catch (err) {
      this.logger.error('Delete subject error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }
}
