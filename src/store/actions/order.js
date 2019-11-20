import * as actionTypes from "../constants/actionTypes";
import axios from "../../axios-orders";

export const purchaseBurguerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGUER_SUCCESS,
    payload: {
      id,
      orderData
    }
  };
};

export const purchaseBurguerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGUER_FAIL,
    error: error
  };
};

export const purchaseBurguer = (orderData, token) => dispatch => {
  dispatch({ type: actionTypes.PURCHASE_BURGUER_START });
  axios
    .post("/orders.json?auth=" + token, orderData)
    .then(res => {
      dispatch(purchaseBurguerSuccess(res.data.name, orderData));
    })
    .catch(err => {
      dispatch(purchaseBurguerFail(err));
    });
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFailed = error => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error: error
  };
};

export const fetchOrdersPending = () => {
  return {
    type: actionTypes.FETCH_ORDERS_PENDING
  };
};

export const fetchOrders = (token, userId) => dispatch => {
  dispatch(fetchOrdersPending());
  axios
    .get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
    .then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(error => {
      dispatch(fetchOrdersFailed(error));
    });
};
