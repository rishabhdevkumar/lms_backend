import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FacultyService } from './faculty.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Faculty')
@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @ApiOperation({ summary: 'Add a new faculty member' })
  @Post('add')
  async add(@Body() body: any) {
    return this.facultyService.add(body);
  }

  @ApiOperation({ summary: 'Get all faculty members' })
  @Post('getall')
  async getAll() {
    return this.facultyService.getAll();
  }

  @ApiOperation({ summary: 'Search faculty members' })
  @Post('search')
  async search(@Body() body: any) {
    return this.facultyService.search(body);
  }

  @ApiOperation({ summary: 'Update faculty details' })
  @Post('update')
  async update(@Body() body: any) {
    return this.facultyService.update(body);
  }

  @ApiOperation({ summary: 'Authenticate faculty member' })
  @Post('authenticate')
  async authenticate(@Body() body: any) {
    return this.facultyService.authenticate(body);
  }

  @ApiOperation({ summary: 'Get total faculty count' })
  @Post('count')
  async count() {
    return this.facultyService.count();
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get logged in faculty profile' })
  @UseGuards(JwtAuthGuard)
  @Post('get_self')
  async getSelf(@CurrentUser() user: any) {
    return this.facultyService.getSelf(user?.id);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete faculty member by ID' })
  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.facultyService.delete(id);
  }
}
