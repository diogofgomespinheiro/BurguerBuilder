import React from 'react';
import { NavLink } from "react-router-dom";

import classes from "./NavigationItems.css";

const NavigationItems = ( { isAuthenticated, closed }) => {
  return (
    <ul className={classes.NavigationItems}>
      <li><NavLink to="/" exact activeClassName={classes.active} onClick={closed}>Burguer Builder</NavLink></li>
      {isAuthenticated ? <li><NavLink to="/orders" activeClassName={classes.active} onClick={closed}>Orders</NavLink></li> : null }
      {!isAuthenticated 
        ? <li><NavLink to="/auth" activeClassName={classes.active} onClick={closed}>Authenticate</NavLink></li>
        : <li><NavLink to="/logout" activeClassName={classes.active} onClick={closed}>Logout</NavLink></li>
      }
      
    </ul>
  )
}

export default NavigationItems;
