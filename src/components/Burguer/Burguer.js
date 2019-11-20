import React from 'react';

import classes from './Burguer.css';
import BurguerIngredient from './BurguerIngredient/BurguerIngredient';

const Burguer = ( { ingredients } ) => {
  let transformedIngredients = Object.keys(ingredients)
    .map(igKey => {
      return [...Array(ingredients[igKey])].map((_,index) => {
        return <BurguerIngredient key={igKey + index} type={igKey} />;
      })
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    },[]);

  if(transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burguer}>
      <BurguerIngredient type="bread-top" />
      {transformedIngredients}
      <BurguerIngredient type="bread-bottom" />
    </div>
  );
}

export default Burguer;