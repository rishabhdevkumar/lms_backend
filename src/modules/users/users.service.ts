import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import * as jwt from 'jsonwebtoken';
import { AddUserDto, AuthenticateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly db: DatabaseService) { }

  async add(dto: AddUserDto) {
    if (!dto || !dto.name || !dto.email || !dto.password) {
      return { ok: false, msg: 'Name, email, and password are required' };
    }
    try {
      const result = await this.db.execute(
        'CALL sp_users_add(?, ?, ?, ?)',
        [dto.name, dto.email, dto.password, dto.role || 'student'],
      );

      let responseObj: any = null;
      if (Array.isArray(result)) {
        for (const resultSet of result) {
          if (Array.isArray(resultSet) && resultSet.length > 0) {
            const firstRow = resultSet[0];
            if (firstRow && ('ok' in firstRow || 'msg' in firstRow)) {
              responseObj = firstRow;
              break;
            }
          }
        }
      }

      if (!responseObj) {
        responseObj = result?.[0]?.[0] || { ok: false, msg: 'No response from database' };
      }

      if (responseObj.ok !== undefined) {
        responseObj.ok = Boolean(responseObj.ok);
      }

      if (typeof responseObj.data === 'string') {
        try {
          responseObj.data = JSON.parse(responseObj.data);
        } catch (e) {
        }
      }

      return responseObj;
    } catch (error: any) {
      this.logger.error('Error in add user:', error);
      return { ok: false, msg: 'An error occurred while adding user', error: error.message };
    }
  }

  async authenticate(body: AuthenticateUserDto) {
    const identifier = body.email;
    const { password } = body;
    if (!identifier || !password) {
      return { ok: false, msg: 'Email and password are mandatory' };
    }
    try {
      const rows = await this.db.execute('CALL sp_users_authenticate(?,?)', [
        identifier,
        password,
      ]);
      const authResult = rows[0]?.[0];
      if (authResult) {
        if (authResult.ok === true || authResult.ok === 1) {
          authResult.ok = true;
          const secret = process.env.TOKEN_SECRET || 'your_secret_key';
          let userData = authResult.data;
          if (typeof userData === 'string') {
            try {
              userData = JSON.parse(userData);
            } catch (e) {
            }
          }
          const payloadId = userData?.id || authResult.id;
          const payloadRollNo = userData?.roll_no || authResult.roll_no;
          const payloadEmail = userData?.email || authResult.email;

          const token = jwt.sign(
            { id: payloadId, roll_no: payloadRollNo, email: payloadEmail },
            secret,
            { expiresIn: '24h' },
          );
          if (typeof authResult.data === 'object' && authResult.data !== null) {
            authResult.data.token = token;
          } else {
            authResult.token = token;
          }
          return authResult;
        } else {
          authResult.ok = Boolean(authResult.ok);
          return authResult;
        }
      }
      return { ok: false, msg: 'Invalid credentials' };
    } catch (err: any) {
      this.logger.error('Error in user authenticate:', err);
      return { ok: false, msg: 'Server error', error: err.message };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_users_getall()', []);
      return data[0] || [];
    } catch (error: any) {
      this.logger.error('Error in users getall:', error);
      return [];
    }
  }

  async update(dto: UpdateUserDto) {
    if (!dto || !dto.id) {
      return { ok: false, msg: 'User ID is required' };
    }

    let phoneStr: string | null = null;
    if (dto.phone !== undefined && dto.phone !== null && String(dto.phone).trim() !== '') {
      phoneStr = String(dto.phone).trim();
      if (!/^[0-9]{10}$/.test(phoneStr)) {
        return { ok: false, msg: 'Phone number must contain exactly 10 digits' };
      }
    }

    const nameStr = dto.name !== undefined && dto.name !== null && String(dto.name).trim() !== '' ? String(dto.name).trim() : null;
    const emailStr = dto.email !== undefined && dto.email !== null && String(dto.email).trim() !== '' ? String(dto.email).trim() : null;
    const passwordStr = dto.password !== undefined && dto.password !== null && String(dto.password).trim() !== '' ? String(dto.password).trim() : null;

    if (!nameStr && !emailStr && !passwordStr && !phoneStr) {
      return { ok: false, msg: 'At least one field (name, email, password, or phone) must be provided for update' };
    }

    try {
      const result = await this.db.execute(
        'CALL sp_users_update(?, ?, ?, ?, ?)',
        [dto.id, nameStr, emailStr, passwordStr, phoneStr],
      );
      const resObj = result?.[0]?.[0];
      if (resObj) {
        if (resObj.ok !== undefined) resObj.ok = Boolean(resObj.ok);
        return resObj;
      }
      return { ok: true, msg: 'User updated successfully' };
    } catch (error: any) {
      this.logger.error('Error in update user:', error);
      return { ok: false, msg: 'Failed to update user', error: error.message };
    }
  }

  async details(userId: string) {
    try {
      const rows = await this.db.execute('CALL sp_users_get_by_id(?)', [Number(userId) || userId]);
      if (rows[0] && rows[0].length > 0) {
        return { ok: true, data: rows[0][0] };
      } else {
        return { ok: false, msg: 'User not found' };
      }
    } catch (err: any) {
      this.logger.error('Error in user details:', err);
      return { ok: false, msg: 'Server error' };
    }
  }

  async getSelf(userId: any) {
    try {
      const rows = await this.db.execute('CALL sp_users_get_by_id(?)', [userId]);
      if (rows[0] && rows[0].length > 0) {
        return { ok: true, user: rows[0][0] };
      }
      return { ok: false, msg: 'User not found' };
    } catch (error: any) {
      return { ok: false, msg: 'Database error: ' + error.message, user: {} };
    }
  }
}
