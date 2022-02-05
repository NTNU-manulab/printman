import React, { useEffect, useState } from "react"
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
} from "@mui/material"
import { PrinterGridModel } from "models"

function LinearProgressWithLabel(props: {
  value: number
  variant: "determinate" | "indeterminate" | "buffer" | "query" | undefined
}) {
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

//todo:
// color card content BG based on status value

export const PrinterCard = (props: PrinterGridModel) => {
  const { name, printerState, printProgress, totalTime } = props
  const [progress, setProgress] = useState(printProgress)
  const [estimatedTime, setEstimatedTime] = useState(totalTime)
  const [estimatedTimeObject, setEstimatedTimeObject] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [remainingSeconds, setRemainingSeconds] = useState(totalTime)
  const [remainingTimeObject, setRemainingTimeObject] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [cardColour, setCardColour] = useState<Colour>()

  // value faker code stolen from https://mui.com/components/progress/#linear-determinate
  useEffect(() => {
    if (printerState.flags.printing) {
      const timer = setInterval(() => {
        setProgress(oldProgress => {
          if (oldProgress === 100) {
            return 0
          }

          const diff = Math.random()
          return Math.min(oldProgress + diff, 100)
        })
      }, 1000)

      return () => {
        clearInterval(timer)
      }
    }
  }, [])

  // reduce seconds left based on progress
  useEffect(() => {
    setRemainingSeconds(() => {
      let timeDiff = estimatedTime * (progress / 100)
      return estimatedTime - timeDiff
    })
  }, [progress])

  // update D:H:M:S object
  useEffect(() => {
    setRemainingTimeObject(timeFromSeconds(remainingSeconds))
  }, [progress])

  useEffect(() => {
    setEstimatedTimeObject(timeFromSeconds(estimatedTime))
  }, [])

  const timeFromSeconds = (time: number) => {
    let timeLeft = time
    // console.log(timeLeft)
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

  useEffect(() => {
    setCardColour(findBackgroundColour())
  }, [progress])

  enum Colour {
    error = "#CC7874",
    paused = "#FFEEA1",
    ready = "#A8F5A2",
    printing = "#FFFFFF",
  }

  //todo: set this as a state object instead of fucking about with sx?
  const findBackgroundColour = (): Colour | undefined => {
    let color = Object.entries(printerState.flags)
      .filter(([k, v]) => v === true && k !== "operational")
      .map(k => Object.entries(Colour).find(([ek, ev]) => ek === k[0])?.[1])[0]
    return color
  }

  return (
    <Card
      sx={{
        // maxWidth: 350,
        // minWidth: 300,
        bgcolor: cardColour,
        display: "flex",
        flexDirection: "column",
        "& .MuiCardContent-root:last-child": {
          paddingBottom: 0,
        },
      }}
    >
      <CardMedia image="prototype3.local.jpeg" component="img" />

      <Typography>
        <CardContent> {name}</CardContent>
        <CardContent>{printerState.text}</CardContent>
        {printerState.flags.printing ? (
          <CardContent>
            {remainingTimeObject.days ? remainingTimeObject.days + ` D : ` : ``}
            {remainingTimeObject.hours
              ? remainingTimeObject.hours + ` H : `
              : ``}
            {remainingTimeObject.minutes
              ? remainingTimeObject.minutes + ` M : `
              : ``}
            {remainingTimeObject.seconds + ` S`} /{" "}
            {estimatedTimeObject.days ? estimatedTimeObject.days + ` D : ` : ``}
            {estimatedTimeObject.hours
              ? estimatedTimeObject.hours + ` H : `
              : ``}
            {estimatedTimeObject.minutes
              ? estimatedTimeObject.minutes + ` M : `
              : ``}
            {estimatedTimeObject.seconds + ` S`}
          </CardContent>
        ) : (
          <CardContent />
        )}
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
          value={printerState.flags.ready ? 0 : progress}
        />
      </CardContent>
    </Card>
  )
}
