import Button from "@mui/material/Button"
import { Box, Card } from "@mui/material"
import React, { ReactNode, useEffect, useState } from "react"
import { PrinterGridModel } from "models"
import Axios from "axios"
import { PrinterCard } from "../../components/PrinterCard"

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
    const printerList: ReactNode[] = printers.map((p: PrinterGridModel) => (
      <PrinterCard
        name={p.name}
        state={p.state}
        printProgress={p.printProgress}
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
