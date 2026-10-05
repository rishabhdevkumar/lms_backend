import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class FacultyDepService {
  private readonly logger = new Logger(FacultyDepService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(dep: any) {
    if (!dep.dep_name || !dep.dep_short_name) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const data = await this.db.execute('CALL sp_faculty_dep_add(?, ?)', [
        dep.dep_name,
        dep.dep_short_name,
      ]);
      return data[0][0];
    } catch (error) {
      this.logger.error('Error adding faculty department:', error);
      return { ok: false, msg: 'An error occurred while adding department' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_faculty_dep_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting faculty departments:', error);
      return [];
    }
  }
}
