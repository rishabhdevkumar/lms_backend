import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class AgentService {
  private readonly logger = new Logger(AgentService.name);

  constructor(private readonly db: DatabaseService) {}

  async addAgent(ag: any) {
    if (!ag.agent_name || !ag.email || !ag.password) {
      return { ok: false, msg: 'All fields are required' };
    }
    try {
      const data = await this.db.execute('CALL sp_agent_add(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        ag.country_id,
        ag.state_id,
        ag.agent_name,
        ag.email,
        ag.password,
        ag.dob,
        ag.phone,
        ag.whatsapp_no,
        ag.organisation,
        ag.aadhar_number,
        ag.pan_number,
        ag.bank_name,
        ag.account_no,
        ag.account_name,
        ag.ifsc_code,
      ]);
      return data[0][0];
    } catch (error) {
      this.logger.error('Error adding agent:', error);
      return { ok: false, msg: 'An error occurred while adding the agent' };
    }
  }

  async getAll() {
    try {
      const data = await this.db.execute('CALL sp_agent_getall()', []);
      let agents = data[0] || [];
      agents = agents.map((agent: any) => {
        if (agent.dob) {
          const date = new Date(agent.dob);
          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, '0');
          const dd = String(date.getDate()).padStart(2, '0');
          agent.dob = `${yyyy}-${mm}-${dd}`;
        }
        return agent;
      });
      return agents;
    } catch (error) {
      this.logger.error('Error getting agents:', error);
      return [];
    }
  }
}
