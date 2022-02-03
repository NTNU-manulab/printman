import { Controller, Get } from "@nestjs/common"
import { PrinterService } from "./printer.service"

@Controller("printer")
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @Get()
  getPrinters(): string {
    return this.printerService.getPrinters()
  }
}