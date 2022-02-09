import {
  Controller,
  Get,
  HttpCode,
  Redirect,
  Res,
  StreamableFile,
} from "@nestjs/common"
import { get } from "http"
import { PrinterGridModel } from "models"
import { PrinterService } from "./printer.service"
import * as fs from "fs"
import { createReadStream } from "fs"

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
}
