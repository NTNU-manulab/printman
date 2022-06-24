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
import { createReadStream } from "fs"
import { PrinterGridModel, PrinterInstance, PrinterStateModel } from "models"
import { PrinterService } from "./printer.service"
import { PrinterConnection } from "./PrinterConnection"
import PrinterInstances from "./PrinterInstances"


@Controller("printer")
export class PrinterController {

  printerConnectors: PrinterConnection[]
  printerInstances: PrinterInstance[]
  printerStates: PrinterStateModel[]

  constructor(private readonly printerService: PrinterService) {
    
  }

  @Get()
  getPrinters(): PrinterStateModel[] {
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
    
    return this.printerService.postFileToPrinter(files)
    
    // files.forEach(f => {
    //   fsA.writeFile(`./${Date.now()}-${f.originalname}`, f.buffer)
    // })
  }
}
