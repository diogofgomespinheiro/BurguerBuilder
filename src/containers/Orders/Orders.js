import React, { useEffect } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";

import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as orderActions from "../../store/actions/order";

const Orders = ({onFetchOrders, token, userId, loading, orders}) => {
  useEffect(() => {
    onFetchOrders(token,userId);
  }, [onFetchOrders,token,userId]);

    let ordersToDisplay = <Spinner />;

    if (!loading) {
      ordersToDisplay = orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price.toFixed(2)}
        />
      ));
    }

    return (
      <div>
        {ordersToDisplay}
      </div>
    )
  
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(orderActions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
