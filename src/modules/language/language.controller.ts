import { Controller, Post } from '@nestjs/common';
import { LanguageService } from './language.service';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post('getall')
  async getAll() {
    return this.languageService.getAll();
  }

  @Post('get_active')
  async getActive() {
    return this.languageService.getActive();
  }
}
