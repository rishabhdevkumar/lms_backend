import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import {
  AddChapterDto,
  UpdateChapterDto,
  SearchChapterDto,
  ToggleChapterStatusDto,
} from './dto/chapter.dto';

@Injectable()
export class ChapterService {
  private readonly logger = new Logger(ChapterService.name);

  constructor(private readonly db: DatabaseService) {}

  private parseSpResponse(result: any): { ok: boolean; msg: string; data?: any; affected?: number } {
    let responseObj: any = null;
    if (Array.isArray(result)) {
      for (const resultSet of result) {
        if (Array.isArray(resultSet) && resultSet.length > 0) {
          const firstRow = resultSet[0];
          if (firstRow && ('ok' in firstRow || 'msg' in firstRow)) {
            responseObj = firstRow;
            break;
          }
        }
      }
    }

    if (!responseObj) {
      responseObj = result?.[0]?.[0] || { ok: false, msg: 'No response from database' };
    }

    if (responseObj.ok !== undefined) {
      responseObj.ok = Boolean(responseObj.ok);
    }

    // Normalize DATA / data property from SP
    if (responseObj.DATA !== undefined && responseObj.data === undefined) {
      responseObj.data = responseObj.DATA;
    }

    if (typeof responseObj.data === 'string') {
      try {
        responseObj.data = JSON.parse(responseObj.data);
      } catch (e) {}
    }

    return responseObj;
  }

  async add(dto: AddChapterDto) {
    if (!dto || !dto.subject_id || !dto.chapter_name) {
      return { ok: false, msg: 'Subject ID and chapter name are required' };
    }

    let courseId = dto.course_id ? Number(dto.course_id) : null;
    let semesterId = dto.semester_id ? Number(dto.semester_id) : null;
    const subjectId = Number(dto.subject_id);

    if ((!courseId || !semesterId) && subjectId) {
      try {
        const rows = await this.db.execute('SELECT course_id, semester_id FROM `subject` WHERE `id` = ?', [subjectId]);
        if (Array.isArray(rows) && rows.length > 0) {
          courseId = courseId || rows[0].course_id;
          semesterId = semesterId || rows[0].semester_id;
        }
      } catch (e) {
        this.logger.warn('Failed to resolve course/semester for chapter from subject: ' + e.message);
      }
    }

    if (!courseId || !semesterId) {
      return { ok: false, msg: 'Course ID and Semester ID could not be resolved. Please specify course and semester.' };
    }

    try {
      const result = await this.db.execute(
        'CALL sp_chapter_add(?, ?, ?, ?, ?)',
        [
          courseId,
          semesterId,
          subjectId,
          String(dto.chapter_name).trim(),
          dto.short_name ? String(dto.short_name).trim() : null,
        ],
      );

      return this.parseSpResponse(result);
    } catch (error: any) {
      this.logger.error('Error adding chapter:', error);
      return { ok: false, msg: 'An error occurred while adding chapter', error: error.message };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_chapter_getall()', []);
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error getting chapters:', error);
      return [];
    }
  }

  async update(dto: UpdateChapterDto) {
    if (!dto || !dto.id || !dto.subject_id || !dto.chapter_name) {
      return { ok: false, msg: 'Chapter ID, subject and chapter name are required' };
    }

    let courseId = dto.course_id ? Number(dto.course_id) : null;
    let semesterId = dto.semester_id ? Number(dto.semester_id) : null;
    const subjectId = Number(dto.subject_id);

    if ((!courseId || !semesterId) && subjectId) {
      try {
        const rows = await this.db.execute('SELECT course_id, semester_id FROM `subject` WHERE `id` = ?', [subjectId]);
        if (Array.isArray(rows) && rows.length > 0) {
          courseId = courseId || rows[0].course_id;
          semesterId = semesterId || rows[0].semester_id;
        }
      } catch (e) {
        this.logger.warn('Failed to resolve course/semester for chapter from subject: ' + e.message);
      }
    }

    if (!courseId || !semesterId) {
      return { ok: false, msg: 'Course ID and Semester ID could not be resolved.' };
    }

    try {
      const result = await this.db.execute(
        'CALL sp_chapter_update(?, ?, ?, ?, ?, ?)',
        [
          Number(dto.id),
          courseId,
          semesterId,
          subjectId,
          String(dto.chapter_name).trim(),
          dto.short_name ? String(dto.short_name).trim() : null,
        ],
      );

      return this.parseSpResponse(result);
    } catch (err: any) {
      this.logger.error('Update chapter error:', err);
      return { ok: false, msg: 'Failed to update chapter', error: err.message };
    }
  }

  async search(c: SearchChapterDto) {
    const rc = c?.rc ? Number(c.rc) : 10;
    const page = c?.page ? Number(c.page) : 1;

    if (rc <= 0 || page <= 0) {
      return { ok: false, msg: 'Page and record count must be greater than zero' };
    }

    try {
      const data = await this.db.execute(
        'CALL sp_chapter_search(?, ?, ?, ?, ?, ?, ?)',
        [
          c?.course_id ? Number(c.course_id) : null,
          c?.semester_id ? Number(c.semester_id) : null,
          c?.subject_id ? Number(c.subject_id) : null,
          c?.chapter_name ? String(c.chapter_name).trim() : null,
          c?.short_name ? String(c.short_name).trim() : null,
          rc,
          page,
        ],
      );
      return data[0] || [];
    } catch (err: any) {
      this.logger.error('Search chapters error:', err);
      return [];
    }
  }

  async delete(id: number | string) {
    if (!id || Number(id) <= 0) {
      return { ok: false, msg: 'Valid chapter ID is required' };
    }

    try {
      const result = await this.db.execute('CALL sp_chapter_delete(?)', [Number(id)]);
      return this.parseSpResponse(result);
    } catch (err: any) {
      this.logger.error('Delete chapter error:', err);
      return { ok: false, msg: 'Failed to delete chapter', error: err.message };
    }
  }

  async getBySubject(subjectId: number | string) {
    if (!subjectId || Number(subjectId) <= 0) {
      return { ok: false, msg: 'Valid subject ID is required' };
    }

    try {
      const result = await this.db.execute(
        'CALL sp_chapter_get_by_subject(?)',
        [Number(subjectId)],
      );

      // If procedure returned error object in first row (e.g. subject does not exist)
      if (result?.[0]?.[0] && 'ok' in result[0][0]) {
        return this.parseSpResponse(result);
      }

      return result[0] || [];
    } catch (error: any) {
      this.logger.error('Error getting chapters by subject:', error);
      return { ok: false, msg: 'Failed to fetch chapters by subject', error: error.message };
    }
  }

  async toggleStatus(dto: ToggleChapterStatusDto) {
    if (!dto || !dto.id || dto.is_active === undefined || dto.is_active === null) {
      return { ok: false, msg: 'Chapter ID and is_active (0 or 1) are required' };
    }

    try {
      const result = await this.db.execute(
        'CALL sp_chapter_toggle_status(?, ?)',
        [Number(dto.id), Number(dto.is_active)],
      );

      return this.parseSpResponse(result);
    } catch (error: any) {
      this.logger.error('Error toggling chapter status:', error);
      return { ok: false, msg: 'Failed to toggle chapter status', error: error.message };
    }
  }

  async getById(id: number | string) {
    if (!id || Number(id) <= 0) {
      return { ok: false, msg: 'Valid chapter ID is required' };
    }

    try {
      const rows = await this.db.execute(
        'SELECT `id`, `course_id`, `semester_id`, `subject_id`, `chapter_name`, `short_name`, `is_active` FROM `chapter` WHERE `id` = ?',
        [Number(id)],
      );

      if (Array.isArray(rows) && rows.length > 0) {
        return { ok: true, data: rows[0] };
      }
      return { ok: false, msg: 'Chapter not found' };
    } catch (err: any) {
      this.logger.error('Get chapter by id error:', err);
      return { ok: false, msg: 'Failed to retrieve chapter', error: err.message };
    }
  }
}
