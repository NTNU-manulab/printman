import Button from "@mui/material/Button"
import { Box, Card } from "@mui/material"
import React, { useEffect, useState } from "react"
import { PrinterCard } from "../../components/PrinterCard"
import Axios from "axios"
import { copyFileSync } from "fs"

export default function index() {
  const [printers, setPrinters] = useState([])

  useEffect(() => {
    ;(async () => {
      let printers = (await Axios.get("http://localhost:3001/printers")).data
      console.log(printers)
      setPrinters(printers)
    })()
  }, [])

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignContent: "flex-start",
      }}
    >
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
      <PrinterCard
        name="Printer1"
        status="READY"
        timeRemaining={28548.6793776905}
        totalTime={37090.81515756399}
      />
    </Box>
  )
}
