import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Timelines } from '@prisma/client';
import { TimelinesService } from './timelines.service';

@Controller('timelines')
export class TimelinesController {
  constructor(private readonly timelinesService: TimelinesService) {}

  @Get(':timelineId')
  eventsByTimelineId(@Param('timelineId') timelineId: string) {
    return this.timelinesService.getTimelineById(timelineId);
  }

  @Post('/create')
  createTimeline(@Body() timeline: Timelines) {
    return this.timelinesService.createTimeline(timeline);
  }
}
