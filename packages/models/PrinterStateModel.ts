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


const status = {
  "current": {
    "state": {
      "text": "Operational",
      "flags": {
        "operational": true,
        "printing": false,
        "cancelling": false,
        "pausing": false,
        "resuming": false,
        "finishing": false,
        "closedOrError": false,
        "error": false,
        "paused": false,
        "ready": true,
        "sdReady": true
      },
      "error": ""
    },
    "job": {
      "file": {
        "name": "1655471926486-KE_0.3mm_PLA_MK3S_3h35m.gcode",
        "path": "1655471926486-KE_0.3mm_PLA_MK3S_3h35m.gcode",
        "display": "1655471926486-KE_0.3mm_PLA_MK3S_3h35m.gcode",
        "origin": "local",
        "size": 1183897,
        "date": 1655471926
      },
      "estimatedPrintTime": 11227.967147776582,
      "averagePrintTime": 633.703439164994,
      "lastPrintTime": 633.703439164994,
      "filament": {
        "tool0": {
          "length": 29235.6176400018,
          "volume": 70.31990122575783
        }
      },
      "user": "proto"
    },
    "currentZ": 69.0,
    "progress": {
      "completion": 100.0,
      "filepos": 1183897,
      "printTime": 634,
      "printTimeLeft": 0,
      "printTimeLeftOrigin": null
    },
    "offsets": {},
    "resends": {
      "count": 6,
      "transmitted": 85559,
      "ratio": 0
    },
    "serverTime": 1655730046.513443,
    "temps": [],
    "logs": ["Recv: wait"],
    "messages": [],
    "busyFiles": [],
    "markings": [
      {
        "type": "print",
        "time": 1655471926.5619695
      },
      {
        "type": "done",
        "time": 1655472560.261878
      }]
  }
}