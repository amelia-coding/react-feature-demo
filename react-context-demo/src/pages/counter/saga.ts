import { put, takeEvery, fork } from 'redux-saga/effects';

type PayloadAction<P = void, T extends string = string, M = never, E = never> = {
  payload: P;
  type: T;
} & ([M] extends [never] ? {} : { meta: M }) &
  ([E] extends [never] ? {} : { error: E });

function delay(ms: number) {
  setTimeout(function () {
    console.log('my delay');
  }, ms);
}

function* incrementAsync(action: PayloadAction) {
  console.log(action);
  yield delay(3000);
}

export default function* () {
  yield takeEvery('test/saga', incrementAsync);
}
