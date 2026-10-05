import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class UniversityService {
  private readonly logger = new Logger(UniversityService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(u: any) {
    if (!u.name || !u.short_name) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const result = await this.db.execute('CALL sp_university_add(?, ?)', [
        u.name,
        u.short_name,
      ]);
      return result[0][0];
    } catch (error) {
      this.logger.error('Error adding university:', error);
      return { ok: false, msg: 'An error occurred while adding university' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_university_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting universities:', error);
      return [];
    }
  }
}
