import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
} from "@mui/material"
import { color } from "@mui/system"
import { PrinterGridModel, PrinterStateModel } from "models"
import React from "react"

function LinearProgressWithLabel(props: {
  value: number
  variant: "determinate" | "indeterminate" | "buffer" | "query" | undefined
}): ReactJSXElement {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          sx={{ height: 20 }}
          variant={props.variant}
          value={props.value}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

export const PrinterCard = (props: PrinterStateModel, key: string) => {
  const { name, uuid, current } = props

  const timeFromSeconds = (time: number) => {
    let timeLeft = time
    let D = Math.floor(timeLeft / (24 * 60 * 60))
    let H = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60))
    let M = Math.floor((timeLeft % (60 * 60)) / 60)
    let S = Math.floor(timeLeft % 60)
    return {
      days: D,
      hours: H,
      minutes: M,
      seconds: S,
    }
  }

  enum Colour {
    error = "#CC7874",
    paused = "#FFEEA1",
    ready = "#A8F5A2",
    printing = "#FFFFFF",
    closedOrError = "#999999"
  }

  const findBackgroundColour = (): Colour | undefined => {
    let color = undefined
    if (current?.state?.flags) {
      color = Object.entries(current?.state?.flags)
      .filter(([k, v]) => v === true && k !== "operational")
      .map(k => Object.entries(Colour).find(([ek, ev]) => ek === k[0])?.[1])[0]
    }
    
    switch (current?.state?.flags) {
        default:
          }

    return color
  }

  const PrinterTime = () => {
    const estimatedTimeObject = timeFromSeconds(current?.progress?.printTimeLeft ? current!.progress!.printTimeLeft : 0)
    const currentTimeObject = timeFromSeconds(current?.progress?.printTime ? current!.progress!.printTime : 0)

    return (
      <>
        {!current?.state?.flags.ready ? (
          <CardContent
            sx={{
              display: "inline-grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              columnGap: "3",
            }}
          >
            <Typography align="left">
              {`Elapsed: `}
              {currentTimeObject.days ? currentTimeObject.days + `D:` : ``}
              {currentTimeObject.hours
                ? currentTimeObject.hours + `H:`
                : ``}
              {currentTimeObject.minutes
                ? currentTimeObject.minutes + `M:`
                : ``}
              {currentTimeObject.seconds + `S`}
            </Typography>
            <Box sx={{ minWidth: "auto" }} />
            <Typography align="right">
              {" "}
              {`Remaining: `}
              {estimatedTimeObject.days ? estimatedTimeObject.days + `D:` : ``}
              {estimatedTimeObject.hours
                ? estimatedTimeObject.hours + `H:`
                : ``}
              {estimatedTimeObject.minutes
                ? estimatedTimeObject.minutes + `M:`
                : ``}
              {estimatedTimeObject.seconds + `S`}
            </Typography>
          </CardContent>
        ) : (
          <CardContent />
        )}
      </>
    )
  }

  return (
    <Card
      sx={{
        bgcolor: findBackgroundColour(),
        display: "flex",
        flexDirection: "column",
        "& .MuiCardContent-root:last-child": {
          paddingBottom: 0,
        },
      }}
    >
      <CardMedia src="http://localhost:3001/printer/snapshot" component="img" />

      <Typography component={"div"}>
        <CardContent> {name}</CardContent>
        <CardContent>{current?.state?.text}</CardContent>
        {PrinterTime()}
      </Typography>
      <CardContent
        sx={{
          padding: 0,
          mr: 0,
          ml: 0,
          mb: 0,
          marginTop: "auto",
          minWidth: "100%",
        }}
      >
        <LinearProgressWithLabel
          variant="determinate"
          value={ (current?.state?.flags.ready) ? 0 : current!.progress!.completion}
        />
      </CardContent>
    </Card>
  )
}
