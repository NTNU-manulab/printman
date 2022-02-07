import {
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
  Box,
} from "@mui/material"
import Card from "@mui/material/Card"
import React, { Fragment, useEffect, useState } from "react"
import { PrinterGridModel } from "models"
import { time } from "console"
import { getThemeProps } from "@mui/system"

function LinearProgressWithLabel(props: {
  value: number
  variant: "determinate" | "indeterminate" | "buffer" | "query" | undefined
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
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
// change to use progress number from OP for progress bar
// calculate remaining time value using estimatedTime * progress, or use starting time and diff from Date.now()?
// color card content BG based on status value (change to list of booleans like OP gives?)
export const PrinterCard = (props: PrinterGridModel) => {
  const { name, state, printProgress, totalTime } = props
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

  // value faker code stolen from https://mui.com/components/progress/#linear-determinate
  useEffect(() => {
    // setRemainingSeconds(() => {
    //   return estimatedTime - estimatedTime * (progress / 100)
    // })

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

  return (
    <Card sx={{ maxWidth: 2 / 9, mt: 2 }}>
      <CardMedia image="prototype3.local.jpeg" component="img" />
      <Typography variant="div">
        <CardContent> {name}</CardContent>
        <CardContent>{state}</CardContent>

        <CardContent>{`Estimated Max time: ` + estimatedTime}</CardContent>
        <CardContent>
        {`Estimated Remaining time: ` + remainingSeconds}
      </CardContent>
        <CardContent>
          {remainingTimeObject.days ? remainingTimeObject.days + ` D : ` : ``}
          {remainingTimeObject.hours ? remainingTimeObject.hours + ` H : ` : ``}
          {remainingTimeObject.minutes
            ? remainingTimeObject.minutes + ` M : `
            : ``}
          {remainingTimeObject.seconds + ` S`} /{" "}
          {estimatedTimeObject.days ? estimatedTimeObject.days + ` D : ` : ``}
          {estimatedTimeObject.hours ? estimatedTimeObject.hours + ` H : ` : ``}
          {estimatedTimeObject.minutes
            ? estimatedTimeObject.minutes + ` M : `
            : ``}
          {estimatedTimeObject.seconds + ` S`}
        </CardContent>
      </Typography>
      <LinearProgressWithLabel variant="determinate" value={progress} />
    </Card>
  )
}
