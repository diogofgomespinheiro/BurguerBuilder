import { put, delay, call } from "redux-saga/effects";
import axios from "axios";

import * as authActions from "../actions/auth";

export function* logoutSaga(action) {
  // yield localStorage.removeItem("token");
  // yield localStorage.removeItem("expirationDate");
  // yield localStorage.removeItem("userId");

  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");

  yield put(authActions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(authActions.logout());
}

export function* authSaga(action) {
  yield put(authActions.authPeding());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAB7xEDc8qPYt0sHfy_EbQCmrMwptIAnQg";

  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAB7xEDc8qPYt0sHfy_EbQCmrMwptIAnQg";
  }

  try {
    const response = yield axios.post(url, authData);

    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );

    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);

    yield put(
      authActions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(authActions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(authActions.authFailed(error.response.data.error));
  }
}

export function* checkAuthStateSaga(action) {
  const token = yield localStorage.getItem("token");
  
  if (!token) {
    yield put(authActions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem("expirationDate"));

    if (expirationDate < new Date()) {
      yield put(authActions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(authActions.authSuccess(token,userId));
      yield put(authActions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
}
