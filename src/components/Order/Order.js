import React from "react";

import classes from "./Order.css";

const Order = ({ price, ingredients }) => {
  const transformedIngredients = [];

  for (let ingredientName in ingredients) {
    transformedIngredients.push({
      name: ingredientName,
      amount: ingredients[ingredientName]
    });
  }

  const ingredientsOutput = transformedIngredients.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput} </p>
      <p>
        Price: <strong>{price} €</strong>{" "}
      </p>
    </div>
  );
};

export default Order;
