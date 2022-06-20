import { Controller, Get, StreamableFile} from "@nestjs/common"
import { createReadStream } from "fs"
import { AppService } from "./app.service"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get("dropanim") 
  async getDropAnim() {
    // let path: string | Buffer = await this.appService.getFileDropGraphic()
    // // console.log(path)
    // const file = createReadStream(path)

    // let stream = new StreamableFile(file)
    // // console.log(stream)
    // return stream
    return new StreamableFile(createReadStream(await this.appService.getFileDropGraphic()))
  }

  // @Get("printers")
  // getPrinters(): string {
  //   return this.appService.getPrinters()
  // }
}
