interface PrinterGridModel {
  uuid: string
  name: string
  printerState: {
    text: string
    flags: {
      cancelling: boolean
      error: boolean
      operational: boolean
      paused: boolean
      pausing: boolean
      printing: boolean
      ready: boolean
    }
  }
  printProgress: number
  totalTime: number
}

export default PrinterGridModel
