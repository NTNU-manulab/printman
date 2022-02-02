import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors() //probably not needed for now..?
  await app.listen(3001)
}
bootstrap()
