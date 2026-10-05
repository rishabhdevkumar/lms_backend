import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ModuleService } from './module.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.moduleService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.moduleService.getAll();
  }

  @Post('update')
  async update(@Body() body: any) {
    return this.moduleService.update(body);
  }

  @Post('search')
  async search(@Body() body: any) {
    return this.moduleService.search(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.moduleService.delete(id);
  }
}
