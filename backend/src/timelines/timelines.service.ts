import { Injectable } from '@nestjs/common';
import { Timelines } from '@prisma/client';
import { DatabaseService } from 'src/prisma/prisma.service';

@Injectable()
export class TimelinesService {
  constructor(private readonly db: DatabaseService) {}

  createEmptyTimeline(userId: string) {
    return this.db.timelines.create({
      data: {
        title: 'New timeline',
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  createTimeline(timeline: Omit<Timelines, 'timeline_id'>) {
    return this.db.timelines.create({
      data: timeline,
    });
  }

  getTimelineById(timelineId: string) {
    return this.db.timelines.findUnique({
      where: { timeline_id: timelineId },
    });
  }

  updateTimeline(timeline: Timelines) {
    return this.db.timelines.update({
      where: { timeline_id: timeline.timeline_id },
      data: timeline,
    });
  }

  deleteTimeline(timelineId: string) {
    return this.db.timelines.delete({
      where: {
        timeline_id: timelineId,
      },
    });
  }
}
