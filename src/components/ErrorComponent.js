import React from "react";
import Typography from "@mui/material/Typography";
import "../styles/components/error.css";
import errorCloud from "../images/error-cloud.png";

export default function () {
  return (
    <div className="container">
      <div className="child">
        <Typography
          className="error-msg"
          variant="h4"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          No data found
        </Typography>
        <img className="img-c" height={60} width={60} src={errorCloud}/>
      </div>
    </div>
  );
}
