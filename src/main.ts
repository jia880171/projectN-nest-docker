import { TransformInterceptor } from './transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = 3000;
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  
  // do not enable Cors in production stage
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(port);
  logger.log(`app listening on port ${port}`);
  logger.log(`env test, env: ${process.env.myEnvV}`);
  // $myEnvV=gg npm run start:debug

  logger.log(`run in ${process.env.STAGE} mode`);
}
bootstrap();
