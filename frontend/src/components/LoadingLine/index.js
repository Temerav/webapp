import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";

const LoadingLine = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setLoading(false);
          return prevProgress;
        }
        return prevProgress + 25;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: loading ? "block" : "none" }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          style={{ height: 4 }}
        />
      </div>

      <div style={{ display: loading ? "none" : "block" }}></div>
    </div>
  );
};

export default LoadingLine;
