import { PrinterGridModel } from "models"
import { v4 } from "uuid"

const mocker = require("json-mocker")

const generateMockPrinter = (printerCount: number): PrinterGridModel[] => {
  // printerState
  mocker.provider.add({
    type: "printerState",
    data: [
      {
        text: "Printing",
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
        text: "Error",
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
        text: "Paused",
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
        text: "Ready",
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
  // progress
  mocker.provider.add({
    type: "progress",
    data: [
      function () {
        const progress = Math.random() * 100
        const totalTime = 10000 + Math.random() * 50000
        const printTime = totalTime * (progress / 100)
        const printTimeLeft = totalTime - printTime
        return {
          progress: {
            completion: progress,
            printTime: printTime,
            printTimeLeft: printTimeLeft,
          },
        }
      },
    ],
  })

  mocker.provider.add({
    type: "name",
    dat: [
      function () {
        return {
          name: "printer"+"index()"
        }
      }
    ]
  })

  // build printer mocks
  let mockPrinters = mocker.build({
    count: printerCount,
    index: 0,
    template: {
      uuid: function () {
        return v4()
      },
      name: "Printer " + "index()",
      progress: function () {
        const progress = Math.random() * 100
        const totalTime = 10000 + Math.random() * 50000
        const printTime = totalTime * (progress / 100)
        const printTimeLeft = totalTime - printTime
        return {
          completion: progress,
          printTime: printTime,
          printTimeLeft: printTimeLeft,
          printTimeTotal: totalTime,
        }
      },
      printerState: "printerState()",
    },
  })

  return mockPrinters
}

export default generateMockPrinter
