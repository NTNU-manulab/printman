import { Card, CardContent } from '@mui/material'
import React from 'react'

const PrinterColorFilter = () => {
  return (
    <Card sx={{ display: "flex", alignItems: "center"}}>
        <CardContent sx={{ display: "flex", gap: 5}}>
        <div style={{ display: "flex", gap: 5 }}>
          <span style={{color: "#999"}}>Filter by</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Orange</span>
          <div style={{borderRadius: 90, width: 6, height: 6, backgroundColor: "orange"}}/>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Black</span>
          <div style={{borderRadius: 90, width: 6, height: 6, backgroundColor: "black"}}/>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Red</span>
          <div style={{borderRadius: 90, width: 6, height: 6, backgroundColor: "red"}}/>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Gray</span>
          <div style={{borderRadius: 90, width: 6, height: 6, backgroundColor: "gray"}}/>
        </div>
        </CardContent>
    </Card>
  )
}

export default PrinterColorFilter