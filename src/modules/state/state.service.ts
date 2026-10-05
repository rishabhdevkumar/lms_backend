import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class StateService {
  private readonly logger = new Logger(StateService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(s: any) {
    if (!s.country_id || !s.state_name || !s.short_name) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const result = await this.db.execute('CALL sp_state_add(?, ?, ?)', [
        s.country_id,
        s.state_name,
        s.short_name,
      ]);
      return result[0][0];
    } catch (error) {
      this.logger.error('Error adding state:', error);
      return { ok: false, msg: 'An error occurred while adding the state' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_state_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting states:', error);
      return [];
    }
  }

  async search(s: any) {
    try {
      const data = await this.db.execute('CALL sp_state_search(?,?,?,?,?)', [
        s.country_id,
        s.state_name || '',
        s.short_name || '',
        s.rc || 15,
        s.page || 1,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error searching states:', error);
      return [];
    }
  }

  async update(s: any) {
    if (!s.id || !s.country_id || !s.state_name || !s.short_name) {
      return { ok: false, msg: 'All data is mandatory' };
    }
    try {
      const data = await this.db.execute('CALL sp_state_update(?,?,?,?)', [
        s.id,
        s.country_id,
        s.state_name,
        s.short_name,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error updating state:', error);
      return { ok: false, msg: 'Failed to update state' };
    }
  }

  async delete(s: any) {
    const stateId = typeof s === 'object' ? s.state_id || s.id : s;
    if (!stateId) {
      return { ok: false, msg: 'state id is mandatory' };
    }
    try {
      const data = await this.db.execute('CALL sp_state_delete(?)', [stateId]);
      return data[0][0];
    } catch (error) {
      this.logger.error('Error deleting state:', error);
      return { ok: false, msg: 'Failed to delete state' };
    }
  }
}
