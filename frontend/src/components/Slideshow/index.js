import React from "react";
import "./styles.css";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const delay = 2500;

const Slideshow = () => {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);
  const [itemData, setItemData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useMemo(() => {
    axios
      .get("http://localhost:8080/workitem")
      .then((response) => {
        setLoading(false);
        setItemData(response.data);
      })
      .catch((error) => {
        console.error(error.toJSON());
      });
  }, []);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === itemData.length - 1 ? 0 : prevIndex + 1,
        ),
      delay,
    );

    return () => {
      resetTimeout();
    };
  }, [index, itemData.length]);

  return (
    <div
      className="slideshow"
      style={{
        width: "750px",
        maxHeight: "max-content",
      }}
    >
      {loading && <CircularProgress color="secondary" />}
      <div
        className="slideshowSlider"
        style={{
          transform: `translate3d(${-index * 100}%, 0, 0)`,
        }}
      >
        {itemData.map((item) => (
          <div className="slide" key={item.id} justifyContent="center">
            <img
              src={`http://localhost:8080${item.picturePath}`}
              alt={`${item.itemName}`}
              style={{ width: "750px", height: "900px" }}
            ></img>
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {itemData.map((item) => (
          <div
            key={item.id - 1}
            className={`slideshowDot${index === item.id - 1 ? " active" : ""}`}
            onClick={() => {
              setIndex(item.id - 1);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
