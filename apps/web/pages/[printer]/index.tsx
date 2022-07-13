import { useTheme } from '@emotion/react'
import { Container, Grid } from '@mui/material'
import Image from 'next/image'
import React, { useEffect } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2'
import { Printer } from 'models'
import { io } from 'socket.io-client'
import { API_URL } from '../'
  
  ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
  );

const Printer = () => {
  const lineData = {
    labels: ['Jun', 'Jul', 'Aug'],
    datasets: [{
      label: 'Temperature',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],

    }]
  }

  useEffect(() => {
    socketInit()
  }, [])

  const socketInit = async () => {
    const socket = io(process.env.REACT_APP_BASE_URL!)

    socket.on("connect", function () {
      socket.emit("events", { test: "test" })
    })

    socket.on("events", function (data: Printer.Response) {
      console.log(data)
    })

    return null
  }

  return (
    <>
      {/* <ManulabAppBar /> */}
      <Container>
        <Grid container>
          <Grid container item direction={"column"}>
            <Grid container item direction={"column"}>
              <Grid container item direction={"row"}>
                <Grid item>
                <Line data={lineData} />
                </Grid>
                <Grid item>
                <Line data={lineData} />
                </Grid>
              </Grid>
              <Grid container item direction={"row"}>
                <Grid item>
                <Line data={lineData} />
                </Grid>
                <Grid item>
                <Line data={lineData} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <img src= {API_URL + '/printer/snapshot'} />
            </Grid>
          </Grid>
          <Grid item>
              {/* CONSOLE MESSAGES */}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Printer