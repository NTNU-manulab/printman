import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets"
import { PrinterGridModel, PrinterStateModel } from "models"
import { from, Observable, ObservableInput, Subscriber } from "rxjs"
import { map } from "rxjs/operators"
import { Server } from "socket.io"
import generateMockPrinter from "src/mock/printerMock"
import { PrinterService } from "src/printer/printer.service"


@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class WebsocketGateway {
  
  constructor(private readonly printerService: PrinterService) {
    
  }

  @WebSocketServer()
  server: Server

  @SubscribeMessage("printers")
  printers(@MessageBody() data: any) {
    return from(this.printerService.getPrinterStateObservable()).pipe(
      map(item => ({ event: "printers", data: item })),
    )
  }

  printersArray: PrinterGridModel[] = []

  emitLoop = () => {
    this.printersArray = generateMockPrinter(30)
    const obs = new Observable(subscriber => {
      setInterval(() => {
        this.printersArray
          .filter(p => p.printerState.flags.printing)
          .map(p => {
            if (p.progress.completion === 100) {
              p.progress.completion = 0
              p.progress.printTimeLeft = p.progress.printTimeTotal
            } else {
              p.progress.completion = Math.min(
                p.progress.completion + Math.random() * 0.5,
                100,
              )
              p.progress.printTime =
                p.progress.printTimeTotal * (p.progress.completion / 100)

              p.progress.printTimeLeft =
                p.progress.printTimeTotal - p.progress.printTime
            }
          })
        subscriber.next(this.printersArray)
      }, 1000)
    })

    return obs
  }
}
