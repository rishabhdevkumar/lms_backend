import { Controller, Post, Body } from '@nestjs/common';
import { AgentService } from './agent.service';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('add')
  async addAgent(@Body() body: any) {
    return this.agentService.addAgent(body);
  }

  @Post('getall')
  async getAll() {
    return this.agentService.getAll();
  }
}
