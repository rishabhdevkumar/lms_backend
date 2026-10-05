import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(c: any) {
    if (!c.module_id || !c.category_name || !c.short_name) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const result = await this.db.execute('CALL sp_category_add(?, ?, ?)', [
        c.module_id,
        c.category_name,
        c.short_name,
      ]);
      return result[0][0];
    } catch (error) {
      this.logger.error('Error adding category:', error);
      return { ok: false, msg: 'An error occurred while adding the category' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_category_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting categories:', error);
      return [];
    }
  }

  async update(c: any) {
    if (!c.id || !c.category_name || !c.short_name) {
      return { ok: false, msg: 'All data is mandatory' };
    }
    try {
      const data = await this.db.execute('CALL sp_category_update(?,?,?)', [
        c.id,
        c.category_name,
        c.short_name,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error updating category:', error);
      return { ok: false, msg: 'Failed to update category' };
    }
  }

  async search(c: any) {
    try {
      const data = await this.db.execute('CALL sp_category_search(?,?,?,?)', [
        c.category_name || '',
        c.short_name || '',
        c.rc || 5,
        c.page || 1,
      ]);
      return data[0];
    } catch (error) {
      this.logger.error('Error searching categories:', error);
      return [];
    }
  }

  async delete(id: string) {
    try {
      await this.db.execute('CALL sp_category_delete(?)', [id]);
      return { ok: true, msg: 'Category deleted successfully' };
    } catch (error) {
      this.logger.error('Error deleting category:', error);
      return { ok: false, msg: 'Server error' };
    }
  }
}
