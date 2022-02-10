import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import * as fs from "fs"
import { PrinterGridModel } from "models"
import generateMockPrinter from "src/mock/printerMock"
@Injectable()
export class PrinterService {
  constructor(private httpService: HttpService) {}

  // const

  getPrinters(): PrinterGridModel[] {
    return generateMockPrinter(30)
    // const json = JSON.stringify(printers)
    // console.log(json)
  }

  getPrinter(): PrinterGridModel[] {
    // console.log(printer)
    return generateMockPrinter(1)
  }

  async getPrinterSnapshot(): Promise<string | Buffer> {
    const writer: fs.WriteStream = fs.createWriteStream("./snapshot.jpg")

    const response = await this.httpService.axiosRef({
      url: "http://192.168.1.62/webcam/?action=snapshot",
      method: "GET",
      responseType: "stream",
      headers: { "x-api-key": "8BDEEEFF95F346C2AA26B39E03EDE513" },
    })

    response.data.pipe(writer)

    return new Promise<string | Buffer>((res, rej) => {
      writer.on("finish", res)
      writer.on("error", rej)
    }).then(() => writer.path)

  }
}
