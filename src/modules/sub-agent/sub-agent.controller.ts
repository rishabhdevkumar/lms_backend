import { Controller, Post, Body } from '@nestjs/common';
import { SubAgentService } from './sub-agent.service';

@Controller('sub_agent')
export class SubAgentController {
  constructor(private readonly subAgentService: SubAgentService) {}

  @Post('add')
  async addSubAgent(@Body() body: any) {
    return this.subAgentService.addSubAgent(body);
  }

  @Post('getall')
  async getAll() {
    return this.subAgentService.getAll();
  }
}
