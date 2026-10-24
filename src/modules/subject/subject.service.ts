import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import {
  AddSubjectDto,
  UpdateSubjectDto,
  SearchSubjectDto,
  ToggleSubjectStatusDto,
} from './dto/subject.dto';

@Injectable()
export class SubjectService {
  private readonly logger = new Logger(SubjectService.name);

  constructor(private readonly db: DatabaseService) {}

  private parseSpResponse(result: any): { ok: boolean; msg: string; data?: any } {
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

    if (typeof responseObj.data === 'string') {
      try {
        responseObj.data = JSON.parse(responseObj.data);
      } catch (e) {}
    }

    return responseObj;
  }

  async add(dto: AddSubjectDto) {
    if (!dto || !dto.course_id || !dto.semester_id || !dto.subject_name) {
      return { ok: false, msg: 'Course, semester and subject name are required' };
    }

    try {
      const result = await this.db.execute(
        'CALL sp_subject_add(?, ?, ?, ?, ?)',
        [
          Number(dto.course_id),
          Number(dto.semester_id),
          dto.subject_code ? String(dto.subject_code).trim() : null,
          String(dto.subject_name).trim(),
          dto.short_name ? String(dto.short_name).trim() : null,
        ],
      );

      return this.parseSpResponse(result);
    } catch (error: any) {
      this.logger.error('Error adding subject:', error);
      return { ok: false, msg: 'An error occurred while adding the subject', error: error.message };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_subject_getall()', []);
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error getting subjects:', error);
      return [];
    }
  }

  async update(dto: UpdateSubjectDto) {
    if (!dto || !dto.id || !dto.course_id || !dto.semester_id || !dto.subject_name) {
      return { ok: false, msg: 'Subject ID, course, semester and subject name are required' };
    }

    try {
      const result = await this.db.execute(
        'CALL sp_subject_update(?, ?, ?, ?, ?, ?)',
        [
          Number(dto.id),
          Number(dto.course_id),
          Number(dto.semester_id),
          dto.subject_code ? String(dto.subject_code).trim() : null,
          String(dto.subject_name).trim(),
          dto.short_name ? String(dto.short_name).trim() : null,
        ],
      );

      return this.parseSpResponse(result);
    } catch (err: any) {
      this.logger.error('Update subject error:', err);
      return { ok: false, msg: 'Failed to update subject', error: err.message };
    }
  }

  async search(c: SearchSubjectDto) {
    const rc = c?.rc ? Number(c.rc) : 10;
    const page = c?.page ? Number(c.page) : 1;

    if (rc <= 0 || page <= 0) {
      return { ok: false, msg: 'Page and record count must be greater than zero' };
    }

    try {
      const data = await this.db.execute(
        'CALL sp_subject_search(?, ?, ?, ?, ?, ?)',
        [
          c?.course_id ? Number(c.course_id) : null,
          c?.semester_id ? Number(c.semester_id) : null,
          c?.subject_name ? String(c.subject_name).trim() : null,
          c?.short_name ? String(c.short_name).trim() : null,
          rc,
          page,
        ],
      );
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error searching subjects:', error);
      return [];
    }
  }

  async delete(id: number | string) {
    if (!id || Number(id) <= 0) {
      return { ok: false, msg: 'Active subject does not exist' };
    }

    try {
      const result = await this.db.execute('CALL sp_subject_delete(?)', [Number(id)]);
      return this.parseSpResponse(result);
    } catch (err: any) {
      this.logger.error('Delete subject error:', err);
      return { ok: false, msg: 'Failed to delete subject', error: err.message };
    }
  }

  async getByCourseSemester(courseId: number | string, semesterId: number | string) {
    if (!courseId || !semesterId) {
      return { ok: false, msg: 'Course ID and semester ID are required' };
    }

    try {
      const data = await this.db.execute(
        'CALL sp_subject_get_by_course_semester(?, ?)',
        [Number(courseId), Number(semesterId)],
      );
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error getting subjects by course and semester:', error);
      return [];
    }
  }

  async toggleStatus(dto: ToggleSubjectStatusDto) {
    if (!dto || !dto.id || dto.is_active === undefined || dto.is_active === null) {
      return { ok: false, msg: 'Subject ID and is_active (0 or 1) are required' };
    }

    try {
      const result = await this.db.execute(
        'CALL sp_subject_toggle_status(?, ?)',
        [Number(dto.id), Number(dto.is_active)],
      );
      return this.parseSpResponse(result);
    } catch (error: any) {
      this.logger.error('Error toggling subject status:', error);
      return { ok: false, msg: 'Failed to toggle subject status', error: error.message };
    }
  }

  async getChapterCount(subjectId?: number | string) {
    try {
      const param = subjectId && Number(subjectId) > 0 ? Number(subjectId) : null;
      const data = await this.db.execute('CALL sp_subject_get_chapter_count(?)', [param]);
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error getting subject chapter count:', error);
      return [];
    }
  }
}
