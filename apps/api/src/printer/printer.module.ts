import { Module } from "@nestjs/common"
import { HttpModule } from "@nestjs/axios"
import { PrinterService } from "./printer.service"
import { PrinterController } from "./printer.controller"
@Module({
  imports: [HttpModule],
  controllers: [PrinterController],
  providers: [PrinterService],
})
export class PrinterModule {}
