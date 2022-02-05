import { Box, styled } from "@mui/material"
import { PrinterGridModel } from "models"
import React from "react"
import { ReactNode } from "react"
import { PrinterCard } from "./PrinterCard"

export const PrinterGrid = ({
  printers,
}: {
  printers: PrinterGridModel[]
}): JSX.Element => {
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
    display: "grid",
    columnGap: theme.spacing(2),
    rowGap: theme.spacing(2),
  }))

  return (
    <PrinterGrid>
      <PrinterList />
    </PrinterGrid>
  )
}
