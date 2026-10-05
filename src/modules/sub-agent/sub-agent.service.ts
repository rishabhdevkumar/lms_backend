import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class SubAgentService {
  private readonly logger = new Logger(SubAgentService.name);

  constructor(private readonly db: DatabaseService) {}

  async addSubAgent(sub: any) {
    if (!sub.name || !sub.email || !sub.password) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const data = await this.db.execute('CALL sp_sub_agent_add(?, ?, ?, ?, ?, ?, ?, ?)', [
        sub.agent_id,
        sub.name,
        sub.email,
        sub.password,
        sub.dob,
        sub.phone,
        sub.whatsapp_number,
        sub.organisation,
      ]);
      return data[0][0];
    } catch (error) {
      this.logger.error('Error adding sub agent:', error);
      return { ok: false, msg: 'An error occurred while adding sub agent' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_sub_agent_getall()', []);
      let subAgents = data[0] || [];
      subAgents = subAgents.map((sub: any) => {
        if (sub.dob) {
          const date = new Date(sub.dob);
          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, '0');
          const dd = String(date.getDate()).padStart(2, '0');
          sub.dob = `${yyyy}-${mm}-${dd}`;
        }
        return sub;
      });
      return subAgents;
    } catch (error) {
      this.logger.error('Error getting sub agents:', error);
      return [];
    }
  }
}
