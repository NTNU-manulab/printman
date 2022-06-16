import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import axios from "axios"
import * as fs from "fs"
import { PrinterGridModel, PrinterInstance } from "models"
import generateMockPrinter from "src/mock/printerMock"
import PrinterInstances from "./PrinterInstances"
@Injectable()
export class PrinterService {
  
  constructor(private httpService: HttpService) {}


  Printers: PrinterInstance[] = PrinterInstances

  getPrinters(): PrinterGridModel[] {
    return generateMockPrinter(30)
    // const json = JSON.stringify(printers)
    // console.log(json)
  }

  getPrinter(): PrinterGridModel[] {
    // console.log(printer)
    return generateMockPrinter(1)
  }

  async getFiles(printerId: number): Promise<any> {
    // This axios GET request works to get file listing from OP, and the controller endpoint that uses it also returns the information correctly.
    if (this.Printers[printerId]) {
    return await axios.get(
      'http://'+this.Printers[printerId].ip+':'+this.Printers[printerId].port+'/api/files', 
      {
        headers: {
          'Authorization': 'Bearer ' + this.Printers[printerId].key
        }
      } 
      )
      .then( (res) => {
        let resdata =  res.data
        console.log(resdata)
        return resdata
      }
      )
      .catch( (err) => {
        console.log(err)
        return err.data
      } )
    }
  }

  async getPrinterSnapshot(): Promise<string | Buffer> {
    // const writer: fs.WriteStream = fs.createWriteStream("./snapshot.jpg")

    // const response = await this.httpService.axiosRef({
    //   url: "http://192.168.1.62/webcam/?action=snapshot",
    //   method: "GET",
    //   responseType: "stream",
    //   headers: { "x-api-key": "6C2AA26B39E03EDE5138BDEEEFF95F34" },
    // })

    // response.data.pipe(writer)

    // return new Promise<string | Buffer>((res, rej) => {
    //   writer.on("finish", res)
    //   writer.on("error", rej)
    // }).then(() => writer.path)
    return "./snapshot.png"
  }


}
