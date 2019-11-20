import React from "react";

import classes from "./Backdrop.css";

const Backdrop = ({ show, clicked }) => {
  return (
    show ?
    <div className={classes.Backdrop} onClick={clicked}>
    </div>
    : null
  );
};

export default Backdrop;
