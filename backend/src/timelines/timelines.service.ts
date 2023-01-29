import { Injectable } from '@nestjs/common';
import { Timelines } from '@prisma/client';
import { DatabaseService } from 'src/prisma/prisma.service';

@Injectable()
export class TimelinesService {
  constructor(private readonly db: DatabaseService) {}

  createTimeline(timeline: Omit<Timelines, 'timeline_id'>) {
    return this.db.timelines.create({
      data: timeline,
    });
  }

  getTimelineById(timelineId: string) {
    return this.db.timelines.findUnique({
      where: { timeline_id: Number(timelineId) },
      select: {
        title: true,
        Events: true,
      },
    });
  }

  upsertTimeline(timeline: Timelines) {
    return this.db.timelines.upsert({
      where: { timeline_id: +JSON.stringify(timeline.timeline_id) },
      update: timeline,
      create: timeline,
    });
  }

  deleteTimeline(timelineId: string) {
    return this.db.timelines.delete({
      where: {
        timeline_id: Number(timelineId),
      },
    });
  }
}
