import { Box, Button, IconButton, InputLabel, Tooltip } from "@mui/material";
import React, { useEffect, useRef } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Info, Delete, Edit, AddCircle } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { CartContext } from "../../components/Providers/CartProvider";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Shop = () => {
  const cartContext = React.useContext(CartContext);
  const { addToCart, cartItems, increaseQuantity } = cartContext;

  const [itemData, setItemData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const itemListRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [picturePath, setPicturePath] = React.useState("");
  const [error, setError] = React.useState("");
  const [id, setId] = React.useState("");
  const [pathList, setPathList] = React.useState([]);

  const fetchPicturePaths = () => {
    axios
      .get(`http://localhost:8080/item/paths`)
      .then((response) => {
        setPathList(response.data);
        console.log(pathList);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePicturePathSelection = (path) => {
    setPicturePath(path);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setName("");
    setCost("");
    setDetails("");
    setPicturePath("");
    setOpen(false);
    setError("");
  };

  const uploadPicture = (event) => {
    const file = event.target.files[0];
  };

  const validateForm = (z) => {
    if (!/^[0-9]+$/.test(z)) {
      return false;
    } else {
      return true;
    }
  };

  const updateCart = (product) => {
    const existingItemIndex = cartItems.findIndex((i) => i.id === product.id);
    if (existingItemIndex >= 0) {
      increaseQuantity(product.id);
    } else {
      addToCart({ id: product.id, quantity: 1 });
    }
  };

  const submitPressed = () => {
    if (id === "" || id === 0) {
      addItem();
    } else {
      editItemSend(id);
    }
  };

  const editItemSend = (id) => {
    setError("");
    try {
      if (!validateForm(cost)) {
        setError("Cost must be a number");
        return;
      }
      if (!name || !cost || !details || !picturePath) {
        setError("All fields are required");
        return;
      }
      let formData = {
        id: id,
        itemName: name,
        itemCost: cost,
        itemDetails: details,
        picturePath: picturePath,
      };
      axios
        .put(`http://localhost:8080/item/update/${id}`, formData)
        .then((response) => {
          handleClose();
          getItems();
        })
        .catch((error) => {
          console.error(error.toJSON());
        });
      getItems();
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = () => {
    setError("");
    try {
      if (!validateForm(cost)) {
        setError("Cost must be a number");
        return;
      }
      if (!name || !cost || !details || !picturePath) {
        setError("All fields are required");
        return;
      }
      let formData = {
        itemName: name,
        itemCost: cost,
        itemDetails: details,
        picturePath: picturePath,
      };
      axios
        .post("http://localhost:8080/item", formData)
        .then((response) => {
          handleClose();
          getItems();
        })
        .catch((error) => {
          console.error(error.toJSON());
        });
      getItems();
    } catch (error) {}
  };
  const editItem = async (id) => {
    try {
      handleOpen();
      axios
        .get(`http://localhost:8080/item/get/${id}`)
        .then((response) => {
          setId(response.data.id);
          setName(response.data.itemName);
          setCost(response.data.itemCost);
          setDetails(response.data.itemDetails);
          setPicturePath(response.data.picturePath);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      getItems();
    } catch (error) {
      setError(JSON.stringify(error.toJSON()));
    }
  };
  const deleteItem = async (id) => {
    try {
      axios
        .delete(`http://localhost:8080/item/delete/${id}`)
        .then((response) => {
          console.log(`deleted item ${id}`);
        })
        .catch((error) => {
          console.error(error.toJSON());
        });
      getItems();
    } catch (error) {
      console.error(error.toJSON());
    }
  };

  const getItems = async () => {
    axios
      .get("http://localhost:8080/item")
      .then((response) => {
        setItemData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.toJSON());
      });
  };

  useEffect(() => {
    getItems();
    fetchPicturePaths();
  }, []);

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
        width: "1500px",
        justifyContent: "center",
      }}
    >
      {" "}
      {loading && <CircularProgress color="secondary" />}
      <ImageList ref={itemListRef} variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.id}>
            <img
              srcSet={`http://localhost:8080${item.picturePath}`}
              src={`http://localhost:8080${item.picturePath}`}
              alt={item.itemName}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.itemName}
              subtitle={`${item.itemCost} HUF`}
              style={{ textAlign: "center" }}
              sx={{
                position: "relative",
                bottom: 0,
              }}
              actionIcon={
                <>
                  <Tooltip title="Add to cart">
                    <IconButton onClick={() => updateCart({ id: item.id })}>
                      <ShoppingCartIcon
                        style={{ cursor: "pointer", color: "white" }}
                      />
                    </IconButton>
                  </Tooltip>
                  {localStorage.getItem("session") !== null &&
                    JSON.parse(localStorage.getItem("session"))?.role ===
                      "ROLE_ADMIN" && (
                      <>
                        {" "}
                        <Tooltip title="Add item">
                          <IconButton
                            onClick={() => {
                              handleOpen();
                              setId("");
                            }}
                          >
                            <AddCircle
                              style={{ cursor: "pointer", color: "white" }}
                            />
                          </IconButton>
                        </Tooltip>
                        <Modal
                          open={open}
                          onClose={() => handleClose}
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
                              Add New Item
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
                              id="cost-input"
                              label="Cost in HUF"
                              variant="outlined"
                              style={{ width: "60%" }}
                              required
                              value={cost}
                              onChange={(event) => setCost(event.target.value)}
                            />
                            <TextField
                              id="details-input"
                              label="Details"
                              multiline
                              rows={4}
                              variant="outlined"
                              style={{ width: "60%" }}
                              required
                              value={details}
                              onChange={(event) =>
                                setDetails(event.target.value)
                              }
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "60%",
                              }}
                            >
                              <Button
                                variant="outlined"
                                component="label"
                                style={{ width: "100%" }}
                              >
                                Upload Picture
                                <input
                                  type="file"
                                  hidden
                                  onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                      uploadPicture({ file });
                                    }
                                  }}
                                />
                              </Button>
                              <InputLabel
                                id="picture-input-text"
                                style={{ marginTop: "1rem" }}
                              >
                                {picturePath}
                              </InputLabel>
                              <Select
                                labelId="picture-input-text"
                                id="picture-input"
                                style={{ width: "100%" }}
                                value={picturePath}
                                onChange={(event) =>
                                  handlePicturePathSelection(event.target.value)
                                }
                              >
                                {pathList.map((path) => (
                                  <MenuItem value={`/item/${path}`} key={path}>
                                    {`/item/${path}`}
                                  </MenuItem>
                                ))}
                              </Select>
                            </div>
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
                                  onClick={submitPressed}
                                  style={{ minWidth: "200px" }}
                                >
                                  Submit
                                </Button>
                              </Box>
                            </div>
                          </Box>
                        </Modal>
                        <Tooltip title="Edit item">
                          <IconButton onClick={() => editItem(item.id)}>
                            <Edit
                              style={{ cursor: "pointer", color: "white" }}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete item">
                          <IconButton onClick={() => deleteItem(item.id)}>
                            <Delete
                              style={{ cursor: "pointer", color: "white" }}
                            />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  <Tooltip title={`${item.itemDetails}`}>
                    <IconButton>
                      <Info
                        style={{ cursor: "pointer", color: "white" }}
                      ></Info>
                    </IconButton>
                  </Tooltip>
                </>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Shop;
