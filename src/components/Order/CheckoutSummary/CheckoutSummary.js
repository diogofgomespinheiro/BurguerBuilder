import React from 'react';

import Burguer from "../../Burguer/Burguer";
import Button from "../../UI/Button/Button";

import classes from "./CheckoutSummary.css";

const CheckoutSummary = ({ ingredients, checkoutCancelled, checkoutContinue }) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{width: "100%", margin: "auto"}}>
        <Burguer ingredients={ingredients}/>
      </div>
      <Button btnType="Danger" clicked={checkoutCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={checkoutContinue}>CONTINUE</Button>
    </div>
  )
}

export default CheckoutSummary
