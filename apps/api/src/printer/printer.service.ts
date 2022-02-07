import { Injectable } from "@nestjs/common"
import { PrinterGridModel } from "models"
import generateMockPrinter from "src/mock/printerMock"
@Injectable()
export class PrinterService {
  getPrinters(): string {
    const printers = generateMockPrinter(30)
    console.log(printers)
    return JSON.stringify(printers)
  }

  getPrinter(): string {
    const printer = generateMockPrinter(30)
    console.log(printer)
    return JSON.stringify(printer)
  }
}
