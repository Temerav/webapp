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
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";

const Cart = () => {
  const cartContext = React.useContext(CartContext);
  const { cartItems, emptyCart, decreaseQuantity, removeFromCart } =
    cartContext;
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [storedCartItems, setStoredCartItems] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [orderedItems, setOrderedItems] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAddress("");
    setEmail("");
    setName("");
    setPhone("");
    setComment("");
    setOrderedItems("");
    setSuccess("");
    setError("");
    setOpen(false);
  };

  const validateForm = (z) => {
    if (!/^[0-9]+$/.test(z)) {
      return false;
    } else {
      return true;
    }
  };

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
    setOrderedItems(storedCartItems.map((item) => item.id).join(", "));
    const orderEntity = {
      name: name,
      email: email,
      address: address,
      phone: phone,
      comment: comment,
      cartItems: orderedItems,
    };

    if (!validateForm(phone)) {
      setError("Phone can contains numbers only");
      return;
    }

    axios
      .post("http://localhost:8080/order", orderEntity)
      .then((response) => {
        setSuccess("Order was successfull");
        removeAllFromCart();
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to send order");
      });
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
              <Button variant="contained" onClick={() => handleOpen()}>
                Order
              </Button>
              <Modal
                open={open}
                onClose={() => handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "1200px",
                    height: "1000px",
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    "& > :not(:last-child)": {
                      mb: "4rem",
                    },
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Finish your order
                  </Typography>
                  {error !== "" && (
                    <Alert
                      severity={error ? "error" : "info"}
                      sx={{
                        width: "60%",
                        textAlign: "center",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {error || " "}
                    </Alert>
                  )}
                  {success !== "" && (
                    <Alert
                      severity={success ? "success" : ""}
                      sx={{
                        width: "60%",
                        textAlign: "center",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {success || " "}
                    </Alert>
                  )}
                  <TextField
                    id="name-input"
                    label="Name"
                    variant="outlined"
                    style={{ width: "60%" }}
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <TextField
                    id="email-input"
                    label="Email"
                    variant="outlined"
                    style={{ width: "60%" }}
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <TextField
                    id="address-input"
                    label="Address"
                    multiline
                    rows={4}
                    variant="outlined"
                    style={{ width: "60%" }}
                    required
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />

                  <TextField
                    id="phone-input"
                    label="Phone"
                    variant="outlined"
                    style={{ width: "60%" }}
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />

                  <TextField
                    id="comment-input"
                    label="comment"
                    variant="outlined"
                    style={{ width: "60%" }}
                    required
                    multiline
                    rows={4}
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                  <div>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                        "& .MuiButton-root": {
                          m: "20%",
                          minWidth: "120px",
                        },
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={handleClose}
                        style={{ minWidth: "200px" }}
                      >
                        Close
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => order()}
                        style={{ minWidth: "200px" }}
                      >
                        Submit
                      </Button>
                    </Box>
                  </div>
                </Box>
              </Modal>
            </>
          )}
        </Box>
      </div>
      <br />
    </Box>
  );
};

export default Cart;
