import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CountryService } from './country.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.countryService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.countryService.getAll();
  }

  @Post('update')
  async update(@Body() body: any) {
    return this.countryService.update(body);
  }

  @Post('search')
  async search(@Body() body: any) {
    return this.countryService.search(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.countryService.delete(id);
  }
}
