import { Module } from "@nestjs/common"
import { HttpModule } from "@nestjs/axios"
import { TypeOrmModule } from '@nestjs/typeorm'
import { PrinterService } from "./printer.service"
import { PrinterController } from "./printer.controller"
import {Printer} from "./printer.entity"
@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Printer])],
  controllers: [PrinterController],
  providers: [PrinterService],
})
export class PrinterModule {}
