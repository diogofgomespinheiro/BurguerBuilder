import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from "./SideDrawer.css";

const SideDrawer = ( { closed, open, isAuthenticated }) => {
  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <div className={[classes.SideDrawer, (open ? classes.Open : classes.Closed)].join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={ isAuthenticated } closed={closed}/>
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
