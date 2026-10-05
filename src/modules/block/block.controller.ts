import { Controller, Post, Body } from '@nestjs/common';
import { BlockService } from './block.service';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post('add')
  async addBlock(@Body() body: any) {
    return this.blockService.addBlock(body);
  }

  @Post('getall')
  async getAll() {
    return this.blockService.getAll();
  }
}
