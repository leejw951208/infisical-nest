import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:key')
  async getHello(@Param('key') key: string): Promise<string> {
    return await this.appService.getValue(key);
  }

  @Post('/create')
  async create(
    @Body() req: { key: string; value: string; env?: string },
  ): Promise<string> {
    return await this.appService.createValue(req);
  }

  @Put('/update')
  async update(
    @Body() req: { key: string; value: string; env?: string },
  ): Promise<string> {
    return await this.appService.updateValue(req);
  }
}
