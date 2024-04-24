import React from "react";
import Box from "@mui/material/Box";
import WritingEffect from "../WritingEffect";
import Slideshow from "../Slideshow";

const Welcome = () => {
  return (
    <div>
      <Box
        sx={{
          marginTop: "7vh",
          marginBottom: "2vh",
          textAlign: "center",
          position: "relative",
          boxShadow: "0 0 50px 0 rgba(0,0,0,0.2)",
          color: "inherit",
          borderRadius: "20px",
          maxWidth: "1400px",
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
        }}
      >
        <h1 style={{ textAlign: "center", marginTop: "7vh" }}>
          🎨 Welcome to Réka's Artistic Haven, Art
          <WritingEffect text="emis! 🎨" delay={100} />
        </h1>
        <Slideshow></Slideshow>
        <br />
        <div
          style={{ textAlign: "center", marginLeft: "7vw", marginRight: "7vw" }}
        >
          <h3>
            Step into a world where colors dance and emotions sing – welcome to
            Reka's Webshop, where you can immerse your portal to a realm of
            artistic wonder. Here, amidst the digital canvases,
            <WritingEffect
              text="you'll discover a curated collection of Reka Temesvari's finest
          creations, each a masterpiece in its own right."
              delay={100}
            />
          </h3>
        </div>
        <br />
      </Box>
    </div>
  );
};
export default Welcome;
