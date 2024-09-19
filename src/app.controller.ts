import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getSecretValue();
  }

  @Post('/create')
  async create(@Body() req: { key: string; value: string }): Promise<string> {
    return await this.appService.createSecretValue(req);
  }
}
