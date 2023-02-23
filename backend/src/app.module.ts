import { DatabaseService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimelinesModule } from './timelines/timelines.module';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [TimelinesModule, UserModule, EventsModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
