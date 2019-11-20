import * as actionTypes from "../constants/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  error: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.PURCHASE_BURGUER_START:
      return { ...state, loading: true };
    case actionTypes.PURCHASE_BURGUER_SUCCESS:
      const newOrder = {
        ...action.payload.orderData,
        id: action.payload.id
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      };
    case actionTypes.PURCHASE_BURGUER_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actionTypes.FETCH_ORDERS_PENDING:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      }
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
};

export default reducer;
