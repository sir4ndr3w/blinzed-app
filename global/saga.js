import { all } from 'redux-saga/effects'
import { listenSaga } from './saga/listenSaga';
import { updateSaga } from "./saga/updateSaga";
import { matchSaga } from "./saga/matchSaga";

export function* rootSaga() {
    yield all([
        listenSaga(),
        updateSaga(),
        matchSaga(),
    ]);
}