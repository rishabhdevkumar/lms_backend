import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class CountryService {
  private readonly logger = new Logger(CountryService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(c: any) {
    if (!c.country_code || !c.country_name || !c.short_name) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const result = await this.db.execute('CALL sp_country_add(?, ?, ?)', [
        c.country_code,
        c.country_name,
        c.short_name,
      ]);
      return result[0][0];
    } catch (error) {
      this.logger.error('Error adding country:', error);
      return { ok: false, msg: 'An error occurred while adding country' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_country_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting countries:', error);
      return [];
    }
  }

  async update(u: any) {
    if (!u.id || !u.country_code || !u.country_name || !u.short_name) {
      return { ok: false, msg: 'All data is mandatory' };
    }
    try {
      const data = await this.db.execute('CALL sp_country_update(?,?,?,?)', [
        u.id,
        u.country_code,
        u.country_name,
        u.short_name,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error updating country:', error);
      return { ok: false, msg: 'Failed to update country' };
    }
  }

  async search(c: any) {
    try {
      const data = await this.db.execute('CALL sp_country_search(?,?,?,?,?)', [
        c.country_code || '',
        c.country_name || '',
        c.short_name || '',
        c.rc || 5,
        c.page || 1,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error searching countries:', error);
      return [];
    }
  }

  async delete(id: string) {
    try {
      await this.db.execute('CALL sp_country_delete(?)', [id]);
      return { ok: true, msg: 'Country deleted successfully' };
    } catch (err) {
      this.logger.error('Delete country error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }
}
