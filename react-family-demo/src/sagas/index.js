import { delay } from "redux-saga";
import { put, takeEvery } from "redux-saga/effects";

export function* incrementAsync(action) {
  yield delay(2000);
  console.log(action.callback()); //实现回调
  yield put({ type: "INCREMENT" });
}

export function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}
