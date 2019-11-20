import * as actionTypes from "../constants/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
}

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.idToken,
    userId: action.userId,
    loading: false,
    error: null,
  };
}

const authFailed = (state, action) => {
  let error = action.error.message;

  switch(action.error.message) {
    case "EMAIL_EXISTS":
      error = "This email already exists!"
      break;
    case "INVALID_PASSWORD":
      error = "Wrong password!"
      break;
    case "EMAIL_NOT_FOUND":
      error = "This email doesn´t exist!"
      break;
    default:
      break;
  }

  return {
    ...state,
    error: error,
    loading: false,
  }
}

const authLogout = (state) => {
  return {
    ...state,
    token: null,
    userId: null,
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_PENDING:
      return { ...state, loading: true, error: null };
    case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
    case actionTypes.AUTH_FAILED: return authFailed(state,action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    default: 
      return state;
  }
};

export default reducer;