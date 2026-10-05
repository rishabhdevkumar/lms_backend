import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class TimetableService {
  private readonly logger = new Logger(TimetableService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(a: any) {
    if (
      !a.session_id ||
      !a.course_id ||
      !a.semester_id ||
      !a.subject_id ||
      !a.faculty_id ||
      !a.day ||
      !a.start_time ||
      !a.end_time ||
      !a.block_id ||
      !a.room_id
    ) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const result = await this.db.execute(
        'CALL sp_add_timetable(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          a.session_id,
          a.course_id,
          a.semester_id,
          a.subject_id,
          a.faculty_id,
          a.day,
          a.start_time,
          a.end_time,
          a.block_id,
          a.room_id,
        ],
      );
      return result[0][0];
    } catch (error) {
      this.logger.error('Error adding timetable:', error);
      return { ok: false, msg: 'An error occurred while adding the record' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_timetable_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting timetables:', error);
      return [];
    }
  }
}
