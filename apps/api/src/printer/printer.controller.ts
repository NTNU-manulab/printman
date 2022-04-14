import {
  Controller,
  Get,
  Post,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common"
import { AnyFilesInterceptor } from "@nestjs/platform-express"
import { createReadStream, fstat } from "fs"
import { PrinterGridModel } from "models"
import { PrinterService } from "./printer.service"
import * as fs from "fs"
import * as fsA from "fs/promises"

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

  @Post("uploadFile")
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    files.forEach(f => {
      fsA.writeFile(`./${f.originalname}-${Date.now()}`, f.buffer.toString())
    })
  }
}
