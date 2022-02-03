import Button from "@mui/material/Button"
import { Box, Card } from "@mui/material"
import React, { ReactNode, useEffect, useState } from "react"
import { PrinterCard } from "../../components/PrinterCard"
import Axios from "axios"

type PrinterCardProps = {
  name: string
  state: string
  timeRemaining: number
  totalTime: number
}

const API_URL = process.env.API_URL || "http://localhost:3001"

export default function index() {
  const [printers, setPrinters] = useState([])

  useEffect(() => {
    ;(async () => {
      let printers = (await Axios.get(API_URL + "/printer")).data
      console.log(printers)
      setPrinters(printers)
    })()
  }, [])

  // Renders PrinterCard elements from list.
  const PrinterList = (): JSX.Element => {
    //todo: elements need keys
    const printerList: ReactNode[] = printers.map((p: PrinterCardProps) => (
      <PrinterCard
        name={p.name}
        status={p.state}
        timeRemaining={p.timeRemaining}
        totalTime={p.totalTime}
      />
    ))

    return <React.Fragment> {printerList} </React.Fragment>
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignContent: "flex-start",
      }}
    >
      <PrinterList />
    </Box>
  )
}