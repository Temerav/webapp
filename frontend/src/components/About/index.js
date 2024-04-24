import React from "react";
import Box from "@mui/material/Box";

const About = () => {
  return (
    <div>
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
          maxWidth: "1200px",
          justifyContent: "center",
          maxHeight: "90vh",
        }}
      >
        <br />
        <h1 style={{ textAlign: "center", marginBottom: "7vh" }}>
          🎨 Réka Temesvári: Capturing Life's Essence on Canvas 🎨
        </h1>
        <h2
          style={{
            textAlign: "center",
            marginTop: "3vh",
            marginBottom: "3vh",
            marginLeft: "3vw",
            marginRight: "3vw",
          }}
        >
          👋 Greetings! I'm Réka Temesvári, a passionate painter dedicated to
          encapsulating the beauty and depth of life through vibrant strokes of
          color and intricate details.
        </h2>
        <div
          style={{
            textAlign: "center",
            marginTop: "3vh",
            marginBottom: "3vh",
            marginLeft: "3vw",
            marginRight: "3vw",
          }}
        >
          <h4>
            🖌️ Artistic Journey: My artistic journey began as a fervent
            exploration of emotions and perceptions, evolving into a profound
            love affair with the canvas. Every brushstroke tells a story,
            reflecting my innermost thoughts and experiences.
          </h4>
          <br />
          <h4>
            🎓 Education: Having completed the English course at the esteemed
            University of Szeged, I've honed not only my linguistic skills but
            also enriched my artistic vision. My academic pursuits have endowed
            me with a deeper understanding of cultural nuances, which I weave
            into my artwork.
          </h4>
          <br />
          <h4>
            🌟 Inspiration: Nature's ever-changing tapestry, human emotions, and
            the interplay of light and shadow serve as my primary muses. I find
            inspiration in the mundane and the extraordinary alike, striving to
            capture fleeting moments of beauty and introspection.
          </h4>
          <br />
          <h4>
            🎨 Artistic Style: With a fusion of impressionism and realism, my
            paintings exude a sense of timelessness. Through careful observation
            and boundless creativity, I seek to evoke a visceral response in the
            viewer, inviting them to explore the intricacies of the human
            experience.
          </h4>
          <br />
          <h4>
            🌍 Global Perspective: While my roots lie in Szeged, my artistic
            vision knows no bounds. I draw inspiration from diverse cultures and
            landscapes, infusing my work with a global perspective that
            transcends geographical boundaries.
          </h4>
          <br />
          <h4>
            🔍 Current Endeavors: Whether I'm working on a commissioned piece,
            participating in exhibitions, or simply lost in the sanctuary of my
            studio, I am continually pushing the boundaries of my creativity.
            Each new canvas is an opportunity to delve deeper into the essence
            of life and express it in its purest form.
          </h4>
          <br />
          <h4>
            🎨✨ Join me on this enchanting journey through colors and emotions
            as we navigate the intricate tapestry of existence, one brushstroke
            at a time. Welcome to my world of artistry and imagination.
          </h4>
          <br />
        </div>
        <br />
      </Box>
    </div>
  );
};

export default About;
