import { Controller, Post, Body } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('add')
  async add(@Body() body: any) {
    return this.roomService.add(body);
  }

  @Post('getall')
  async getAll() {
    return this.roomService.getAll();
  }
}
