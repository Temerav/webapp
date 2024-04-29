import { Box } from "@mui/material";
import React, { useMemo } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";

const Cart = () => {
  const [cartItems, setCartItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [storedCartItems, setStoredCartItems] = React.useState(
    localStorage.getItem("cartItems") !== null
      ? localStorage.getItem("cartItems")
      : "",
  );
  const [totalPrice, setTotalPrice] = React.useState(0);

  const removeAllFromCart = async () => {
    localStorage.removeItem("cartItems");
    setStoredCartItems("");
  };

  const order = async () => {
    console.log(cartItems);
  };

  const itemGet = async () => {
    setCartItems([]);
    storedCartItems.split(",").forEach((item) => {
      if (item !== "" && item !== null) {
        axios
          .get(`http://localhost:8080/item/get/${item}`)
          .then((response) => {
            setCartItems((cartItems) => [...cartItems, response.data]);
            setTotalPrice((totalPrice) => totalPrice + response.data.itemCost);
          })
          .catch((error) => {
            console.error(error.toJSON());
          });
      }
    });
  };

  useMemo(() => {
    if (storedCartItems !== null || storedCartItems !== "") {
      itemGet();
    }
    setLoading(false);
  }, [storedCartItems]);

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
        {cartItems.length === 0 ? (
          <h1 style={{ textAlign: "center", marginTop: "7vh" }}>
            Your cart is empty
          </h1>
        ) : (
          ""
        )}
        {cartItems.map((item) => (
          <ListItem justifyContent="center">
            <ListItemAvatar>
              <Avatar
                src={
                  item !== null
                    ? `http://localhost:8080${item.picturePath}`
                    : ""
                }
                alt={item.itemName}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${item.itemCost} HUF`}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  ></Typography>
                  {`${item.itemName} - ${item.itemDetails}`}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
      <div>
        <Box
          sx={{
            "& .MuiButton-root": { m: "10%", width: "23%" },
          }}
        >
          <br />
          {cartItems.length > 0 && (
            <>
              <Typography variant="h5">Total: {totalPrice} HUF</Typography>
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
