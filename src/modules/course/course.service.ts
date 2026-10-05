import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class CourseService {
  private readonly logger = new Logger(CourseService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(c: any) {
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
    } catch (error) {
      this.logger.error('Error adding course:', error);
      return { ok: false, msg: 'An error occurred while adding the course' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_course_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting courses:', error);
      return [];
    }
  }

  async update(course: any) {
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
    } catch (err) {
      this.logger.error('Update course error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }

  async search(c: any) {
    try {
      const data = await this.db.execute('CALL sp_course_search(?,?,?,?)', [
        c.course_name || '',
        c.short_name || '',
        c.rc || 5,
        c.page || 1,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Search course error:', error);
      return [];
    }
  }

  async delete(id: string) {
    try {
      await this.db.execute('CALL sp_course_delete(?)', [id]);
      return { ok: true, msg: 'Course deleted successfully' };
    } catch (err) {
      this.logger.error('Delete course error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }
}
