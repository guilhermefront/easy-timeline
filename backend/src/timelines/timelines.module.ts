import { Module } from '@nestjs/common';
import { TimelinesService } from './timelines.service';
import { TimelinesController } from './timelines.controller';
import { DatabaseService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TimelinesController],
  providers: [TimelinesService, DatabaseService],
})
export class TimelinesModule {}
