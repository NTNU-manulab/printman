// import 'dotenv/config'
import {
  Box,
  Container,
  createTheme,
  styled,
} from "@mui/material"
import Axios from "axios"
import { PrinterGridModel, PrinterStateModel } from "models"
import React, { useEffect, useState } from "react"
import { PrinterGrid } from "../components/PrinterGrid"
import PrinterStatusBar from "../components/PrinterStatusBar"
import io from "socket.io-client"
import { Dropzone } from "../components/Dropzone"
import PrinterColorFilter from "../components/PrinterColorFilter"


const API_URL = process.env.REACT_APP_PRINTER00
const WS_URL = "http://localhost:3001"

export default function Index() {
  const [printers, setPrinters] = useState<PrinterStateModel[]>([])
  const [printerStates, setPrinterStates] = useState<{
    ready: number
    printing: number
    error: number
    paused: number
  }>({
    ready: 0,
    printing: 0,
    error: 0,
    paused: 0,
  })

  useEffect(() => {
    socketInit()
  }, [])

  const socketInit = async () => {
    console.log(process.env.REACT_APP_API_URL)
    const socket = io("http://localhost:3001")

    socket.on("connect", function () {
      socket.emit("printers", { test: "test" })
    })

    socket.on("printers", function (data) {
      setPrinters(data)
    })

    return null
  }

  useEffect(() => {
    setPrinterStates(findPrinterStates())
  }, [printers])

  const findPrinterStates = () => {
    const ready = printers.filter(
      p => p.current?.state?.flags.ready === true,
    ).length
    const printing = printers.filter(
      p => p.current?.state?.flags.printing === true,
    ).length
    const paused = printers.filter(
      p => p.current?.state?.flags.paused === true,
    ).length
    const error = printers.filter(
      p => p.current?.state?.flags.error === true,
    ).length

    return {
      ready,
      printing,
      error,
      paused,
    }
  }

  const theme = createTheme()

  return (
    <>
      {/* <ManulabAppBar /> */}
      <Container
        fixed
        sx={{
          display: "grid",
          rowGap: theme.spacing(2),
          columnGap: theme.spacing(2),
          margin: "auto",
          [theme.breakpoints.up("xs")]: {
            padding: { xs: 0, md: 0 },
          },
        }}
      >
        <Dropzone></Dropzone>
        <Box>
          <PrinterStatusBar printerStates={printerStates} />
          <PrinterColorFilter />
        </Box>
        <PrinterGrid printers={printers} />
      </Container>
    </>
  )
}