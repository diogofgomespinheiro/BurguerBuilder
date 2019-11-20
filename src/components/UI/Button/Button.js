import React from 'react';

import classes from "./Button.css";

const Button = ( { children, clicked, btnType } ) => {
  return (
    <button onClick={clicked} className={[classes.Button, classes[btnType]].join(' ')} >{children}</button>
  );
}

export default Button;