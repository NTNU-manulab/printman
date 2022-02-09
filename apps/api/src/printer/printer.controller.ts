import {
  Body, Controller,
  Get, Post, StreamableFile
} from "@nestjs/common"
import { createReadStream } from "fs"
import { PrinterGridModel } from "models"
import { PrinterService } from "./printer.service"

@Controller("printer")
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @Get()
  getPrinters(): PrinterGridModel[] {
    return this.printerService.getPrinters()
  }

  @Get("snapshot")
  async getSnapshot() {
    let path: string | Buffer = await this.printerService.getPrinterSnapshot()
    console.log(path)
    const file = createReadStream(path)

    let stream = new StreamableFile(file)
    // console.log(stream)
    return stream
  }

  @Post()
  postJob(@Body() job): void {
    console.log(job);
  }
}
