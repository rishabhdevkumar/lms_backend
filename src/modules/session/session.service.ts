import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(c: any) {
    if (!c.session_name || !c.short_name) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const result = await this.db.execute('CALL sp_session_add(?, ?)', [
        c.session_name,
        c.short_name,
      ]);
      return result[0][0];
    } catch (error) {
      this.logger.error('Error adding session:', error);
      return { ok: false, msg: 'An error occurred while adding the session' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_session_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting sessions:', error);
      return [];
    }
  }

  async update(se: any) {
    if (!se.id || !se.session_name || !se.short_name) {
      return { ok: false, msg: 'All data is mandatory' };
    }
    try {
      const data = await this.db.execute('CALL sp_session_update(?, ?, ?)', [
        se.id,
        se.session_name,
        se.short_name,
      ]);
      return { ok: true, result: data[0][0] };
    } catch (err) {
      this.logger.error('Update session error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }

  async search(s: any) {
    try {
      const data = await this.db.execute('CALL sp_session_search(?,?,?,?)', [
        s.session_name || '',
        s.short_name || '',
        s.rc || 5,
        s.page || 1,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error searching sessions:', error);
      return [];
    }
  }

  async delete(id: string) {
    try {
      await this.db.execute('CALL sp_session_delete(?)', [id]);
      return { ok: true, msg: 'Session deleted successfully' };
    } catch (err) {
      this.logger.error('Delete session error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }
}
