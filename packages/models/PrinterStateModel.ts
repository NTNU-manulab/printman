interface PrinterStateModel {
  uuid: string
  name: string
  current?: {
    state?: {
      text: string
      flags: {
        operational: boolean
        printing: boolean
        cancelling: boolean
        pausing: boolean
        resuming: boolean
        finishing: boolean
        closedOrError: boolean
        error: boolean
        paused: boolean
        ready: boolean
        sdReady: boolean
      }
    }
    job?: {
      file: {
        name: string
        path: string
        display: string
        origin: string
        size: number
        date: number
      },
      estimatedPrintTime: number
      averagePrintTime: number
      lastPrintTime: number
      filament: {
        tool0: {
          length: number
          volume: number
        }
      }
      user: string
    }
    currentZ?: number
    progress?: {
      completion: number
      filePos: number
      printTime: number
      printTimeLeft: number
      printTimeTotal: number
      printTimeLeftOrigin: string
    }
    offsets?: {}
    resends?: {
      count: number
      transmitted: number
      ratio: number
    }
    serverTime?: number
    temps: []
    logs: string[]
    messages: string[]
    busyFiles: [
      {
        origin: string
        path: string
      }
    ],
    markings: [
      {
        type: string
        time: number
      }
    ]
  }
}

export default PrinterStateModel