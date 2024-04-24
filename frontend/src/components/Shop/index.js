import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Info, Delete, Edit, AddCircle } from "@mui/icons-material";

const Shop = () => {
  const [itemData, setItemData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useMemo(() => {
    axios
      .get("http://localhost:8080/item")
      .then((response) => {
        setItemData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.toJSON());
      });
  }, []);

  const addToCart = async (id) => {
    try {
      console.log("added to cart");
    } catch (error) {}
  };
  const addItem = async () => {
    try {
      console.log("added item");
    } catch (error) {}
  };
  const editItem = async (id) => {
    try {
      console.log(`edited item ${id}`);
    } catch (error) {}
  };
  const deleteItem = async (id) => {
    try {
      console.log(`deleted item ${id}`);
    } catch (error) {}
  };
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
        width: "1400px",
        justifyContent: "center",
      }}
    >
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.id}>
            <img
              srcSet={`http://localhost:8080${item.picturePath}`}
              src={`http://localhost:8080${item.picturePath}}`}
              alt={item.itemName}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.itemName}
              subtitle={`${item.itemCost} HUF`}
              style={{ textAlign: "center" }}
              actionIcon={
                <>
                  <Tooltip title="Add to cart">
                    <IconButton onClick={addToCart}>
                      <ShoppingCartIcon style={{ cursor: "pointer" }} />
                    </IconButton>
                  </Tooltip>
                  {localStorage.getItem("session") !== null &&
                    JSON.parse(localStorage.getItem("session"))?.role ===
                      "ROLE_ADMIN" && (
                      <>
                        {" "}
                        <Tooltip title="Add item">
                          <IconButton onClick={addItem}>
                            <AddCircle style={{ cursor: "pointer" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit item">
                          <IconButton onClick={() => editItem(item.id)}>
                            <Edit style={{ cursor: "pointer" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete item">
                          <IconButton onClick={() => deleteItem(item.id)}>
                            <Delete style={{ cursor: "pointer" }} />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  <Tooltip title={`${item.itemDetails}`}>
                    <IconButton>
                      <Info style={{ cursor: "pointer" }}></Info>
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
