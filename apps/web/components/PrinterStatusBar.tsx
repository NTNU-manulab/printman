import { Box, Card, CardContent, Typography } from "@mui/material"
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
    <Card sx={{ display: "flex", alignItems: "center"}}>

      <CardContent sx={{ display: "flex", gap: 5}}>
        <div style={{ display: "flex", gap: 5 }}>
          <span style={{color: "#999"}}>Printers</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8}}>
          <span>{printerStates.ready} ready</span>
          <div style={{borderRadius: 90, width: 6, height: 6, backgroundColor: "#2FBF71"}}/>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>{printerStates.printing} printing</span>
          <div style={{borderRadius: 90, width: 6, height: 6, backgroundColor: "#456990"}}/>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>{printerStates.paused} paused</span>
          <div style={{borderRadius: 90, width: 6, height: 6, backgroundColor: "#F3A712"}}/>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>{printerStates.error} error</span>
          <div style={{borderRadius: 90, width: 6, height: 6, backgroundColor: "#8F250C"}}/>
          </div>
      </CardContent>
    </Card>
  )
}

export default PrinterStatusBar
