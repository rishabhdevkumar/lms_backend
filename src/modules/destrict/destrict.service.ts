import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class DestrictService {
  private readonly logger = new Logger(DestrictService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(d: any) {
    if (!d.country_id || !d.state_id || !d.city_id || !d.destrict_name) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const result = await this.db.execute('CALL sp_destrict_add(?, ?, ?, ?)', [
        d.country_id,
        d.state_id,
        d.city_id,
        d.destrict_name,
      ]);
      return result[0][0];
    } catch (error) {
      this.logger.error('Error adding destrict:', error);
      return { ok: false, msg: 'An error occurred while adding destrict' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_destrict_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting destricts:', error);
      return [];
    }
  }

  async search(s: any) {
    try {
      const data = await this.db.execute('CALL sp_destrict_search(?,?,?,?)', [
        s.country_id,
        s.destrict_name || '',
        s.rc || 15,
        s.page || 1,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error searching destricts:', error);
      return [];
    }
  }

  async update(s: any) {
    if (!s.id || !s.country_id || !s.state_id || !s.city_id || !s.destrict_name) {
      return { ok: false, msg: 'All data is mandatory' };
    }
    try {
      const data = await this.db.execute('CALL sp_destrict_update(?, ?, ?, ?, ?)', [
        s.id,
        s.country_id,
        s.state_id,
        s.city_id,
        s.destrict_name,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error updating destrict:', error);
      return { ok: false, msg: 'Failed to update destrict' };
    }
  }

  async delete(s: any) {
    const destId = typeof s === 'object' ? s.state_id || s.id : s;
    if (!destId) {
      return { ok: false, msg: 'state id is mandotory' };
    }
    try {
      const data = await this.db.execute('CALL sp_destrict_delete(?)', [destId]);
      return data[0][0];
    } catch (error) {
      this.logger.error('Error deleting destrict:', error);
      return { ok: false, msg: 'Failed to delete destrict' };
    }
  }
}
