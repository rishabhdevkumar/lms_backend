import { Module } from '@nestjs/common';
import { DestrictController } from './destrict.controller';
import { DestrictService } from './destrict.service';

@Module({
  controllers: [DestrictController],
  providers: [DestrictService],
  exports: [DestrictService],
})
export class DestrictModule {}
