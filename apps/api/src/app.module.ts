import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { MqtTestModule } from "./mqttest/mqttest.module"
import { PrinterModule } from "./printer/printer.module"
import { WebsocketModule } from "./websocket/websocket.module"

@Module({
  imports: [PrinterModule, WebsocketModule, MqtTestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
