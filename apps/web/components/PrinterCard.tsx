import { CardContent, CardMedia, LinearProgress } from "@mui/material"
import Card from "@mui/material/Card"
import React, { Fragment, useEffect, useState } from "react"
import { PrinterGridModel } from "models"

//todo:
// change to use progress number from OP for progress bar
// calculate remaining time value using estimatedTime * progress, or use starting time and diff from Date.now()?
// color card content BG based on status value (change to list of booleans like OP gives?)
export const PrinterCard = (props: PrinterGridModel) => {
  const { name, state, printProgress, totalTime } = props
  const [progress, setProgress] = useState(printProgress)
  const [estimatedTime, setEstimatedTime] = useState(totalTime)
  const [remainingTime, setRemainingTime] = useState(totalTime)

  // value faker code stolen from https://mui.com/components/progress/#linear-determinate
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = Math.random() * 5
        return Math.min(oldProgress + diff, 100)
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Card sx={{ maxWidth: 2 / 9, mt: 2 }}>
      <CardMedia image="prototype3.local.jpeg" component="img" />
      <CardContent> {name}</CardContent>
      <CardContent>{state}</CardContent>
      <LinearProgress
        sx={{ height: 20 }}
        variant="determinate"
        value={progress}
      />
    </Card>
  )
}
