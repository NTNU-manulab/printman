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
  Slide
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { FileDrop } from "react-file-drop";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Dropzone: FC<React.ReactFragment> = () => {
  const dropTargetRef = useRef(null);
  const [models, setModels] = useState<File[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  
  const handleClose = () => {
    console.log("Closed");
    
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const stopPropagation = (event: Event) => {
    event.stopPropagation();
  };
  
  const onDrop = (files: FileList | null) => {
    if (!files) return;
    
    handleToggle();
    setModels([...files]);
  };
  
  const onFileInputChange = () => {};
  
  const onTargetClick = () => {};
  
  const onFrameDragEnter = () => {
    console.log("iFFWEUI");
  };
  return (
    <>
      <FileDrop
        onFrameDragEnter={onFrameDragEnter}
        onTargetClick={onTargetClick}
        onDrop={onDrop}
      >
        <input
          onChange={onFileInputChange}
          ref={dropTargetRef}
          type="file"
          className="hidden"
        />
      </FileDrop>
      <Dialog fullScreen TransitionComponent={Transition} open={open}>
        <DialogTitle>Configure print jobs</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {models.map((model) => {
                return (
                  <>
                    <Grid item xs={8}>
                      <Typography noWrap>{model.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>{model.size}</Typography>
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
                );
              })}
            </Grid>
          </DialogContent>
          <DialogActions>
              <Button>Yes</Button>
              <Button>No</Button>
          </DialogActions>
      </Dialog>
    </>
  );
};
