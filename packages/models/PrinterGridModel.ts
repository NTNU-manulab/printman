import { PrinterModule } from "src/printer/printer.module"

type PrinterCardProps = {
  name: string
  state: string
  printProgress: number
  totalTime: number
}

export default PrinterCardProps
