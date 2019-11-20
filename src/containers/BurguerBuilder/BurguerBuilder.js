import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burguer/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as burguerBuilderActions from "../../store/actions/burguerBuilder";
import * as orderActions from "../../store/actions/order";

const BurguerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ingredients = useSelector(state => state.burguerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burguerBuilder.totalPrice);
  const error = useSelector(state => state.burguerBuilder.error);
  const purchased = useSelector(state => state.order.purchased);
  const isAuthenticated = useSelector(state => state.auth.token !== null);


  const onIngrdientAdded = ingName => dispatch(burguerBuilderActions.addIngredient(ingName));
  const onIngrdientRemoved =  ingName => dispatch(burguerBuilderActions.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(burguerBuilderActions.initIngredients()), [dispatch]);
  const onInitPurchase = useCallback(() => dispatch(orderActions.purchaseInit()), [dispatch]);

  useEffect(() => {
    if (!ingredients || purchased) {
      onInitIngredients();
      onInitPurchase();
    }
  }, [ingredients,purchased, onInitIngredients, onInitPurchase]);

  const checkPurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (!isAuthenticated) {
      props.history.push("/auth");
    } else {
      setPurchasing(true);
    }
  };

  const purchaseCanceledHanlder = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  const disableInfo = {
    ...ingredients
  };

  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;

  if (ingredients) {
    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        purchaseCancelled={purchaseCanceledHanlder}
        puchaseContinued={purchaseContinueHandler}
        price={totalPrice}
      />
    );
  }

  return (
    <>
      <Modal
        show={purchasing}
        modalClosed={purchaseCanceledHanlder}
      >
        {orderSummary}
      </Modal>
      {ingredients ? (
        <>
          <Burguer ingredients={ingredients} />
          <BuildControls
            ingredientAdded={onIngrdientAdded}
            ingredientRemoved={onIngrdientRemoved}
            disabled={disableInfo}
            purchasable={checkPurchaseState(ingredients)}
            price={totalPrice}
            isAuthenticated={isAuthenticated}
            ordered={purchaseHandler}
          />
        </>
      ) : error ? (
        <p>Ingredients cant be loaded</p>
      ) : (
        <Spinner />
      )}
    </>
  );
};


export default withErrorHandler(BurguerBuilder, axios);
