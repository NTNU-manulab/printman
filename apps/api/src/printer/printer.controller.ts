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
import { PrinterGridModel, PrinterInstance } from "models"
import { PrinterService } from "./printer.service"
import { PrinterConnection } from "src/websocket/PrinterConnection"
import PrinterInstances from "./PrinterInstances"


@Controller("printer")
export class PrinterController {

  printerConnectors: PrinterConnection[]
  printerInstances: PrinterInstance[]

  constructor(private readonly printerService: PrinterService) {

    this.printerInstances = PrinterInstances
    
    this.printerConnectors = [] 

    this.printerInstances.forEach(p => {
      this.printerConnectors.push(new PrinterConnection(p))
    })
  }

  @Get()
  getPrinters(): PrinterGridModel[] {
    return this.printerService.getPrinters()
  }

  @Get("snapshot")
  async getSnapshot() {
    let path: string | Buffer = await this.printerService.getPrinterSnapshot()
    // console.log(path)
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
