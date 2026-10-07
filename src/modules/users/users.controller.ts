import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AddUserDto, AuthenticateUserDto, UpdateUserDto, UserResponseDto, UserAuthTokenResponseDto } from './dto/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Add a new user' })
  @ApiBody({ type: AddUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserResponseDto })
  @Post(['', 'add'])
  async add(@Body() body: AddUserDto) {
    return this.usersService.add(body);
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

  @ApiOperation({ summary: 'Update existing user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @Put()
  async updateRoot(@Body() body: UpdateUserDto) {
    return this.usersService.update(body);
  }

  @ApiOperation({ summary: 'Update existing user' })
  @ApiBody({ type: UpdateUserDto })
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
}
