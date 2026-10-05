import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ModuleService {
  private readonly logger = new Logger(ModuleService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(mo: any) {
    if (!mo.module_name) {
      return { ok: false, msg: 'This field are Mandatory' };
    }
    try {
      const result = await this.db.execute('CALL sp_module_add(?)', [mo.module_name]);
      return result[0][0];
    } catch (error) {
      this.logger.error('Error adding module:', error);
      return { ok: false, msg: 'An error occurred while adding the module' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_module_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting modules:', error);
      return [];
    }
  }

  async update(mo: any) {
    if (!mo.id || !mo.module_name) {
      return { ok: false, msg: 'This fields is Mandatory' };
    }
    try {
      const data = await this.db.execute('CALL sp_module_update(?,?)', [mo.id, mo.module_name]);
      return data[0];
    } catch (error) {
      this.logger.error('Error updating module:', error);
      return { ok: false, msg: 'Failed to update module' };
    }
  }

  async search(mo: any) {
    try {
      const data = await this.db.execute('CALL sp_module_search(?,?,?)', [
        mo.module_name || '',
        mo.rc || 3,
        mo.page || 1,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error searching modules:', error);
      return [];
    }
  }

  async delete(id: string) {
    try {
      await this.db.execute('CALL sp_module_delete(?)', [id]);
      return { ok: true, msg: 'Module deleted successfully' };
    } catch (err) {
      this.logger.error('Delete module error:', err);
      return { ok: false, msg: 'Server error' };
    }
  }
}
