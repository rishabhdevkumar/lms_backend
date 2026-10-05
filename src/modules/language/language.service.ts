import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class LanguageService {
  private readonly logger = new Logger(LanguageService.name);

  constructor(private readonly db: DatabaseService) {}

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_language_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting languages:', error);
      return [];
    }
  }

  async getActive() {
    try {
      const data = await this.db.execute('CALL sp_language_get_active()', []);
      return { ok: true, languages: data[0] };
    } catch (error) {
      this.logger.error('Error getting active languages:', error);
      return { ok: false, msg: 'Database error: ' + error.message };
    }
  }
}
