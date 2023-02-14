import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}
  findOne(id: number) {
    return this.db.user.findUnique({ where: { user_id: id } });
  }
  findUserTimelines(id: number) {
    return this.db.user.findUnique({
      where: { user_id: id },
      select: { Timelines: true },
    });
  }
}
