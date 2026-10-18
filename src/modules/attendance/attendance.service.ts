import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import {
  AddAttendanceDto,
  BulkMarkAttendanceDto,
  UpdateAttendanceDto,
} from './dto/attendance.dto';

@Injectable()
export class AttendanceService {
  private readonly logger = new Logger(AttendanceService.name);

  constructor(private readonly db: DatabaseService) {}

  /**
   * Mark attendance for a single student
   */
  async add(dto: AddAttendanceDto) {
    if (!dto.session_id || !dto.users_id || !dto.status || !dto.marked_by) {
      return {
        ok: false,
        msg: 'session_id, users_id, status, and marked_by are all required',
      };
    }

    try {
      const result = await this.db.execute(
        'CALL sp_attendance_add(?, ?, ?, ?)',
        [
          Number(dto.session_id),
          Number(dto.users_id),
          String(dto.status).toLowerCase(),
          Number(dto.marked_by),
        ],
      );

      const response = result[0]?.[0];
      return response || { ok: true, msg: 'Attendance marked successfully' };
    } catch (error: any) {
      this.logger.error('Error marking attendance:', error);
      return {
        ok: false,
        msg: 'An error occurred while marking attendance',
        error: error.message,
      };
    }
  }

  /**
   * Bulk mark attendance for a session / class
   */
  async bulkAdd(dto: BulkMarkAttendanceDto) {
    if (!dto.session_id || !dto.marked_by || !Array.isArray(dto.attendances)) {
      return {
        ok: false,
        msg: 'session_id, marked_by, and attendances array are required',
      };
    }

    const results: any[] = [];
    let successCount = 0;
    let failCount = 0;

    for (const item of dto.attendances) {
      try {
        const result = await this.db.execute(
          'CALL sp_attendance_add(?, ?, ?, ?)',
          [
            Number(dto.session_id),
            Number(item.users_id),
            String(item.status).toLowerCase(),
            Number(dto.marked_by),
          ],
        );
        const res = result[0]?.[0];
        if (res && (res.ok === 1 || res.ok === true)) {
          successCount++;
        } else {
          failCount++;
        }
        results.push({ users_id: item.users_id, ...res });
      } catch (err: any) {
        failCount++;
        results.push({
          users_id: item.users_id,
          ok: false,
          msg: err.message,
        });
      }
    }

    return {
      ok: true,
      msg: `Bulk attendance completed: ${successCount} marked, ${failCount} failed`,
      total: dto.attendances.length,
      successCount,
      failCount,
      results,
    };
  }

  /**
   * Update an existing attendance record
   */
  async update(dto: UpdateAttendanceDto) {
    if (!dto.id || !dto.status || !dto.marked_by) {
      return {
        ok: false,
        msg: 'id, status, and marked_by are required',
      };
    }

    try {
      const data = await this.db.execute(
        'CALL sp_attendance_update(?, ?, ?)',
        [
          Number(dto.id),
          String(dto.status).toLowerCase(),
          Number(dto.marked_by),
        ],
      );

      const response = data[0]?.[0];
      return response || { ok: true, msg: 'Attendance updated successfully' };
    } catch (error: any) {
      this.logger.error('Error updating attendance:', error);
      return {
        ok: false,
        msg: 'Failed to update attendance',
        error: error.message,
      };
    }
  }

  /**
   * Get all attendance records
   */
  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_attendance_getall()', []);
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error fetching all attendance records:', error);
      return [];
    }
  }

  /**
   * Get single attendance record by ID
   */
  async getById(id: number) {
    if (!id) {
      return { ok: false, msg: 'Attendance ID is required' };
    }

    try {
      const data = await this.db.execute(
        'CALL sp_attendance_getbyid(?)',
        [Number(id)],
      );
      const record = data[0]?.[0] || null;
      if (!record) {
        return { ok: false, msg: 'Attendance record not found' };
      }
      return { ok: true, data: record };
    } catch (error: any) {
      this.logger.error('Error fetching attendance by ID:', error);
      return { ok: false, msg: 'Server error', error: error.message };
    }
  }

  /**
   * Get all attendance records for a given session
   */
  async getBySession(sessionId: number) {
    if (!sessionId) {
      return [];
    }

    try {
      const data = await this.db.execute(
        'CALL sp_attendance_getby_session(?)',
        [Number(sessionId)],
      );
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error fetching attendance by session:', error);
      return [];
    }
  }

  /**
   * Get attendance history for a specific student
   */
  async getByStudent(usersId: number) {
    if (!usersId) {
      return [];
    }

    try {
      const data = await this.db.execute(
        'CALL sp_attendance_getby_student(?)',
        [Number(usersId)],
      );
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error fetching student attendance:', error);
      return [];
    }
  }

  /**
   * Get attendance records for all students in a batch
   */
  async getByBatch(batchesId: number) {
    if (!batchesId) {
      return [];
    }

    try {
      const data = await this.db.execute(
        'CALL sp_attendance_getby_batch(?)',
        [Number(batchesId)],
      );
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error fetching attendance by batch:', error);
      return [];
    }
  }

  /**
   * Get attendance records for a specific date (YYYY-MM-DD)
   */
  async getByDate(date: string) {
    if (!date) {
      return [];
    }

    try {
      const data = await this.db.execute(
        'CALL sp_attendance_getby_date(?)',
        [date],
      );
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error fetching attendance by date:', error);
      return [];
    }
  }

  /**
   * Get attendance percentage and stats for a student
   */
  async getPercentage(usersId: number) {
    if (!usersId) {
      return { ok: false, msg: 'Student users_id is required' };
    }

    try {
      const data = await this.db.execute(
        'CALL sp_attendance_percentage(?)',
        [Number(usersId)],
      );
      const stats = data[0]?.[0] || null;
      if (!stats) {
        return {
          ok: false,
          msg: 'Unable to calculate attendance percentage',
        };
      }
      return { ok: true, data: stats };
    } catch (error: any) {
      this.logger.error('Error calculating attendance percentage:', error);
      return { ok: false, msg: 'Server error', error: error.message };
    }
  }

  /**
   * Delete attendance record by ID
   */
  async delete(id: number) {
    if (!id) {
      return { ok: false, msg: 'Attendance ID is required' };
    }

    try {
      const data = await this.db.execute(
        'CALL sp_attendance_delete(?)',
        [Number(id)],
      );
      return (
        data[0]?.[0] || { ok: true, msg: 'Attendance deleted successfully' }
      );
    } catch (error: any) {
      this.logger.error('Error deleting attendance:', error);
      return {
        ok: false,
        msg: 'Failed to delete attendance',
        error: error.message,
      };
    }
  }
}
