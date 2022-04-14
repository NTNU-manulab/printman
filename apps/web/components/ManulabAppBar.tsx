import { useTheme } from "@emotion/react";
import {
  AppBar,
  Box,
  Button, Theme, Toolbar,
  Typography
} from "@mui/material";
import React from "react";

export function ManulabAppBar() {
  const theme = useTheme()
  
    return (<AppBar position="sticky" sx={{
    mb: 2
  }}>
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{
        mr: 2,
        display: {
          xs: "none",
          md: "flex"
        }
      }}>
        MANULAB PRINTFARM
      </Typography>
      <Box sx={{
        flexGrow: 1,
        display: {
          xs: "none",
          md: "flex"
        }
      }}>
        <Button key={1} onClick={() => { }} sx={{
          my: 2,
          color: "white",
          display: "block"
        }}>
          PRINTERS
        </Button>
        <Button key={2} onClick={() => { }} sx={{
          my: 2,
          color: "white",
          display: "block"
        }}>
          ADMIN
        </Button>
        <Button key={3} onClick={() => { }} sx={{
          my: 2,
          color: "white",
          display: "block"
        }}>
          ABOUT
        </Button>
      </Box>
    </Toolbar>
  </AppBar>);
}
