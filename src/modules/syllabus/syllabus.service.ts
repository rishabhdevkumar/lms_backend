import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import {
  AddSyllabusDto,
  UpdateSyllabusDto,
  SearchSyllabusDto,
} from './dto';

@Injectable()
export class SyllabusService {
  private readonly logger = new Logger(SyllabusService.name);

  constructor(private readonly db: DatabaseService) {}

  private parseSpResponse(result: any): { ok: boolean; msg: string; data?: any } {
    let responseObj: any = null;
    if (Array.isArray(result)) {
      for (const resultSet of result) {
        if (Array.isArray(resultSet) && resultSet.length > 0) {
          const firstRow = resultSet[0];
          if (firstRow && ('ok' in firstRow || 'msg' in firstRow || 'success' in firstRow || 'message' in firstRow)) {
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

  /**
   * Check if a syllabus name already exists for the given course and semester (case-insensitive & trimmed)
   */
  private async checkDuplicateName(
    courseId: number,
    semesterId: number,
    syllabusName: string,
    excludeId?: number,
  ): Promise<boolean> {
    const trimmedName = syllabusName.trim().toLowerCase();

    let query = `
      SELECT id 
      FROM syllabus 
      WHERE course_id = ? 
        AND semester_id = ? 
        AND LOWER(TRIM(syllabus_name)) = ? 
        AND is_active = 1
    `;
    const params: any[] = [courseId, semesterId, trimmedName];

    if (excludeId && excludeId > 0) {
      query += ` AND id <> ?`;
      params.push(excludeId);
    }

    query += ` LIMIT 1`;

    const [rows] = await this.db.execute(query, params);
    return Array.isArray(rows) && rows.length > 0;
  }

  async add(dto: AddSyllabusDto) {
    const courseId = Number(dto?.course_id);
    const semesterId = Number(dto?.semester_id);
    const syllabusName = dto?.syllabus_name ? String(dto.syllabus_name).trim() : '';
    const syllabus = dto?.syllabus ? String(dto.syllabus).trim() : '';

    if (!courseId || !semesterId || !syllabusName || !syllabus) {
      return { ok: false, msg: 'Course ID, semester ID, syllabus name and syllabus content are required' };
    }

    if (syllabusName.length < 3) {
      return { ok: false, msg: 'Syllabus name must be at least 3 characters long' };
    }

    try {
      // 1. Pre-validation in service: case-insensitive & trimmed duplicate check
      const isDuplicate = await this.checkDuplicateName(courseId, semesterId, syllabusName);
      if (isDuplicate) {
        return {
          ok: false,
          msg: 'Syllabus already exists for this course and semester',
        };
      }

      // 2. Execute SP (which also enforces the exact same check at DB level)
      const result = await this.db.execute('CALL sp_syllabus_add(?, ?, ?, ?, ?)', [
        courseId,
        semesterId,
        syllabusName,
        syllabus,
        dto.syllabus_pdf ? String(dto.syllabus_pdf).trim() : null,
      ]);
      return this.parseSpResponse(result);
    } catch (error: any) {
      this.logger.error('Error adding syllabus:', error);
      return { ok: false, msg: 'An error occurred while adding the syllabus', error: error.message };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_syllabus_getall()', []);
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error getting syllabus:', error);
      return [];
    }
  }

  async update(dto: UpdateSyllabusDto) {
    const id = Number(dto?.id);
    const courseId = Number(dto?.course_id);
    const semesterId = Number(dto?.semester_id);
    const syllabusName = dto?.syllabus_name ? String(dto.syllabus_name).trim() : '';
    const syllabus = dto?.syllabus ? String(dto.syllabus).trim() : '';

    if (!id || !courseId || !semesterId || !syllabusName || !syllabus) {
      return { ok: false, msg: 'ID, course ID, semester ID, syllabus name and syllabus content are required' };
    }

    if (syllabusName.length < 3) {
      return { ok: false, msg: 'Syllabus name must be at least 3 characters long' };
    }

    try {
      // 1. Pre-validation in service: case-insensitive & trimmed duplicate check
      const isDuplicate = await this.checkDuplicateName(courseId, semesterId, syllabusName, id);
      if (isDuplicate) {
        return {
          ok: false,
          msg: 'Another syllabus already has this name for this course and semester',
        };
      }

      // 2. Execute SP
      const result = await this.db.execute('CALL sp_syllabus_update(?, ?, ?, ?, ?, ?)', [
        id,
        courseId,
        semesterId,
        syllabusName,
        syllabus,
        dto.syllabus_pdf ? String(dto.syllabus_pdf).trim() : null,
      ]);
      return this.parseSpResponse(result);
    } catch (err: any) {
      this.logger.error('Update syllabus error:', err);
      return { ok: false, msg: 'Failed to update syllabus', error: err.message };
    }
  }

  async search(dto: SearchSyllabusDto) {
    const rc = dto?.rc ? Number(dto.rc) : 10;
    const page = dto?.page ? Number(dto.page) : 1;

    try {
      const data = await this.db.execute('CALL sp_syllabus_search(?, ?, ?, ?, ?)', [
        dto?.course_id ? Number(dto.course_id) : null,
        dto?.semester_id ? Number(dto.semester_id) : null,
        dto?.syllabus_name ? String(dto.syllabus_name).trim() : null,
        rc,
        page,
      ]);
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error searching syllabus:', error);
      return [];
    }
  }

  async getByCourseSemester(courseId: number | string, semesterId: number | string) {
    if (!courseId || !semesterId) {
      return { ok: false, msg: 'Course ID and semester ID are required' };
    }

    try {
      const data = await this.db.execute('CALL sp_syllabus_get_by_course_semester(?, ?)', [
        Number(courseId),
        Number(semesterId),
      ]);
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error getting syllabus by course and semester:', error);
      return [];
    }
  }

  async delete(id: number | string) {
    if (!id || Number(id) <= 0) {
      return { ok: false, msg: 'Valid syllabus ID is required' };
    }

    try {
      const result = await this.db.execute('CALL sp_syllabus_delete(?)', [Number(id)]);
      return this.parseSpResponse(result);
    } catch (err: any) {
      this.logger.error('Delete syllabus error:', err);
      return { ok: false, msg: 'Failed to delete syllabus', error: err.message };
    }
  }
}
