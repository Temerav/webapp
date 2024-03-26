import React from "react";
import Box from "@mui/material/Box";

const About = () => {
  return (
    <div>
      <Box
        component="form"
        sx={{
          marginTop: "7%",
          marginBottom: "5%",
          marginLeft: "7%",
          marginRight: "7%",
          textAlign: "center",
          position: "relative",
          overflowY: "scroll",
          boxShadow: "0 0 50px 0 rgba(0,0,0,0.2)",
          color: "inherit",
          borderRadius: "20px",
        }}
      >
        <h1
          style={{ textAlign: "center", marginTop: "5vh", marginBottom: "5vh" }}
        >
          Réka Temesvári
        </h1>
        <div
          style={{
            textAlign: "center",
            marginTop: "3vh",
            marginBottom: "3vh",
            marginLeft: "3vw",
            marginRight: "3vw",
          }}
        >
          <h3>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </h3>
          <h4>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularized in the 1960s with the release of Learjet sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Lauds PageMaker including versions of Lorem
            Ipsum.
          </h4>
          <h4>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularized in the 1960s with the release of Learjet sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Lauds PageMaker including versions of Lorem
            Ipsum.
          </h4>
          <h4>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularized in the 1960s with the release of Learjet sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Lauds PageMaker including versions of Lorem
            Ipsum.
          </h4>
        </div>
      </Box>
    </div>
  );
};

export default About;
