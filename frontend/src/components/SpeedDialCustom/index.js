import React from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import SaveIcon from "@mui/icons-material/Save";
import HelpIcon from "@mui/icons-material/Help";
import { useNavigate } from "react-router-dom";

const SpeedDialCustom = () => {
  const history = useNavigate();

  const actions = [
    { icon: <HelpIcon />, name: "Help" },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <PrintIcon />, name: "Print" },
    { icon: <ShareIcon />, name: "Share" },
  ];

  const download = (filename, contents) => {
    // Create an anchor tag to download the file
    const anchor = document.createElement("a");
    // Create an href that contains the contents of the file
    // encodeURIComponent encodes a text string as a valid component of a URI
    anchor.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(contents),
    );
    // set the download attribute to download the given filename
    anchor.setAttribute("download", filename);
    // Anchor tag should be invisible
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    // Fire the event
    anchor.click();
    // Remove the anchor tag
    document.body.removeChild(anchor);
  };

  const actionHandler = (action) => {
    switch (action) {
      case "Help":
        history("/Contact");
        break;
      case "Save":
        // create a container for the html
        const container = document.createElement("div");
        // create an html element
        const html = document.createElement("html");
        // set the inner html of the html element to be the inner html of the document (everything except the <html></html>)
        html.innerHTML = document.documentElement.innerHTML;
        // append the html element to the container, to keep the <html></html>
        container.appendChild(html);
        // download the file as index.html
        download("index.html", container.innerHTML);
        break;
      case "Print":
        window.print();
        break;
      case "Share":
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => actionHandler(action.name)}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default SpeedDialCustom;
