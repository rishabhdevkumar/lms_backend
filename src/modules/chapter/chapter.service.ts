import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ChapterService {
  private readonly logger = new Logger(ChapterService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(c: any) {
    if (!c.course_id || !c.semester_id || !c.subject_id || !c.chapter_name || !c.short_name) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const result = await this.db.execute('CALL sp_chapter_add(?, ?, ?, ?, ?)', [
        c.course_id,
        c.semester_id,
        c.subject_id,
        c.chapter_name,
        c.short_name,
      ]);
      return result[0][0];
    } catch (error) {
      this.logger.error('Error adding chapter:', error);
      return { ok: false, msg: 'An error occurred while adding chapter' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_chapter_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting chapters:', error);
      return [];
    }
  }

  async update(ch: any) {
    if (!ch.id || !ch.course_id || !ch.chapter_name || !ch.short_name) {
      return { ok: false, msg: 'All data is mandatory' };
    }
    try {
      const data = await this.db.execute('CALL sp_chapter_update(?, ?, ?, ?, ?, ?)', [
        ch.id,
        ch.course_id,
        ch.semester_id,
        ch.subject_id,
        ch.chapter_name,
        ch.short_name,
      ]);
      return { ok: true, result: data[0][0] };
    } catch (err) {
      this.logger.error('Update error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }

  async search(c: any) {
    const courseId = c.course_id && c.course_id !== '' ? parseInt(c.course_id) : null;
    const semesterId = c.semester_id && c.semester_id !== '' ? parseInt(c.semester_id) : null;
    const subjectId = c.subject_id && c.subject_id !== '' ? parseInt(c.subject_id) : null;
    const chapterName = c.chapter_name && c.chapter_name !== '' ? c.chapter_name : null;
    const shortName = c.short_name && c.short_name !== '' ? c.short_name : null;
    const rc = c.rc ? parseInt(c.rc) : 5;
    const page = c.page ? parseInt(c.page) : 1;

    try {
      const data = await this.db.execute('CALL sp_chapter_search(?, ?, ?, ?, ?, ?, ?)', [
        courseId,
        semesterId,
        subjectId,
        chapterName,
        shortName,
        rc,
        page,
      ]);
      return data[0];
    } catch (err) {
      this.logger.error('Search chapters error:', err);
      return { error: 'Failed to search chapters', details: err.message };
    }
  }

  async delete(id: string) {
    try {
      await this.db.execute('CALL sp_chapter_delete(?)', [id]);
      return { ok: true, msg: 'Chapter deleted successfully' };
    } catch (err) {
      this.logger.error('Delete error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }

  async getById(id: string) {
    try {
      const data = await this.db.execute('CALL sp_chapter_get_by_id(?)', [id]);
      return data[0];
    } catch (err) {
      this.logger.error('Get chapter by id error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }
}
