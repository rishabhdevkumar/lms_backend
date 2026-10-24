import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import * as jwt from 'jsonwebtoken';
import {
  AddUserDto,
  AdminAddUserDto,
  AuthenticateUserDto,
  UpdateUserDto,
  ChangeUserStatusDto,
} from './dto/users.dto';

function formatDob(val: any): string | null {
  if (val === undefined || val === null || val === '') return null;
  if (val instanceof Date) {
    return val.toISOString().split('T')[0];
  }
  const str = String(val).trim();
  if (!str) return null;
  if (str.includes('T')) {
    return str.split('T')[0];
  }
  return str;
}

function formatDecimal(val: any): number | null {
  if (val === undefined || val === null || val === '') return null;
  const num = Number(val);
  return isNaN(num) ? null : num;
}

function formatInt(val: any): number | null {
  if (val === undefined || val === null || val === '') return null;
  const num = parseInt(String(val), 10);
  return isNaN(num) ? null : num;
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly db: DatabaseService) {}

  private parseSpResponse(result: any): { ok: boolean; success?: number; msg: string; message?: string; data?: any } {
    let responseObj: any = null;
    if (Array.isArray(result)) {
      for (const resultSet of result) {
        if (Array.isArray(resultSet) && resultSet.length > 0) {
          const firstRow = resultSet[0];
          if (
            firstRow &&
            ('ok' in firstRow || 'msg' in firstRow || 'success' in firstRow || 'message' in firstRow)
          ) {
            responseObj = { ...firstRow };
            break;
          }
        }
      }
    }

    if (!responseObj) {
      const first = result?.[0]?.[0];
      responseObj = first ? { ...first } : { ok: false, success: 0, msg: 'No response from database', message: 'No response from database' };
    }

    if (responseObj.ok !== undefined) {
      responseObj.ok = Boolean(responseObj.ok);
    } else if (responseObj.success !== undefined) {
      responseObj.ok = Boolean(responseObj.success);
    } else {
      responseObj.ok = true;
    }

    if (responseObj.success === undefined) {
      responseObj.success = responseObj.ok ? 1 : 0;
    } else {
      responseObj.success = Number(responseObj.success);
    }

    if (responseObj.msg !== undefined && responseObj.message === undefined) {
      responseObj.message = responseObj.msg;
    } else if (responseObj.message !== undefined && responseObj.msg === undefined) {
      responseObj.msg = responseObj.message;
    }

    if (typeof responseObj.data === 'string') {
      try {
        responseObj.data = JSON.parse(responseObj.data);
      } catch (e) {}
    }

    return responseObj;
  }


  async add(dto: AddUserDto | AdminAddUserDto) {
    if (!dto) {
      return { ok: false, msg: 'Request body is required' };
    }

    // If roll_no is provided, execute full admin user creation procedure
    if ((dto as any).roll_no) {
      return this.adminAdd(dto as AdminAddUserDto);
    }

    if (!dto.name || !dto.email || !dto.password) {
      return { ok: false, msg: 'Name, email, and password are required' };
    }

    try {
      const result = await this.db.execute(
        'CALL sp_users_add(?, ?, ?, ?)',
        [dto.name, dto.email, dto.password, dto.role || 'student'],
      );

      return this.parseSpResponse(result);
    } catch (error: any) {
      this.logger.error('Error in add user:', error);
      return { ok: false, msg: 'An error occurred while adding user', error: error.message };
    }
  }

  async adminAdd(dto: AdminAddUserDto) {
    if (!dto) {
      return { ok: false, msg: 'Request body is required' };
    }

    const rollNo = dto.roll_no ? String(dto.roll_no).trim() : '';
    const name = dto.name ? String(dto.name).trim() : '';
    const email = dto.email ? String(dto.email).trim() : '';
    const password = dto.password ? String(dto.password).trim() : '';
    const phone = dto.phone ? String(dto.phone).trim() : '';

    if (!rollNo || !name || !email || !password || !phone) {
      return { ok: false, msg: 'Roll number, name, email, password and phone are required' };
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return { ok: false, msg: 'Phone number must contain exactly 10 digits' };
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return {
        ok: false,
        msg: 'Password must contain at least 8 characters, one alphabet, one number and one special character',
      };
    }

    const role = dto.role ? String(dto.role).trim() : 'student';
    if (role && !['student', 'faculty', 'admin'].includes(role)) {
      return { ok: false, msg: 'Invalid role. Use student, faculty or admin' };
    }

    const language = dto.language ? String(dto.language).trim() : null;
    const dob = formatDob(dto.dob);
    const gender = dto.gender ? String(dto.gender).trim() : null;
    const sessionId = formatInt(dto.session_id);
    const courseId = formatInt(dto.course_id);
    const semesterId = formatInt(dto.semester_id);
    const aadharNo = dto.aadhar_no ? String(dto.aadhar_no).trim() : null;
    const fatherName = dto.father_name ? String(dto.father_name).trim() : null;
    const motherName = dto.mother_name ? String(dto.mother_name).trim() : null;
    const board10th = dto.board_10th ? String(dto.board_10th).trim() : null;
    const totalMarks10th = formatDecimal(dto.total_marks_10th);
    const percentage10th = formatDecimal(dto.percentage_10th);
    const board12th = dto.board_12th ? String(dto.board_12th).trim() : null;
    const totalMarks12th = formatDecimal(dto.total_marks_12th);
    const percentage12th = formatDecimal(dto.percentage_12th);

    try {
      const result = await this.db.execute(
        'CALL sp_admin_users_add(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          rollNo,
          name,
          email,
          password,
          language,
          phone,
          dob,
          gender,
          role,
          sessionId,
          courseId,
          semesterId,
          aadharNo,
          fatherName,
          motherName,
          board10th,
          totalMarks10th,
          percentage10th,
          board12th,
          totalMarks12th,
          percentage12th,
        ],
      );

      return this.parseSpResponse(result);
    } catch (error: any) {
      this.logger.error('Error in admin add user:', error);
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
          let userData = authResult.data;
          if (typeof userData === 'string') {
            try {
              userData = JSON.parse(userData);
            } catch (e) {}
          }
          // Strict account status verification
          let userStatus = String(userData?.status || authResult?.status || '').toLowerCase();
          let isActiveVal = userData?.is_active ?? authResult?.is_active;

          // If not present in SP output, verify directly from DB
          if ((!userStatus || isActiveVal === undefined) && (userData?.id || authResult?.id)) {
            try {
              const uId = userData?.id || authResult?.id;
              const dbUserRows = await this.db.execute('SELECT status, is_active FROM `users` WHERE `id` = ?', [uId]);
              if (dbUserRows && dbUserRows[0]) {
                userStatus = String(dbUserRows[0].status || '').toLowerCase();
                isActiveVal = dbUserRows[0].is_active;
                if (typeof userData === 'object' && userData !== null) {
                  userData.status = dbUserRows[0].status;
                  userData.is_active = dbUserRows[0].is_active;
                }
              }
            } catch (statusCheckErr: any) {
              this.logger.warn('Failed to verify user status in DB: ' + statusCheckErr.message);
            }
          }

          if (isActiveVal === 0 || isActiveVal === '0' || isActiveVal === false || (userStatus && userStatus !== 'active')) {
            if (userStatus === 'pending') {
              return { ok: false, msg: 'Your account is pending admin approval. You can login once an administrator activates your account.' };
            }
            return { ok: false, msg: 'Your account has been deactivated. Please contact administrator.' };
          }
          authResult.ok = true;
          const secret = process.env.TOKEN_SECRET || 'your_secret_key';

          if (typeof userData !== 'object' || userData === null) {
            userData = {
              id: authResult.id,
              roll_no: authResult.roll_no,
              name: authResult.name,
              email: authResult.email,
              role: authResult.role,
            };
          }

          const payloadId = userData?.id || authResult.id;
          const payloadRollNo = userData?.roll_no || authResult.roll_no;
          const payloadEmail = userData?.email || authResult.email;
          const payloadRole = userData?.role || authResult.role;

          const token = jwt.sign(
            { id: payloadId, roll_no: payloadRollNo, email: payloadEmail, role: payloadRole },
            secret,
            { expiresIn: '24h' },
          );

          userData.token = token;
          authResult.data = userData;
          authResult.token = token;
          authResult.role = payloadRole;
          authResult.user = userData;

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

  async toggleStatus(dto: ChangeUserStatusDto | { id?: any; user_id?: any; is_active?: any; status?: any }) {
    const rawId = dto?.user_id !== undefined && dto?.user_id !== null ? dto.user_id : dto?.id;
    const userId = Number(rawId);

    if (!userId || isNaN(userId) || userId <= 0) {
      return { ok: false, success: 0, msg: 'Invalid user ID', message: 'Invalid user ID' };
    }

    let isActive: number | null = null;

    if (dto?.is_active !== undefined && dto?.is_active !== null) {
      if (typeof dto.is_active === 'boolean') {
        isActive = dto.is_active ? 1 : 0;
      } else {
        const parsed = Number(dto.is_active);
        isActive = parsed === 1 ? 1 : parsed === 0 ? 0 : null;
      }
    } else if (dto?.status !== undefined && dto?.status !== null) {
      const rawStatus = String(dto.status).trim().toLowerCase();
      if (
        rawStatus.includes('deact') ||
        rawStatus.includes('inact') ||
        rawStatus === '0' ||
        rawStatus === 'suspended' ||
        rawStatus === 'lock'
      ) {
        isActive = 0;
      } else {
        isActive = 1;
      }
    }

    if (isActive === null || (isActive !== 0 && isActive !== 1)) {
      return { ok: false, success: 0, msg: 'Status must be 0 or 1', message: 'Status must be 0 or 1' };
    }

    try {
      const result = await this.db.execute('CALL sp_users_toggle_status(?, ?)', [
        userId,
        isActive,
      ]);

      const responseObj = this.parseSpResponse(result);

      // Keep status column synchronized with is_active
      const targetStatus = isActive === 1 ? 'Active' : 'Deactive';
      try {
        await this.db.execute('UPDATE `users` SET `status` = ?, `is_active` = ? WHERE `id` = ?', [
          targetStatus,
          isActive,
          userId,
        ]);
      } catch (syncErr: any) {
        this.logger.warn('Sync status with is_active warning: ' + syncErr.message);
      }

      return responseObj;
    } catch (error: any) {
      this.logger.error('Error in sp_users_toggle_status:', error);
      return {
        ok: false,
        success: 0,
        msg: 'Failed to update user status in database',
        message: 'Failed to update user status in database',
        error: error.message,
      };
    }
  }

  async changeStatus(id: any, statusOrIsActive: any) {
    if (typeof statusOrIsActive === 'number' || typeof statusOrIsActive === 'boolean') {
      return this.toggleStatus({ id, is_active: statusOrIsActive });
    }
    const rawStatus = String(statusOrIsActive || '').trim().toLowerCase();
    if (rawStatus === 'pending') {
      try {
        await this.db.execute('UPDATE `users` SET `status` = ?, `is_active` = 0 WHERE `id` = ?', ['Pending', id]);
        return {
          ok: true,
          success: 1,
          msg: 'User status changed to Pending',
          message: 'User status changed to Pending',
          status: 'Pending',
        };
      } catch (err: any) {
        this.logger.error('Error changing user status to pending:', err);
        return { ok: false, success: 0, msg: err.message, message: err.message };
      }
    }
    return this.toggleStatus({ id, status: statusOrIsActive });
  }

  async update(dto: UpdateUserDto) {
    const id = dto?.id ? Number(dto.id) : null;
    if (!id || id <= 0) {
      return { ok: false, msg: 'User does not exist' };
    }

    // Fetch existing user to enable partial updates and ensure all SP required fields exist
    let existingUser: any = null;
    try {
      const rows = await this.db.execute('SELECT * FROM `users` WHERE `id` = ?', [id]);
      if (Array.isArray(rows) && rows.length > 0) {
        existingUser = rows[0];
      }
    } catch (e: any) {
      this.logger.error('Error fetching existing user for update:', e);
    }

    if (!existingUser) {
      return { ok: false, msg: 'User does not exist' };
    }

    const rollNo =
      dto.roll_no !== undefined && dto.roll_no !== null && String(dto.roll_no).trim() !== ''
        ? String(dto.roll_no).trim()
        : existingUser.roll_no;

    const name =
      dto.name !== undefined && dto.name !== null && String(dto.name).trim() !== ''
        ? String(dto.name).trim()
        : existingUser.name;

    const email =
      dto.email !== undefined && dto.email !== null && String(dto.email).trim() !== ''
        ? String(dto.email).trim()
        : existingUser.email;

    const phone =
      dto.phone !== undefined && dto.phone !== null && String(dto.phone).trim() !== ''
        ? String(dto.phone).trim()
        : existingUser.phone;

    if (!rollNo || !name || !email || !phone) {
      return { ok: false, msg: 'Roll number, name, email and phone are required' };
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return { ok: false, msg: 'Phone number must contain exactly 10 digits (0-9 only)' };
    }

    const password =
      dto.password !== undefined && dto.password !== null && String(dto.password).trim() !== ''
        ? String(dto.password).trim()
        : null;

    if (password) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return {
          ok: false,
          msg: 'Password must contain at least 8 characters, one alphabet, one number and one special character',
        };
      }
    }

    const role =
      dto.role !== undefined && dto.role !== null && String(dto.role).trim() !== ''
        ? String(dto.role).trim()
        : existingUser.role;

    if (role && !['student', 'faculty', 'admin'].includes(role)) {
      return { ok: false, msg: 'Invalid role. Use student, faculty or admin' };
    }

    const language =
      dto.language !== undefined
        ? (dto.language ? String(dto.language).trim() : null)
        : existingUser.language;

    const dob = dto.dob !== undefined ? formatDob(dto.dob) : formatDob(existingUser.dob);

    const gender =
      dto.gender !== undefined
        ? (dto.gender ? String(dto.gender).trim() : null)
        : existingUser.gender;

    const sessionId =
      dto.session_id !== undefined ? formatInt(dto.session_id) : formatInt(existingUser.session_id);

    const courseId =
      dto.course_id !== undefined ? formatInt(dto.course_id) : formatInt(existingUser.course_id);

    const semesterId =
      dto.semester_id !== undefined ? formatInt(dto.semester_id) : formatInt(existingUser.semester_id);

    const aadharNo =
      dto.aadhar_no !== undefined
        ? (dto.aadhar_no ? String(dto.aadhar_no).trim() : null)
        : existingUser.aadhar_no;

    const fatherName =
      dto.father_name !== undefined
        ? (dto.father_name ? String(dto.father_name).trim() : null)
        : existingUser.father_name;

    const motherName =
      dto.mother_name !== undefined
        ? (dto.mother_name ? String(dto.mother_name).trim() : null)
        : existingUser.mother_name;

    const board10th =
      dto.board_10th !== undefined
        ? (dto.board_10th ? String(dto.board_10th).trim() : null)
        : existingUser.board_10th;

    const totalMarks10th =
      dto.total_marks_10th !== undefined
        ? formatDecimal(dto.total_marks_10th)
        : formatDecimal(existingUser.total_marks_10th);

    const percentage10th =
      dto.percentage_10th !== undefined
        ? formatDecimal(dto.percentage_10th)
        : formatDecimal(existingUser.percentage_10th);

    const board12th =
      dto.board_12th !== undefined
        ? (dto.board_12th ? String(dto.board_12th).trim() : null)
        : existingUser.board_12th;

    const totalMarks12th =
      dto.total_marks_12th !== undefined
        ? formatDecimal(dto.total_marks_12th)
        : formatDecimal(existingUser.total_marks_12th);

    const percentage12th =
      dto.percentage_12th !== undefined
        ? formatDecimal(dto.percentage_12th)
        : formatDecimal(existingUser.percentage_12th);

    try {
      const result = await this.db.execute(
        'CALL sp_users_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          id,
          rollNo,
          name,
          email,
          password,
          language,
          phone,
          dob,
          gender,
          role,
          sessionId,
          courseId,
          semesterId,
          aadharNo,
          fatherName,
          motherName,
          board10th,
          totalMarks10th,
          percentage10th,
          board12th,
          totalMarks12th,
          percentage12th,
        ],
      );

      const responseObj = this.parseSpResponse(result);

      if (dto.status && responseObj?.ok) {
        await this.changeStatus(id, dto.status);
      }

      return responseObj;
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

  async updatePasswordSelf(userId: any, password: string) {
    if (!userId) {
      return { ok: false, msg: 'User ID is required' };
    }
    if (!password || String(password).trim() === '') {
      return { ok: false, msg: 'Password is required' };
    }

    try {
      const result = await this.db.execute(
        'CALL sp_user_update_password_self(?, ?)',
        [Number(userId) || userId, String(password).trim()],
      );

      return this.parseSpResponse(result);
    } catch (error: any) {
      this.logger.error('Error in updatePasswordSelf:', error);
      return { ok: false, msg: 'Failed to update password', error: error.message };
    }
  }
}
