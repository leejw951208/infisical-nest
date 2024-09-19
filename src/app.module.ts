import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { loadInfisicalEnviroment } from './infisical/infisical-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadInfisicalEnviroment],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
