import { Controller, Get, Post, Put, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import {
  AddUserDto,
  AdminAddUserDto,
  AuthenticateUserDto,
  UpdateUserDto,
  ChangeUserStatusDto,
  ToggleUserStatusDto,
  UserResponseDto,
  UserAuthTokenResponseDto,
  UpdatePasswordSelfDto,
} from './dto/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Add a new user (Self-registration or full registration if roll_no provided)' })
  @ApiBody({ type: AddUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserResponseDto })
  @Post(['', 'add'])
  async add(@Body() body: AddUserDto) {
    return this.usersService.add(body);
  }

  @ApiOperation({ summary: 'Admin add new user with complete academic & profile details' })
  @ApiBody({ type: AdminAddUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully by admin', type: UserResponseDto })
  @Post(['admin_add', 'admin/add'])
  async adminAdd(@Body() body: AdminAddUserDto) {
    return this.usersService.adminAdd(body);
  }

  @ApiOperation({ summary: 'Authenticate user and return JWT token' })
  @ApiBody({ type: AuthenticateUserDto })
  @ApiResponse({ status: 200, description: 'Authentication successful', type: UserAuthTokenResponseDto })
  @Post('authenticate')
  async authenticate(@Body() body: AuthenticateUserDto) {
    return this.usersService.authenticate(body);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users', type: [UserResponseDto] })
  @Get(['', 'getall'])
  @Post('getall')
  async getAll() {
    return this.usersService.getAll();
  }

  @ApiOperation({ summary: 'Update existing user profile and academic details' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @Put()
  async updateRoot(@Body() body: UpdateUserDto) {
    return this.usersService.update(body);
  }

  @ApiOperation({ summary: 'Update existing user profile and academic details' })
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'id', required: false, description: 'User ID (optional if specified in body)' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @Post('update')
  @Put('update')
  @Put(':id')
  async update(@Body() body: UpdateUserDto, @Param('id') paramId?: string) {
    if (paramId && !body.id) {
      body.id = paramId;
    }
    return this.usersService.update(body);
  }

  @ApiOperation({ summary: 'Toggle user active status (1 = Active, 0 = Locked / Deactive)' })
  @ApiBody({ type: ChangeUserStatusDto })
  @ApiParam({ name: 'id', required: false, description: 'User ID (optional if specified in body)' })
  @ApiResponse({ status: 200, description: 'User status updated successfully' })
  @Post(['status', 'change_status', 'toggle_status', 'status/:id', 'toggle_status/:id'])
  @Put(['status', 'change_status', 'toggle_status', 'status/:id', 'toggle_status/:id'])
  @Patch(['status', 'change_status', 'toggle_status', 'status/:id', 'toggle_status/:id'])
  async changeStatus(@Body() body: ChangeUserStatusDto, @Param('id') paramId?: string) {
    if (paramId && !body.id && !body.user_id) {
      body.id = paramId;
    }
    return this.usersService.toggleStatus(body);
  }

  @ApiOperation({ summary: 'Get user details by ID' })
  @ApiParam({ name: 'id', description: 'User ID', example: '1' })
  @ApiResponse({ status: 200, description: 'User details', type: UserResponseDto })
  @Get(['details/:id', ':id'])
  @Post('details/:id')
  async details(@Param('id') id: string) {
    return this.usersService.details(id);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get logged in user profile' })
  @ApiResponse({ status: 200, description: 'Current authenticated user profile', type: UserResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get('get_self')
  @Post('get_self')
  async getSelf(@CurrentUser() user: any) {
    return this.usersService.getSelf(user?.id);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update password for authenticated user' })
  @ApiBody({ type: UpdatePasswordSelfDto })
  @ApiResponse({ status: 200, description: 'Password update result' })
  @UseGuards(JwtAuthGuard)
  @Post(['update_password_self', 'change_password_self'])
  @Put(['update_password_self', 'change_password_self'])
  async updatePasswordSelf(
    @CurrentUser() user: any,
    @Body() body: UpdatePasswordSelfDto,
  ) {
    const uid = user?.id || body?.id || body?.uid;
    return this.usersService.updatePasswordSelf(uid, body.password);
  }
}
