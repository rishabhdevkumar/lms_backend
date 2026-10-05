import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ModuleTablesService {
  private readonly logger = new Logger(ModuleTablesService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(t: any) {
    if (!t.module_id || !t.table_name) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const result = await this.db.execute('CALL sp_module_tables_add(?, ?)', [
        t.module_id,
        t.table_name,
      ]);
      return result[0][0];
    } catch (error) {
      this.logger.error('Error adding module table:', error);
      return { ok: false, msg: 'An error occurred while adding module table' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_module_tables_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting module tables:', error);
      return [];
    }
  }

  async update(m: any) {
    if (!m.id || !m.table_name) {
      return { ok: false, msg: 'All data is mandatory' };
    }
    try {
      const data = await this.db.execute('CALL sp_module_tables_update(?,?)', [m.id, m.table_name]);
      return data[0];
    } catch (error) {
      this.logger.error('Error updating module table:', error);
      return { ok: false, msg: 'Failed to update module table' };
    }
  }

  async search(m: any) {
    try {
      const data = await this.db.execute('CALL sp_module_tables_search(?,?,?)', [
        m.table_name || '',
        m.rc || 5,
        m.page || 1,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error searching module tables:', error);
      return [];
    }
  }

  async delete(id: string) {
    try {
      await this.db.execute('CALL sp_module_tables_delete(?)', [id]);
      return { ok: true, msg: 'Table deleted successfully' };
    } catch (err) {
      this.logger.error('Delete module table error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }
}
