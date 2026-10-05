import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);

  constructor(private readonly db: DatabaseService) {}

  async add(r: any) {
    if (!r.block_id || !r.room_no) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const data = await this.db.execute('CALL sp_room_add(?, ?)', [r.block_id, r.room_no]);
      return data[0][0];
    } catch (error) {
      this.logger.error('Error adding room:', error);
      return { ok: false, msg: 'An error occurred while adding room' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_room_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Error getting rooms:', error);
      return [];
    }
  }
}
