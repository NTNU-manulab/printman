import { Body, Controller, Get, Post } from "@nestjs/common"
import { PrinterService } from "./printer.service"

@Controller("printer")
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @Get()
  getPrinters(): string {
    return this.printerService.getPrinters()
  }

  @Post()
  postJob(@Body() job): void {
    console.log(job);
  }
}
