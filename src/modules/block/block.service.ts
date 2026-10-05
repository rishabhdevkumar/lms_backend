import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class BlockService {
  private readonly logger = new Logger(BlockService.name);

  constructor(private readonly db: DatabaseService) {}

  async addBlock(b: any) {
    if (!b.block_name || !b.short_name) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const data = await this.db.execute('CALL sp_block_add(?, ?)', [b.block_name, b.short_name]);
      return data[0][0];
    } catch (error) {
      this.logger.error('Error adding block:', error);
      return { ok: false, msg: 'An error occurred while adding block' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_block_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting blocks:', error);
      return [];
    }
  }
}
