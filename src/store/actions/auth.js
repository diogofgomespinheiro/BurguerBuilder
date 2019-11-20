import * as actionTypes from "../constants/actionTypes";

export const authPeding = () => {
  return {
    type: actionTypes.AUTH_PENDING
  }
};

export const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: localId
  }
}

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error
  }
}

export const auth = (email, password, isSignup) => {
  // dispatch(authPeding());
  // const authData = {
  //   email: email,
  //   password: password,
  //   returnSecureToken: true
  // }
  // let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAB7xEDc8qPYt0sHfy_EbQCmrMwptIAnQg";

  // if(!isSignup) {
  //   url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAB7xEDc8qPYt0sHfy_EbQCmrMwptIAnQg";
  // }

  // axios
  //   .post(url,authData)
  //   .then(res => {
  //     const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000) ;

  //     localStorage.setItem('token',res.data.idToken);
  //     localStorage.setItem('expirationDate', expirationDate);
  //     localStorage.setItem("userId", res.data.localId);

  //     dispatch(authSuccess(res.data.idToken, res.data.localId));
  //     dispatch(checkAuthTimeout(res.data.expiresIn));
  //   })
  //   .catch(error => {
  //     dispatch(authFailed(error.response.data.error));
  //   })

  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignup
  }
}

export const logout = () => {
  // localStorage.removeItem("token");
  // localStorage.removeItem("expirationDate");
  // localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_INITItATE_LOGOUT
  }
}

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime
  }
}


export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  }
}