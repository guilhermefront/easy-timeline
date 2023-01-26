import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Patch()
  patchTimeline(@Body() timeline: Timelines) {
    return this.timelinesService.upsertTimeline(timeline);
  }
}
