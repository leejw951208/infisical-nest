import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { generateInfisicalClient } from './config/infisical-config';
import { join } from 'path';
import { writeFileSync } from 'fs';

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

  @Get('/download/:projectId/:env')
  async download(
    @Param('projectId') projectId: string,
    @Param('env') env: string,
  ): Promise<string> {
    const client = await generateInfisicalClient();
    const secrets = await client.listSecrets({
      environment: env,
      projectId: projectId,
      includeImports: false,
    });

    const content = secrets
      .map((secret) => `${secret.secretKey}=${secret.secretValue}`)
      .join('\n');

    const filePath = join(__dirname, '..', `.env.${env}`);
    writeFileSync(filePath, content);

    return filePath;
  }
}
