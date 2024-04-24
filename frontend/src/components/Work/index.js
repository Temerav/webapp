import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const Work = () => {
  const [itemData, setItemData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useMemo(() => {
    axios
      .get("http://localhost:8080/workitem")
      .then((response) => {
        setItemData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.toJSON());
      });
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
            />
          </ImageListItem>
        ))}
      </ImageList>
      <br />
    </Box>
  );
};

export default Work;
