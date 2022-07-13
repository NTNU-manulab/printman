import * as dotenv from 'dotenv'

dotenv.config()

import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors() //probably not needed for now..?
  await app.listen(3001)
  // console.log(process.env.API_URL)
}
bootstrap()
