import React from "react";
import { AppBar, Toolbar, Typography, Box, MenuItem, Tooltip } from "@mui/material";
import BrushIcon from '@mui/icons-material/Brush';
import { useNavigate } from "react-router-dom";

const pages = ['Home', 'About', 'Admin'];

const ResponsiveAppbar = () => {

  const navigate = useNavigate();

  const handleClick = (page) => {
    navigate(`/${page}`);
  }

  return (
    <Box>
      <AppBar position="static" style={{
          background: "linear-gradient(0deg, rgba(253,45,244,1) 0%, rgba(97,40,202,1) 100%)"
        }}>
        <Toolbar>
          <BrushIcon fontSize="large"/>
          <Tooltip title="Welcome">
          <MenuItem
            onClick={handleClick.bind(this, '')}>
            <Typography variant="h6" sx={{ flexGrow: 1 }} style={{
              fontStyle: 'oblique 40deg',
              fontFamily: 'Trocchi',
              fontSize: '45px',
              fontWeight: 'bold',
              lineHeight: '48px',
              margin: 0
            }}>Art of Temi</Typography>
          </MenuItem>
          </Tooltip>
          {pages.map((page) => (
            <Tooltip title={page} key={page}>
            <MenuItem
              key={page}
              onClick={handleClick.bind(this, page)}
            >
              <Typography textAlign="center" style={{
                fontSize: '24px',
                lineHeight: '48px',
              }}>{page}</Typography>
            </MenuItem>
            </Tooltip>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default ResponsiveAppbar;