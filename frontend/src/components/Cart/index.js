import { Box, IconButton } from "@mui/material";
import React, { useMemo, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import { CartContext } from "../../components/Providers/CartProvider";
import StyledBadge from "@mui/material/Badge";
import Decrease from "@mui/icons-material/RemoveCircle";

const Cart = () => {
  const cartContext = React.useContext(CartContext);
  const { cartItems, emptyCart, decreaseQuantity, removeFromCart } =
    cartContext;
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [storedCartItems, setStoredCartItems] = useState([]);

  const getQuantityForBadge = (id) => {
    const cartItem = cartItems.find((item) => item.id === id);
    return cartItem?.quantity;
  };

  const decreaseQuantityUpdate = (id) => {
    decreaseQuantity(id);
    const updatedCartItems = cartItems.filter((item) =>
      item.quantity < 1 ? removeFromCart(id) : item,
    );
    setStoredCartItems(updatedCartItems);
  };

  const removeAllFromCart = () => {
    emptyCart();
    setStoredCartItems([]);
  };

  const order = async () => {
    console.log(cartItems);
  };

  const itemGet = async () => {
    const updatedCartItems = await Promise.all(
      cartItems.map(async (item) => {
        if (item) {
          const response = await axios.get(
            `http://localhost:8080/item/get/${item.id}`,
          );
          return { ...response.data, quantity: item.quantity };
        }
        return null;
      }),
    );

    setStoredCartItems(updatedCartItems.filter(Boolean));
    setLoading(false);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      itemGet();
    } else {
      setLoading(false);
    }
  }, [cartItems]);

  return (
    <Box
      sx={{
        marginTop: "7vh",
        marginBottom: "2vh",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        position: "relative",
        boxShadow: "0 0 50px 0 rgba(0,0,0,0.2)",
        color: "inherit",
        borderRadius: "20px",
        width: "1200px",
        justifyContent: "center",
      }}
    >
      <List
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "1000px",
          bgcolor: "inherit",
          justifyContent: "center",
        }}
      >
        {loading ? <CircularProgress /> : ""}
        {storedCartItems.length === 0 ? (
          <h1 style={{ textAlign: "center", marginTop: "7vh" }}>
            Your cart is empty
          </h1>
        ) : (
          ""
        )}
        {storedCartItems.map((item) => (
          <ListItem justifyContent="center">
            <ListItemAvatar>
              <StyledBadge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                badgeContent={getQuantityForBadge(item.id)}
                color="secondary"
              >
                {" "}
                <Avatar
                  src={
                    item?.picturePath
                      ? `http://localhost:8080${item.picturePath}`
                      : ""
                  }
                  alt={item?.itemName}
                />
              </StyledBadge>
            </ListItemAvatar>
            <ListItemText
              primary={`${item?.itemCost * item?.quantity} HUF`}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  ></Typography>
                  {`${item?.itemName} - ${item?.itemDetails}`}
                </React.Fragment>
              }
            />
            <IconButton onClick={() => decreaseQuantityUpdate(item?.id)}>
              <Decrease />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <div>
        <Box sx={{ "& .MuiButton-root": { m: "10%", width: "23%" } }}>
          <br />
          {cartItems.length > 0 && (
            <>
              <Typography variant="h5">
                Total:{" "}
                {storedCartItems.reduce(
                  (acc, item) => acc + item.itemCost * item.quantity,
                  0,
                )}{" "}
                HUF
              </Typography>
              <Button variant="contained" onClick={removeAllFromCart}>
                Remove all
              </Button>
              <Button variant="contained" onClick={order}>
                Order
              </Button>
            </>
          )}
        </Box>
      </div>
      <br />
    </Box>
  );
};

export default Cart;
