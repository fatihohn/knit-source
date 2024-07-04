// src/app.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ValidatorModule } from './validator/validator.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    ValidatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
