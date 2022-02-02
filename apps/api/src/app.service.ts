import { Injectable } from "@nestjs/common"
import { json } from "stream/consumers"

@Injectable()
export class AppService {
  getHello(): string {
    return "Fuck the World!"
  }

  getPrinters(): string {
    let printers = []

    for (let i = 0; i < 30; i++) {
      let randTotalTime = 10000 + Math.random() * 50000

      let printer = {
        name: `Printer ${i}`,
        state: "Printing",
        timeRemaining: randTotalTime - Math.random() * 10000,
        totalTime: randTotalTime,
      }
      printers[i] = printer
    }
    return JSON.stringify(printers)
  }
}
