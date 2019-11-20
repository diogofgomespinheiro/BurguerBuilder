import React from 'react'

import burguerLogo from "../../assets/burger-logo.png";

import classes from "./Logo.css"

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={burguerLogo} alt="MyBurger"/>
    </div>
  )
}

export default Logo
