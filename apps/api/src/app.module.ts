import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { PrinterController } from "./printer.controller"
import { PrinterService } from "./printer.service"

@Module({
  imports: [],
  controllers: [AppController, PrinterController],
  providers: [AppService, PrinterService],
})
export class AppModule {}
