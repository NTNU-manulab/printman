import { Box, Card, CardContent } from "@mui/material"
import React from "react"

const PrinterStatusBar = ({
  printerStates,
}: {
  printerStates: {
    ready: number
    printing: number
    error: number
    paused: number
  }
}) => {
  return (
    <Card sx={{ display: "flex", width: 1 }}>
      <CardContent>Printers:</CardContent>
      <CardContent>{printerStates.ready} ready</CardContent>
      <CardContent>{printerStates.printing} printing</CardContent>
      <CardContent>{printerStates.paused} paused</CardContent>
      <CardContent>{printerStates.error} error</CardContent>
    </Card>
  )
}

export default PrinterStatusBar
