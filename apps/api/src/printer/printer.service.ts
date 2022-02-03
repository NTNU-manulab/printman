import { Injectable } from "@nestjs/common"
import { PrinterGridModel } from "models"

@Injectable()
export class PrinterService {
  getPrinters(): string {
    let printers = []

    for (let i = 0; i < 30; i++) {
      let randTotalTime = 10000 + Math.random() * 50000

      let printer: PrinterGridModel = {
        name: `Printer ${i}`,
        state: "Printing",
        printProgress: Math.random() * 100,
        totalTime: randTotalTime,
      }
      printers[i] = printer
    }
    return JSON.stringify(printers)
  }
}
