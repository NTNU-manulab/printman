import { Injectable } from "@nestjs/common"
import { json } from "stream/consumers"

@Injectable()
export class PrinterService {
  getPrinters(): string {
    let printers = []

    for (let i = 0; i < 30; i++) {
      let randTotalTime = 1000 + Math.random() * 5000

      let printer = {
        name: `Printer ${i}`,
        state: "Printing",
        timeRemaining: randTotalTime - Math.random() * 1000,
        totalTime: randTotalTime,
      }
      printers[i] = printer
    }
    return JSON.stringify(printers)
  }
}
