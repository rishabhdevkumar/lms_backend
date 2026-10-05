import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(private readonly db: DatabaseService) {}

  async addAdmin(body: any) {
    if (!body.f_name || !body.l_name || !body.email || !body.password || !body.dob || !body.phone) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const result = await this.db.execute('CALL sp_admin_add(?, ?, ?, ?, ?, ?)', [
        body.f_name,
        body.l_name,
        body.email,
        body.password,
        body.dob,
        body.phone,
      ]);
      return result[0][0];
    } catch (error) {
      this.logger.error('Error adding admin:', error);
      return { ok: false, msg: 'An error occurred while adding the user' };
    }
  }

  async authenticate(body: any) {
    if (!body.email || !body.password) {
      return 'Email and Password are mandatory';
    }
    try {
      let data = await this.db.execute('CALL sp_admin_authenticate(?,?)', [
        body.email,
        body.password,
      ]);
      const result = data[0][0];
      if (result && result.ok) {
        const secret = process.env.TOKEN_SECRET || 'your_secret_key';
        const token = jwt.sign(result.data, secret, { expiresIn: '24h' });
        result.token = token;
      }
      return result;
    } catch (error) {
      this.logger.error('Authentication error:', error);
      return { ok: false, msg: 'Internal server error' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_admin_getall()', []);
      return data[0];
    } catch (error) {
      this.logger.error('Get all admin error:', error);
      return [];
    }
  }
}
