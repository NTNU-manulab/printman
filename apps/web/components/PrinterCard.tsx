import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
} from "@mui/material"
import { PrinterGridModel } from "models"
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

export const PrinterCard = (props: PrinterGridModel, key: string) => {
  const { name, printerState, progress } = props

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
  }

  const findBackgroundColour = (): Colour | undefined => {
    let color = Object.entries(printerState.flags)
      .filter(([k, v]) => v === true && k !== "operational")
      .map(k => Object.entries(Colour).find(([ek, ev]) => ek === k[0])?.[1])[0]
    return color
  }

  const PrinterTime = () => {
    const estimatedTimeObject = timeFromSeconds(progress.printTimeTotal)
    const remainingTimeObject = timeFromSeconds(progress.printTimeLeft)

    return (
      <>
        {!printerState.flags.ready ? (
          <CardContent
            sx={{
              display: "inline-grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              columnGap: "3",
            }}
          >
            <Typography align="left">
              {remainingTimeObject.days ? remainingTimeObject.days + `D:` : ``}
              {remainingTimeObject.hours
                ? remainingTimeObject.hours + `H:`
                : ``}
              {remainingTimeObject.minutes
                ? remainingTimeObject.minutes + `M:`
                : ``}
              {remainingTimeObject.seconds + `S`}
            </Typography>
            <Box sx={{ minWidth: "auto" }} />
            <Typography align="right">
              {" "}
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
        <CardContent>{printerState.text}</CardContent>
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
          value={printerState.flags.ready ? 0 : progress.completion}
        />
      </CardContent>
    </Card>
  )
}
