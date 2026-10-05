import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { StateService } from './state.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.stateService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.stateService.getAll();
  }

  @Post('search')
  async search(@Body() body: any) {
    return this.stateService.search(body);
  }

  @Post('update')
  async update(@Body() body: any) {
    return this.stateService.update(body);
  }

  @Post('delete')
  async deleteBody(@Body() body: any) {
    return this.stateService.delete(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async deleteParam(@Param('id') id: string) {
    return this.stateService.delete(id);
  }
}
