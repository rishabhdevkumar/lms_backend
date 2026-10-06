import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { QuickAddStudentDto, AuthenticateStudentDto, StudentResponseDto, AuthTokenResponseDto } from './dto/student.dto';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: 'Quick add student' })
  @ApiBody({ type: QuickAddStudentDto })
  @ApiResponse({ status: 201, description: 'Student created successfully', type: StudentResponseDto })
  @Post('quick_add')
  async quickAdd(@Body() body: QuickAddStudentDto) {
    return this.studentService.quickAdd(body);
  }

  @ApiOperation({ summary: 'Full add student' })
  @Post('add')
  async add(@Body() body: any) {
    return this.studentService.add(body);
  }

  @ApiOperation({ summary: 'Authenticate student and return JWT token' })
  @ApiBody({ type: AuthenticateStudentDto })
  @ApiResponse({ status: 200, description: 'Authentication successful', type: AuthTokenResponseDto })
  @Post('authenticate')
  async authenticate(@Body() body: AuthenticateStudentDto) {
    return this.studentService.authenticate(body);
  }

  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'List of all students', type: [StudentResponseDto] })
  @Post('getall')
  async getAll() {
    return this.studentService.getAll();
  }

  @ApiOperation({ summary: 'Get student details by ID' })
  @ApiParam({ name: 'id', description: 'Student ID', example: '101' })
  @ApiResponse({ status: 200, description: 'Student details', type: StudentResponseDto })
  @Post('details/:id')
  async details(@Param('id') id: string) {
    return this.studentService.details(id);
  }

  @ApiOperation({ summary: 'Update student information' })
  @Post('update')
  async update(@Body() body: any) {
    return this.studentService.update(body);
  }

  @ApiOperation({ summary: 'Search students' })
  @Post('search')
  async search(@Body() body: any) {
    return this.studentService.search(body);
  }

  @ApiOperation({ summary: 'Update student language preference' })
  @Post('update_language')
  async updateLanguage(@Body() body: any) {
    return this.studentService.updateLanguage(body);
  }

  @ApiOperation({ summary: 'Update student email' })
  @Post('update_email')
  async updateEmail(@Body() body: any) {
    return this.studentService.updateEmail(body);
  }

  @ApiOperation({ summary: 'Update student password' })
  @Post('update_password')
  async updatePassword(@Body() body: any) {
    return this.studentService.updatePassword(body);
  }

  @ApiOperation({ summary: 'Get total student count' })
  @Post('count')
  async count() {
    return this.studentService.count();
  }

  @ApiOperation({ summary: 'Get next available student ID' })
  @Post('getnextid')
  async getNextId() {
    return this.studentService.getNextId();
  }

  @ApiOperation({ summary: 'Get next available student roll number' })
  @Post('getnextrollno')
  async getNextRollNo() {
    return this.studentService.getNextRollNo();
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get logged in student profile' })
  @ApiResponse({ status: 200, description: 'Current authenticated student profile', type: StudentResponseDto })
  @UseGuards(JwtAuthGuard)
  @Post('get_self')
  async getSelf(@CurrentUser() user: any) {
    return this.studentService.getSelf(user?.id);
  }
}

