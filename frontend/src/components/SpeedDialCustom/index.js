import React from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import SaveIcon from "@mui/icons-material/Save";
import HelpIcon from "@mui/icons-material/Help";

const SpeedDialCustom = () => {
  const actions = [
    { icon: <HelpIcon />, name: "Help" },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <PrintIcon />, name: "Print" },
    { icon: <ShareIcon />, name: "Share" },
  ];

  const actionHandler = (action) => {
    switch (action) {
      case "Help":
        alert("Help");
        break;
      case "Save":
        alert("Save");
        break;
      case "Print":
        alert("Print");
        break;
      case "Share":
        alert("Share");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
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
    </>
  );
};

export default SpeedDialCustom;
