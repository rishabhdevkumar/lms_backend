import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Add a new admin' })
  @Post('add')
  async addAdmin(@Body() body: any) {
    return this.adminService.addAdmin(body);
  }

  @ApiOperation({ summary: 'Authenticate admin and get JWT token' })
  @Post('authenticate')
  async authenticate(@Body() body: any) {
    return this.adminService.authenticate(body);
  }

  @ApiOperation({ summary: 'Get all admins' })
  @Post('getall')
  async getAll() {
    return this.adminService.getAll();
  }
}
