import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { Box, styled } from "@mui/material"
import { PrinterGridModel, PrinterStateModel } from "models"
import Link from "next/link"
import React from "react"
import { ReactNode } from "react"
import { PrinterCard } from "./PrinterCard"

export const PrinterGrid = ({
  printers,
}: {
  printers: PrinterStateModel[]
}): ReactJSXElement => {
  const PrinterList = (): JSX.Element => {
    const printerList: ReactNode[] = printers.map((p: PrinterStateModel) => (
      <Link key={p.name} href={"/" + p.name}>
        <a>
        <PrinterCard
          name={p.name}
          uuid={p.uuid}
          current={p.current}
          />
          </a>
      </Link>
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
