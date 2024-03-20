import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  MenuItem,
  Tooltip,
} from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher";

const pages = ["Welcome", "Shop", "Work", "About", "Contact"];

const ResponsiveAppBar = ({ colorMode, theme }) => {
  const navigate = useNavigate();

  const handleClick = (page) => {
    navigate(`/${page}`);
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        style={
          theme.palette.mode === "light"
            ? {
                background:
                  "linear-gradient(0deg, rgba(253,45,244,1) 0%, rgba(97,40,202,1) 100%)",
              }
            : {
                background:
                  "linear-gradient(0deg, rgba(159,28,153,1) 0%, rgba(68,28,140,1) 100%)",
              }
        }
      >
        <Toolbar>
          <BrushIcon fontSize="large" />
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
            style={{
              fontSize: "45px",
              fontWeight: "bold",
              lineHeight: "48px",
            }}
          >
            Artemis
          </Typography>
          {pages.map((page) => (
            <Tooltip title={page} key={page}>
              <MenuItem key={page} onClick={handleClick.bind(this, page)}>
                <Typography
                  textAlign="center"
                  style={{
                    fontSize: "24px",
                    lineHeight: "48px",
                  }}
                >
                  {page}
                </Typography>
              </MenuItem>
            </Tooltip>
          ))}
          <ThemeSwitcher colorMode={colorMode} theme={theme} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ResponsiveAppBar;
