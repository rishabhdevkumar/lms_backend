import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.cityService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.cityService.getAll();
  }

  @Post('update')
  async update(@Body() body: any) {
    return this.cityService.update(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.cityService.delete(id);
  }
}
