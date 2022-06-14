import {
  Controller,
  Get,
  Post,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
  Param,
} from "@nestjs/common"
import { AnyFilesInterceptor } from "@nestjs/platform-express"
import { createReadStream, fstat } from "fs"
import { PrinterGridModel } from "models"
import { PrinterService } from "./printer.service"
import * as fs from "fs"
import * as fsA from "fs/promises"
import { ResourceTypes } from "@nestjs/microservices/external/kafka.interface"
import { getParametrizedRoute } from "next/dist/shared/lib/router/utils/route-regex"

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
  
  @Get('files/:id')
  async getPrinterFiles(@Param('id') id: number) {
    return this.printerService.getFiles(id)
  }
// @Param('id') id: number
  @Post("uploadFile")
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    files.forEach(f => {
      fsA.writeFile(`./${Date.now()}-${f.originalname}`, f.buffer)
    })
  }
}
