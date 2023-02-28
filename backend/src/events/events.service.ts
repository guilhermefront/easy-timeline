import { Injectable } from '@nestjs/common';
import { Events } from '@prisma/client';
import { DatabaseService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly db: DatabaseService) {}

  createEmptyEvent(timelineId: string) {
    return this.db.events.create({
      data: {
        content: 'New event content',
        title: 'New event title',
        year: String(new Date().getFullYear()),
        Timelines: {
          connect: {
            timeline_id: timelineId,
          },
        },
      },
    });
  }

  createEvent(event: Events) {
    return this.db.events.create({
      data: event,
    });
  }

  editEvent(event: Events) {
    return this.db.events.update({
      data: event,
      where: {
        event_id: event.event_id,
      },
    });
  }

  async deleteEvent(eventId: string) {
    return this.db.events.delete({
      where: {
        event_id: eventId,
      },
    });
  }
}
