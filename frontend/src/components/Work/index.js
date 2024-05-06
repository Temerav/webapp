import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Tooltip } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";

const Work = () => {
  const [itemData, setItemData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [picturePath, setPicturePath] = React.useState("");
  const [error, setError] = React.useState("");
  const [id, setId] = React.useState("");
  const [pathList, setPathList] = React.useState([]);

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
      if (!name || !details || !picturePath) {
        setError("All fields are required");
        return;
      }
      let formData = {
        id: id,
        itemName: name,
        itemDetails: details,
        picturePath: picturePath,
      };
      axios
        .put(`http://localhost:8080/workitem/update/${id}`, formData)
        .then((response) => {
          handleClose();
          getWorkItems();
        })
        .catch((error) => {
          console.error(error.toJSON());
        });
      getWorkItems();
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = () => {
    setError("");
    try {
      if (!name || !details || !picturePath) {
        setError("All fields are required");
        return;
      }
      let formData = {
        itemName: name,
        itemDetails: details,
        picturePath: picturePath,
      };
      axios
        .post("http://localhost:8080/workitem", formData)
        .then((response) => {
          handleClose();
          getWorkItems();
        })
        .catch((error) => {
          console.error(error.toJSON());
        });
      getWorkItems();
    } catch (error) {}
  };
  const editItem = async (id) => {
    try {
      handleOpen();
      axios
        .get(`http://localhost:8080/workitem/get/${id}`)
        .then((response) => {
          setId(response.data.id);
          setName(response.data.itemName);
          setDetails(response.data.itemDetails);
          setPicturePath(response.data.picturePath);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      getWorkItems();
    } catch (error) {
      setError(JSON.stringify(error.toJSON()));
    }
  };

  const fetchPicturePaths = () => {
    axios
      .get(`http://localhost:8080/workitem/paths`)
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
    setDetails("");
    setPicturePath("");
    setOpen(false);
    setError("");
  };

  const uploadPicture = (event) => {
    const file = event.target.files[0];
  };

  const deleteItem = async (id) => {
    try {
      axios
        .delete(`http://localhost:8080/workitem/delete/${id}`)
        .then((response) => {
          handleClose();
          getWorkItems();
        })
        .catch((error) => {
          console.error(error.toJSON());
        });
      getWorkItems();
    } catch (error) {
      console.error(error.toJSON());
    }
  };

  const getWorkItems = () => {
    axios
      .get("http://localhost:8080/workitem")
      .then((response) => {
        setItemData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.toJSON());
      });
  };

  React.useMemo(() => {
    getWorkItems();
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
        maxWidth: "max-content",
      }}
    >
      {loading && <CircularProgress color="secondary" />}
      <br />
      <ImageList
        sx={{
          marginLeft: "3vw",
          marginRight: "3vw",
          marginTop: "3vh",
          borderRadius: "50px",
        }}
      >
        <ImageListItem key="Subheader" cols={2}></ImageListItem>
        {itemData.map((item) => (
          <ImageListItem key={item.id}>
            <img
              srcSet={`http://localhost:8080${item.picturePath}`}
              src={`http://localhost:8080${item.picturePath}`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.itemName}
              subtitle={item.itemDetails}
              actionIcon={
                <>
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
                                onChange={(event) =>
                                  setName(event.target.value)
                                }
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
                                    handlePicturePathSelection(
                                      event.target.value,
                                    )
                                  }
                                >
                                  {pathList.map((path) => (
                                    <MenuItem
                                      value={`/workitem/${path}`}
                                      key={path}
                                    >
                                      {`/workitem/${path}`}
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
                        </Tooltip>
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
                </>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <br />
    </Box>
  );
};

export default Work;
