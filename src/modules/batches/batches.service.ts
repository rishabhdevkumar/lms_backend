import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { AddBatchDto, UpdateBatchDto, EnrollStudentDto, RemoveStudentDto } from './dto/batches.dto';

@Injectable()
export class BatchesService {
  private readonly logger = new Logger(BatchesService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(dto: AddBatchDto) {
    const courseId = dto.course_id;
    const usersId = dto.users_id || (dto as any).instructor_id;

    if (!courseId || !usersId) {
      return { ok: false, msg: 'course_id and users_id (instructor) are required' };
    }

    try {
      const result = await this.db.execute('CALL sp_batches_add(?, ?, ?, ?, ?, ?, ?, ?)', [
        courseId,
        usersId,
        dto.start_date || null,
        dto.end_date || null,
        dto.start_time || null,
        dto.end_time || null,
        dto.room || null,
        dto.status || 'upcoming',
      ]);
      return result[0]?.[0] || { ok: true, msg: 'Batch created successfully' };
    } catch (error: any) {
      this.logger.error('Error adding batch:', error);
      return { ok: false, msg: 'An error occurred while creating batch', error: error.message };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_batches_getall()', []);
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error fetching all batches:', error);
      return [];
    }
  }

  async getById(id: number) {
    if (!id) {
      return { ok: false, msg: 'Batch ID is required' };
    }
    try {
      const data = await this.db.execute('CALL sp_batches_get_by_id(?)', [Number(id)]);
      const batch = data[0]?.[0] || null;
      if (!batch) {
        return { ok: false, msg: 'Batch not found' };
      }
      return { ok: true, data: batch };
    } catch (error: any) {
      this.logger.error('Error fetching batch by id:', error);
      return { ok: false, msg: 'Server error' };
    }
  }

  async update(dto: UpdateBatchDto) {
    const courseId = dto.course_id;
    const usersId = dto.users_id || (dto as any).instructor_id;

    if (!dto.id || !courseId || !usersId) {
      return { ok: false, msg: 'id, course_id, and users_id are required' };
    }

    try {
      const data = await this.db.execute('CALL sp_batches_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        Number(dto.id),
        dto.batch_code || null,
        courseId,
        usersId,
        dto.start_date || null,
        dto.end_date || null,
        dto.start_time || null,
        dto.end_time || null,
        dto.room || null,
        dto.status || 'upcoming',
      ]);
      return data[0]?.[0] || { ok: true, msg: 'Batch updated successfully' };
    } catch (error: any) {
      this.logger.error('Error updating batch:', error);
      return { ok: false, msg: 'Failed to update batch', error: error.message };
    }
  }

  async delete(id: number) {
    if (!id) {
      return { ok: false, msg: 'Batch ID is required' };
    }
    try {
      const data = await this.db.execute('CALL sp_batches_delete(?)', [Number(id)]);
      return data[0]?.[0] || { ok: true, msg: 'Batch deleted successfully' };
    } catch (error: any) {
      this.logger.error('Error deleting batch:', error);
      return { ok: false, msg: 'Failed to delete batch', error: error.message };
    }
  }

  async enrollStudent(dto: EnrollStudentDto) {
    const batchId = dto.batch_id || (dto as any).batches_id;
    const usersId = dto.users_id || (dto as any).student_id;

    if (!batchId || !usersId) {
      return { ok: false, msg: 'batch_id and users_id (student) are required' };
    }

    try {
      const data = await this.db.execute('CALL sp_batch_students_add(?, ?)', [
        Number(batchId),
        Number(usersId),
      ]);
      return data[0]?.[0] || { ok: true, msg: 'Student enrolled successfully' };
    } catch (error: any) {
      this.logger.error('Error enrolling student in batch:', error);
      return { ok: false, msg: 'Failed to enroll student', error: error.message };
    }
  }

  async removeStudent(dto: RemoveStudentDto) {
    const batchId = dto.batch_id || (dto as any).batches_id;
    const usersId = dto.users_id || (dto as any).student_id;

    if (!batchId || !usersId) {
      return { ok: false, msg: 'batch_id and users_id (student) are required' };
    }

    try {
      const data = await this.db.execute('CALL sp_batches_remove_student(?, ?)', [
        Number(batchId),
        Number(usersId),
      ]);
      return data[0]?.[0] || { ok: true, msg: 'Student removed from batch successfully' };
    } catch (error: any) {
      this.logger.error('Error removing student from batch:', error);
      return { ok: false, msg: 'Failed to remove student', error: error.message };
    }
  }

  async getStudents(batchId: number) {
    if (!batchId) {
      return [];
    }
    try {
      const data = await this.db.execute('CALL sp_batches_get_students(?)', [Number(batchId)]);
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error fetching students for batch:', error);
      return [];
    }
  }
}
