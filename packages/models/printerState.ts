// a[
//   {
//     current: {
namespace printer {
  interface response {
    currentZ?: number
    state: state
    job: job
    progress: progress
    resends: resends
    serverTime: number
    temps: temperature[]
    logs: string[]
    messages: string[]
    busyfiles: string[]
  } 
  interface state {
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

  interface job {
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
  interface progress {
    completion?: string
    filepos?: string
    printTime?: string
    printTimeLeft?: string
    printTimeLeftOrigin?: string
  }
  interface offsets {}
  interface resends {
    count: number
    transmitted: number
    ratio: number
  }
  interface temperature {
    time: number
    tool0: { actual: number; target: number }
    bed: { actual: number; target: number }
    chamber: { actual?: number; target?: number }
  }
}

[{
  current: {
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
  }
}]