import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.sessionService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.sessionService.getAll();
  }

  @Post('update')
  async update(@Body() body: any) {
    return this.sessionService.update(body);
  }

  @Post('search')
  async search(@Body() body: any) {
    return this.sessionService.search(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.sessionService.delete(id);
  }
}
