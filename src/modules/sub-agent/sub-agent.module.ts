import { Module } from '@nestjs/common';
import { SubAgentController } from './sub-agent.controller';
import { SubAgentService } from './sub-agent.service';

@Module({
  controllers: [SubAgentController],
  providers: [SubAgentService],
  exports: [SubAgentService],
})
export class SubAgentModule {}
