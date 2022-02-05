import { PrinterGridModel } from "models"

const mocker = require("json-mocker")

const generateMockPrinter = (printerCount: number): PrinterGridModel[] => {
  mocker.provider.add({
    type: "printerState",
    data: [
      {
        name: "Printing",
        flags: {
          operational: true,
          paused: false,
          printing: true,
          pausing: false,
          cancelling: false,
          error: false,
          ready: false,
        },
      },
      {
        name: "Error",
        flags: {
          operational: true,
          paused: false,
          printing: false,
          pausing: false,
          cancelling: false,
          error: true,
          ready: false,
        },
      },
      {
        name: "Paused",
        flags: {
          operational: true,
          paused: true,
          printing: false,
          pausing: false,
          cancelling: false,
          error: false,
          ready: false,
        },
      },
      {
        name: "Ready",
        flags: {
          operational: true,
          paused: false,
          printing: false,
          pausing: false,
          cancelling: false,
          error: false,
          ready: true,
        },
      },
    ],
  })

  let mockPrinters = mocker.build({
    count: printerCount,
    index: 0,
    template: {
      name: "Printer ",
      printProgress: function () {
        return Math.random() * 100
      },
      totalTime: function () {
        return 10000 + Math.random() * 50000
      },
      printerState: "printerState()",
    },
  })

  return mockPrinters
}

export default generateMockPrinter