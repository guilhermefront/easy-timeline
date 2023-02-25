import { EventsService } from './events.service';
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { Events } from '@prisma/client';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('/create-empty')
  createEmptyEvent(@Body('timelineId') timelineId: Events['timeline_id']) {
    return this.eventsService.createEmptyEvent(timelineId);
  }

  @Post('/create')
  createEvent(@Body() event: Events) {
    return this.eventsService.createEvent(event);
  }

  @Patch('')
  editEvent(@Body() event: Events) {
    return this.eventsService.editEvent(event);
  }
}
