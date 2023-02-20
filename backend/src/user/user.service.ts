import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}
  findOne(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }
  findUserTimelines(id: string) {
    const { Timelines } = this.db.user.findUnique({
      where: { id },
      select: { Timelines: true },
    });

    return { timelines: Timelines };
  }
}
