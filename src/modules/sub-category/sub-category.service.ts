import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class SubCategoryService {
  private readonly logger = new Logger(SubCategoryService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(c: any) {
    if (!c.module_id || !c.category_id || !c.sub_category_name) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const result = await this.db.execute('CALL sp_sub_category_add(?, ?, ?)', [
        c.module_id,
        c.category_id,
        c.sub_category_name,
      ]);
      return result[0][0];
    } catch (error) {
      this.logger.error('Error adding sub category:', error);
      return { ok: false, msg: 'An error occurred while adding sub category' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_sub_category_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting sub categories:', error);
      return [];
    }
  }

  async update(u: any) {
    try {
      const data = await this.db.execute('CALL sp_sub_category_update(?, ?, ?, ?)', [
        u.id,
        u.module_id || null,
        u.category_id || null,
        u.sub_category_name || null,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error updating sub category:', error);
      return { ok: false, msg: 'Failed to update sub category' };
    }
  }

  async search(c: any) {
    try {
      const data = await this.db.execute('CALL sp_sub_category_search(?, ?, ?)', [
        c.sub_category_name || '',
        c.rc || 10,
        c.page || 1,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error searching sub categories:', error);
      return [];
    }
  }

  async delete(id: string) {
    try {
      await this.db.execute('CALL sp_sub_category_delete(?)', [id]);
      return { ok: true, msg: 'Sub category deleted successfully' };
    } catch (error) {
      this.logger.error('Error deleting sub category:', error);
      return { ok: false, msg: 'Server error' };
    }
  }
}
