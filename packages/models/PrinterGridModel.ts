interface PrinterGridModel {
  uuid: string
  name: string
  progress: {
    completion: number
    printTime: number
    printTimeLeft: number
    printTimeTotal: number
  }
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
}

export default PrinterGridModel
