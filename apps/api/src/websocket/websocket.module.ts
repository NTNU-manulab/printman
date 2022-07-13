import { HttpModule } from "@nestjs/axios"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Printer } from "src/printer/printer.entity"
import { PrinterService } from "src/printer/printer.service"
import { TypeORMError } from "typeorm"
import { WebsocketGateway } from "./websocket.gateway"
@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Printer])],
  providers: [WebsocketGateway, PrinterService],
})
export class WebsocketModule {}
