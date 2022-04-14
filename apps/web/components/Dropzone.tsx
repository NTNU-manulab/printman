import { Player } from "@lottiefiles/react-lottie-player"
import {
  Backdrop,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Box,
} from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import axios from "axios"
import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { FileDrop } from "react-file-drop"
import { domainToUnicode } from "url"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const Dropzone: FC<React.ReactFragment> = () => {
  const dropTargetRef = useRef(null)
  const [files, setFiles] = useState<File[]>([])
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = () => {
    console.log("Closed")

    setOpen(false)
  }

  const sendFile = async () => {
    handleClose()

    const formData = new FormData()

    files.forEach((f, i) => {
      formData.append(`gcode-file-${i}`, f)
    })

    axios
      .post("http://localhost:3001/printer/uploadFile", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then(res => {
        console.log(`Success` + res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleToggle = () => {
    setOpen(!open)
  }
  const stopPropagation = (event: Event) => {
    event.stopPropagation()
  }

  const onDrop = (files: FileList | null) => {
    if (!files) return

    handleToggle()
    setFiles([...files])
  }

  const onFileInputChange = () => {}

  const onTargetClick = () => {
    /**@type HTMLInputElement */
    document.querySelector<HTMLInputElement>("input[type=file]")?.click()
  }

  const onFrameDragEnter = () => {
    console.log("iFFWEUI")
  }
  return (
    <>
      <FileDrop
        onFrameDragEnter={onFrameDragEnter}
        onTargetClick={onTargetClick}
        onDrop={onDrop}
      >
        <Box sx={{cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", height: 200, border: "dashed #ddd 8px", borderRadius: 5}}>
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>
          <Typography sx={{color: "#999", fontFamily: "Verdana"}}>Drag and drop your 3D model files here</Typography>
          <Typography sx={{color: "#999", fontFamily: "Verdana", fontSize: 10}}>Or click this box. Whichever you prefer</Typography>
        </Box>
        <Player
  speed={0.15}
  autoplay
  loop
  src="https://assets9.lottiefiles.com/packages/lf20_vu2p4il8.json"
  style={{ height: '200px', opacity: 0.4 }}
></Player>
        </Box>
        <input
          onChange={onFileInputChange}
          ref={dropTargetRef}
          type="file"
          hidden
        />
      </FileDrop>
      <Dialog fullScreen TransitionComponent={Transition} open={open}>
        <DialogTitle>Configure print jobs</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {files.map(file => {
              return (
                <>
                  <Grid item xs={8}>
                    <Typography noWrap>{file.name}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>{file.size}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-filled-label">
                        Color
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={""}
                        onChange={() => {}}
                      >
                        <MenuItem value={"orange"}>Orange</MenuItem>
                        <MenuItem value={"red"}>Red</MenuItem>
                        <MenuItem value={"black"}>Black</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={sendFile}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
