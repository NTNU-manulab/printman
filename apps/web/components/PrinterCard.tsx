import { CardContent, CardMedia, LinearProgress } from "@mui/material"
import Card from "@mui/material/Card"
import React, { Fragment, useEffect, useState } from "react"

type PrinterCardProps = {
  name: string
  status: string
  timeRemaining: number
  totalTime: number
}

export const PrinterCard = (props: PrinterCardProps) => {
  const { name, status, timeRemaining, totalTime } = props
  const [progress, setProgress] = useState(0)

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
      <CardContent>{status}</CardContent>
      <LinearProgress
        sx={{ height: 20 }}
        variant="determinate"
        value={progress}
      />
    </Card>
  )
}
