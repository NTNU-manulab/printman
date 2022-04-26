import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets"
import { PrinterGridModel } from "models"
import { Printer } from "models"
import { from, Observable, ObservableInput, Subscriber } from "rxjs"
import { map } from "rxjs/operators"
import { Server } from "socket.io"
import generateMockPrinter from "src/mock/printerMock"

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage("events")
  findAll(@MessageBody() data: any): Observable<WsResponse<Printer.Response>> {
    return from([
      {
        state: {
          text: "Operational",
          flags: {
            operational: true,
            printing: false,
            cancelling: false,
            pausing: false,
            resuming: false,
            finishing: false,
            closedOrError: false,
            error: false,
            paused: false,
            ready: true,
            sdReady: false,
          },
          error: "",
        },
        job: {
          file: {
            name: "3DConnexion_Wireless_Spacemouse_Handrest_MK2_v6_0.1mm_PLA_MK3S_10h28m.gcode",
            path: "3DConnexion_Wireless_Spacemouse_Handrest_MK2_v6_0.1mm_PLA_MK3S_10h28m.gcode",
            display:
              "3DConnexion_Wireless_Spacemouse_Handrest_MK2_v6_0.1mm_PLA_MK3S_10h28m.gcode",
            origin: "local",
            size: 21728945,
            date: 1639678879,
          },
          estimatedPrintTime: 28548.6793776905,
          averagePrintTime: 37090.81515756399,
          lastPrintTime: 37090.81515756399,
          filament: {
            tool0: { length: 32612.485199999566, volume: 78.4422195634625 },
          },
          user: "operator",
        },
        progress: {
          completion: null,
          filepos: null,
          printTime: null,
          printTimeLeft: null,
          printTimeLeftOrigin: null,
        },
        offsets: {},
        resends: { count: 0, transmitted: 55, ratio: 0 },
        serverTime: 1643193322.6770403,
        temps: [
          {
            time: 1643193322,
            tool0: { actual: 22.8, target: 0.0 },
            bed: { actual: 23.5, target: 0.0 },
            chamber: { actual: null, target: null },
          },
        ],
        logs: [
          "Recv: T:22.8 /0.0 B:23.5 /0.0 T0:22.8 /0.0 @:0 B@:0 P:22.9 A:31.0",
        ],
        messages: ["T:22.8 /0.0 B:23.5 /0.0 T0:22.8 /0.0 @:0 B@:0 P:22.9 A:31.0"],
        busyfiles: [],
    }]).pipe(map(item => ({ event: "events", data: item })))
  }

  @SubscribeMessage("identity")
  async identity(@MessageBody() data: number): Promise<number> {
    return data
  }

  @SubscribeMessage("printers")
  printers(@MessageBody() data: any) {
    return from(this.emitLoop()).pipe(
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
