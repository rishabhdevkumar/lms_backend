import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ModuleTablesService } from './module-tables.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('module_tables')
export class ModuleTablesController {
  constructor(private readonly moduleTablesService: ModuleTablesService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.moduleTablesService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.moduleTablesService.getAll();
  }

  @Post('update')
  async update(@Body() body: any) {
    return this.moduleTablesService.update(body);
  }

  @Post('search')
  async search(@Body() body: any) {
    return this.moduleTablesService.search(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.moduleTablesService.delete(id);
  }
}
