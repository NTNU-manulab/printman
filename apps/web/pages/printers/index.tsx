import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  styled,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material"
import Axios from "axios"
import { PrinterGridModel } from "models"
import React, { useEffect, useState } from "react"
import { PrinterGrid } from "../../components/PrinterGrid"
import PrinterStatusBar from "../../components/PrinterStatusBar"

const API_URL = process.env.API_URL || "http://localhost:3001";

export default function index() {
  const [printers, setPrinters] = useState<PrinterGridModel[]>([])
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
    ;(async () => {
      let printers = (await Axios.get(API_URL + "/printer")).data
      // console.log(printers)
      setPrinters(printers)
    })()
  }, [])

  useEffect(() => {
    setPrinterStates(findPrinterStates())
  }, [printers])

  const findPrinterStates = () => {
    const ready = printers.filter(
      p => p.printerState.flags.ready === true,
    ).length
    const printing = printers.filter(
      p => p.printerState.flags.printing === true,
    ).length
    const paused = printers.filter(
      p => p.printerState.flags.paused === true,
    ).length
    const error = printers.filter(
      p => p.printerState.flags.error === true,
    ).length

    return {
      ready,
      printing,
      error,
      paused,
    }
  }

  const theme = createTheme()

  // const PrinterContainer = styled(Container)(({ theme }) => ({
  //   display: "grid",
  //   rowGap: theme.spacing(2),
  //   columnGap: theme.spacing(2),
  //   margin: "auto",
  //   paddingLeft: { xs: 0, md: 0 },
  //   paddingRight: 0,
  // }))

  return (
    <>
      <AppBar position="sticky" sx={{ mb: theme.spacing(2) }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            MANULAB PRINTFARM
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key={1}
              onClick={() => {}}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              PRINTERS
            </Button>
            <Button
              key={1}
              onClick={() => {}}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              ADMIN
            </Button>
            <Button
              key={1}
              onClick={() => {}}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              ABOUT
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
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
        <PrinterStatusBar printerStates={printerStates} />
        <PrinterGrid printers={printers} />
      </Container>
    </>
  )
}
