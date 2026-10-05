import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class SyllabusService {
  private readonly logger = new Logger(SyllabusService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(c: any) {
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
    } catch (error) {
      this.logger.error('Error adding syllabus:', error);
      return { ok: false, msg: 'An error occurred while adding the syllabus' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_syllabus_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting syllabus:', error);
      return [];
    }
  }

  async update(sy: any) {
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
    } catch (err) {
      this.logger.error('Update syllabus error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }

  async delete(id: string) {
    try {
      await this.db.execute('CALL sp_syllabus_delete(?)', [id]);
      return { ok: true, msg: 'Syllabus deleted successfully' };
    } catch (err) {
      this.logger.error('Delete syllabus error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }
}
