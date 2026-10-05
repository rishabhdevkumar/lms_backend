import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { DestrictService } from './destrict.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('destrict')
export class DestrictController {
  constructor(private readonly destrictService: DestrictService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.destrictService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.destrictService.getAll();
  }

  @Post('search')
  async search(@Body() body: any) {
    return this.destrictService.search(body);
  }

  @Post('update')
  async update(@Body() body: any) {
    return this.destrictService.update(body);
  }

  @Post('delete')
  async deleteBody(@Body() body: any) {
    return this.destrictService.delete(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async deleteParam(@Param('id') id: string) {
    return this.destrictService.delete(id);
  }
}
