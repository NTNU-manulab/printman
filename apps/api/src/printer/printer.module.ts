import { Module } from "@nestjs/common"
import { PrinterService } from "./printer.service"
import { PrinterController } from "./printer.controller"
@Module({
  imports: [],
  controllers: [PrinterController],
  providers: [PrinterService],
})
export class PrinterModule {}
