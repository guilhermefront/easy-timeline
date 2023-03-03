import { EventsService } from './events.service';
import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/prisma/prisma.service';
import { EventsController } from './events.controller';

@Module({
  controllers: [EventsController],
  providers: [EventsService, DatabaseService],
})
export class EventsModule {}
