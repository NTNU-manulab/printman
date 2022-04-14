// a[
//   {
//     current: {
export namespace Printer {
  export interface Response {
    currentZ?: number
    state: State
    job: Job
    progress: Progress
    resends: Resends
    serverTime: number
    temps: Temperature[]
    logs: string[]
    messages: string[]
    busyfiles: string[]
  } 
  interface State {
    text: string
    error: string
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

  interface Job {
    file: {
      name: string
      path: string
      display: string
      origin: string
      size: number
      date: number
    }
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
  interface Progress {
    completion?: string
    filepos?: string
    printTime?: string
    printTimeLeft?: string
    printTimeLeftOrigin?: string
  }
  interface Offsets {}
  interface Resends {
    count: number
    transmitted: number
    ratio: number
  }
  interface Temperature {
    time: number
    tool0: { actual: number; target: number }
    bed: { actual: number; target: number }
    chamber: { actual?: number; target?: number }
  }
}

[{
    currentZ: null,
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
    busyFiles: [],
}];

[
  {
    currentZ: 0,
    state: {
      text: "Printing",
      error: "No error",
      flags: {
        operational: true,
        printing: true,
        cancelling: false,
        pausing: false,
        resuming: false,
        finishing: false,
        closedOrError: false,
        error: false,
        paused: false,
        ready: false,
        sdReady: false,
      },
    },
    job: {
      file: {
        name: "some_print.stl",
        path: "path",
        display: "display",
        origin: "origin",
        size: 14271234,
        date: 98412372813,
      },
      estimatedPrintTime: 61274612847,
      averagePrintTime: 128372,
      lastPrintTime: 12476273,
      filament: {
        tool0: {
          length: 184172487,
          volume: 2183,
        }
      },
      user: "simenwii@stud.ntnu.no"
    },
    progress: {
      completion: "completion",
      filepos: "filepos",
      printTime: "printTime",
      printTimeLeft: "printTimeLeft",
      printTimeLeftOrigin: "printTimeLeftOrigin",
    },
    resends: {
      count: 1,
      transmitted: 3,
      ratio: 44,
    },
    serverTime: 12487,
    temps: [
      {
        time: 12381274,
        tool0: { actual: 200, target: 230 },
        bed: { actual: 44, target: 69 },
        chamber: { actual: 123, target: 150 },
      }
    ],
    logs: ["log1", "log2", "log3"],
    messages: ["message1", "message2", "message3"],
    busyfiles: ["busyfile1", "busyfile2"],
  }
]