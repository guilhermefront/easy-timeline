import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DatabaseService } from './prisma/prisma.service';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// Monkey patch big int (not discouraged for this case). See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json
BigInt.prototype.toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  const prismaService = app.get(DatabaseService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(5000);
}
bootstrap();
