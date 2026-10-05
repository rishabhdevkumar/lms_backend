import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class CityService {
  private readonly logger = new Logger(CityService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(c: any) {
    if (!c.country_id || !c.state_id || !c.name) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const result = await this.db.execute('CALL sp_city_add(?, ?, ?)', [
        c.country_id,
        c.state_id,
        c.name,
      ]);
      return result[0][0];
    } catch (error) {
      this.logger.error('Error adding city:', error);
      return { ok: false, msg: 'An error occurred while adding the city' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_city_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting cities:', error);
      return [];
    }
  }

  async update(s: any) {
    if (!s.id || !s.country_id || !s.state_id || !s.name) {
      return { ok: false, msg: 'All data is mandatory' };
    }
    try {
      const data = await this.db.execute('CALL sp_city_update(?, ?, ?, ?)', [
        s.id,
        s.country_id,
        s.state_id,
        s.name,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error updating city:', error);
      return { ok: false, msg: 'Failed to update city' };
    }
  }

  async delete(id: string) {
    try {
      await this.db.execute('CALL sp_city_delete(?)', [id]);
      return { ok: true, msg: 'City deleted successfully' };
    } catch (error) {
      this.logger.error('Error deleting city:', error);
      return { ok: false, msg: 'Server error' };
    }
  }
}
