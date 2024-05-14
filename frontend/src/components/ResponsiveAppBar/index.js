import React, { Children, useEffect, useMemo } from "react";
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
import StyledBadge from "@mui/material/Badge";
import { CartContext } from "../../components/Providers/CartProvider";

const ResponsiveAppBar = ({ colorMode, theme }) => {
  const [pages, setPages] = React.useState([
    "Welcome",
    "Shop",
    "Cart",
    "Work",
    "About",
    "Contact",
    "Login",
    "Signup",
  ]);
  const navigate = useNavigate();

  const cartContext = React.useContext(CartContext);
  const { cartItems } = cartContext;
  const [cartItemsLength, setCartItemsLength] = React.useState(0);

  useMemo(() => {
    if (localStorage.getItem("session") !== null) {
      setPages([
        "Welcome",
        "Shop",
        "Cart",
        "Work",
        "About",
        "Contact",
        "Profile",
      ]);
    } else {
      setPages([
        "Welcome",
        "Shop",
        "Cart",
        "Work",
        "About",
        "Contact",
        "Login",
        "Signup",
      ]);
    }
  }, [localStorage.getItem("session"), cartItemsLength]);

  useEffect(() => {
    const updateCartItemsLength = () => {
      let length = 0;
      cartItems.forEach((element) => {
        length += element.quantity;
      });
      setCartItemsLength(length);
    };
    updateCartItemsLength();
  }, [cartItems]);

  const handleClick = (page) => {
    navigate(`/${page}`);
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        width="100vh"
        height="10vh"
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
            <div
              key={page}
              justifyContent="center"
              marginLeft="auto"
              marginRight="auto"
            >
              <Tooltip title={page} key={page}>
                <MenuItem
                  id={page}
                  key={page}
                  onClick={handleClick.bind(this, page)}
                >
                  {page === "Cart" ? (
                    <StyledBadge
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      badgeContent={cartItemsLength}
                      color="secondary"
                    >
                      <Typography
                        textAlign="center"
                        style={{
                          fontSize: "24px",
                          lineHeight: "28px",
                        }}
                      >
                        {page === "Signup" ? "Sign Up" : page}
                      </Typography>
                    </StyledBadge>
                  ) : (
                    <Typography
                      textAlign="center"
                      style={{
                        fontSize: "24px",
                        lineHeight: "32px",
                      }}
                    >
                      {page === "Signup" ? "Sign Up" : page}
                    </Typography>
                  )}
                </MenuItem>
              </Tooltip>
            </div>
          ))}
          <ThemeSwitcher colorMode={colorMode} theme={theme} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ResponsiveAppBar;
