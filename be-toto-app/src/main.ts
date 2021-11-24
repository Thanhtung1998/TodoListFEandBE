import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: "*",
      methods: "GET,HEAD,POST,PUT,DELETE,PATCH",
      allowedHeaders: "Content-Type, Accept",
      credentials: true,
    }
  );

  const PORT = process.env.PORT || 9000

  await app.listen(PORT, () => {
    console.log("Listen Port :", PORT)
  });
}
bootstrap();
