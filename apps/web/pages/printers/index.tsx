import { Box, styled } from "@mui/material"
import Axios from "axios"
import { PrinterGridModel } from "models"
import React, { ReactNode, useEffect, useState } from "react"
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
        printerState={p.printerState}
        printProgress={p.printProgress}
        totalTime={p.totalTime}
      />
    ))

    return <React.Fragment> {printerList} </React.Fragment>
  }

  const PrinterGrid = styled(Box)(({ theme }) => ({
    [theme.breakpoints.between("sm", "md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  }))

  return (
    <PrinterGrid
      sx={{
        display: "grid",
        columnGap: 2,
        rowGap: 2,
        justifyContent: "space-around",
        // alignContent: "space-between",
        maxWidth: 2 / 3,
        margin: "auto",
        position: "centered",
        mt: 2,
        mb: 2,
      }}
    >
      <PrinterList />
    </PrinterGrid>
    // </ThemeProvider>
  )
}
