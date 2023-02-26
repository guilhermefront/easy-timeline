import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}
  findOne(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }
  async findUserTimelines(id: string) {
    const { Timelines } = await this.db.user.findUnique({
      where: { id },
      select: {
        Timelines: {
          include: {
            Events: true,
          },
        },
      },
    });

    return [...Timelines];
  }
}
