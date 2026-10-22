import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import {
  CreateCourseDetailDto,
  UpdateCourseDetailDto,
  UpdateCourseDetailStatusDto,
} from './dto';

@Injectable()
export class CourseDetailsService {
  private readonly logger = new Logger(CourseDetailsService.name);

  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateCourseDetailDto) {
    if (!dto.course_id || !dto.title || !dto.category) {
      return { ok: false, msg: 'course_id, category, and title are required' };
    }

    try {
      const result = await this.db.execute(
        'CALL sp_course_details_add(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          dto.course_id,
          dto.category,
          dto.title,
          dto.description ?? null,
          dto.image ?? null,
          dto.badges_text ?? null,
          dto.duration_hours ?? 0,
          dto.total_lessons ?? 0,
          dto.price ?? 0,
          dto.display_order ?? 0,
          dto.is_active !== undefined ? (dto.is_active ? 1 : 0) : 1,
        ],
      );

      const created = result[0]?.[0] || result[0];
      return { ok: true, data: created };
    } catch (error) {
      this.logger.error('Error adding course details:', error);
      return {
        ok: false,
        msg: 'An error occurred while adding the course details',
        error: error.message,
      };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_course_details_get_all()', []);
      return { ok: true, data: data[0] || [] };
    } catch (error) {
      this.logger.error('Error fetching all course details:', error);
      return { ok: false, msg: 'Server error fetching course details', data: [] };
    }
  }

  async getActive() {
    try {
      const data = await this.db.execute(
        'CALL sp_course_details_get_active()',
        [],
      );
      return { ok: true, data: data[0] || [] };
    } catch (error) {
      this.logger.error('Error fetching active course details:', error);
      return { ok: false, msg: 'Server error fetching active course details', data: [] };
    }
  }

  async getById(id: number | string) {
    try {
      const data = await this.db.execute('CALL sp_course_details_get_by_id(?)', [
        id,
      ]);
      const item = data[0]?.[0] || null;
      if (!item) {
        return { ok: false, msg: 'Course detail not found', data: null };
      }
      return { ok: true, data: item };
    } catch (error) {
      this.logger.error(`Error fetching course detail with id ${id}:`, error);
      return { ok: false, msg: 'Server error fetching course detail', data: null };
    }
  }

  async getByCourseId(courseId: number | string) {
    try {
      const data = await this.db.execute(
        'CALL sp_course_details_get_by_course_id(?)',
        [courseId],
      );
      const item = data[0]?.[0] || null;
      if (!item) {
        return { ok: false, msg: 'Course detail not found for this course', data: null };
      }
      return { ok: true, data: item };
    } catch (error) {
      this.logger.error(
        `Error fetching course detail for course_id ${courseId}:`,
        error,
      );
      return { ok: false, msg: 'Server error fetching course detail', data: null };
    }
  }

  async update(id: number | string, dto: UpdateCourseDetailDto) {
    const targetId = id || dto.id;
    if (!targetId) {
      return { ok: false, msg: 'Course detail ID is required for update' };
    }

    try {
      // Fetch existing record to support safe partial updates
      const existingRes = await this.db.execute(
        'CALL sp_course_details_get_by_id(?)',
        [targetId],
      );
      const existing = existingRes[0]?.[0];

      if (!existing) {
        return { ok: false, msg: 'Course detail record not found' };
      }

      const course_id = dto.course_id ?? existing.course_id;
      const category = dto.category ?? existing.category;
      const title = dto.title ?? existing.title;
      const description = dto.description ?? existing.description;
      const image = dto.image ?? existing.image;
      const badges_text = dto.badges_text ?? existing.badges_text;
      const duration_hours = dto.duration_hours ?? existing.duration_hours ?? 0;
      const total_lessons = dto.total_lessons ?? existing.total_lessons ?? 0;
      const price = dto.price ?? existing.price ?? 0;
      const display_order = dto.display_order ?? existing.display_order ?? 0;
      const is_active =
        dto.is_active !== undefined
          ? dto.is_active
            ? 1
            : 0
          : existing.is_active ?? 1;

      const result = await this.db.execute(
        'CALL sp_course_details_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          targetId,
          course_id,
          category,
          title,
          description,
          image,
          badges_text,
          duration_hours,
          total_lessons,
          price,
          display_order,
          is_active,
        ],
      );

      const updateResult = result[0]?.[0] || { ok: true };
      return { ok: true, result: updateResult };
    } catch (error) {
      this.logger.error(`Error updating course detail ${targetId}:`, error);
      return { ok: false, msg: 'Server error updating course detail' };
    }
  }

  async updateStatus(id: number | string, dto: UpdateCourseDetailStatusDto) {
    const targetId = id || dto.id;
    if (!targetId) {
      return { ok: false, msg: 'Course detail ID is required' };
    }

    try {
      const result = await this.db.execute(
        'CALL sp_course_details_update_status(?, ?)',
        [targetId, dto.is_active ? 1 : 0],
      );
      const statusResult = result[0]?.[0] || { ok: true };
      return { ok: true, result: statusResult };
    } catch (error) {
      this.logger.error(
        `Error updating course detail status for ID ${targetId}:`,
        error,
      );
      return { ok: false, msg: 'Server error updating course detail status' };
    }
  }

  async delete(id: number | string) {
    try {
      const result = await this.db.execute(
        'CALL sp_course_details_delete(?)',
        [id],
      );
      const deleteResult = result[0]?.[0] || { ok: true };
      return { ok: true, result: deleteResult };
    } catch (error) {
      this.logger.error(`Error deleting course detail with id ${id}:`, error);
      return { ok: false, msg: 'Server error deleting course detail' };
    }
  }
}
