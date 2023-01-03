import { DatabaseService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimelinesModule } from './timelines/timelines.module';

@Module({
  imports: [TimelinesModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
