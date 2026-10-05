import { Module } from '@nestjs/common';
import { ModuleTablesController } from './module-tables.controller';
import { ModuleTablesService } from './module-tables.service';

@Module({
  controllers: [ModuleTablesController],
  providers: [ModuleTablesService],
  exports: [ModuleTablesService],
})
export class ModuleTablesModule {}
