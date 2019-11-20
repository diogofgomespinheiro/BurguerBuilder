import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../constants/actionTypes";
import { logoutSaga, checkAuthTimeoutSaga, authSaga, checkAuthStateSaga } from "./auth";


export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITItATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, checkAuthStateSaga);
}