import {call, fork, put, take} from "redux-saga/effects";
import * as types from "../types";
import * as firebase from "firebase";
import * as actions from "../actions";

export function* updateSaga() {
    while (true) {
        const listenUpdateAction = yield take(
            types.firebase.FIREBASE_UPDATE_REQUESTED
        );

        switch (listenUpdateAction.meta.type) {
            case types.metaTypes.email:
                yield fork(updateUserEmail, listenUpdateAction.payload, listenUpdateAction.meta.type);
                break;
            case types.metaTypes.password:
                yield fork(updateUserPassword, listenUpdateAction.payload, listenUpdateAction.meta.type);
                break;
            case types.metaTypes.profile:
                yield fork(updateUserProfile, listenUpdateAction.payload, listenUpdateAction.meta.type);
                break;
            default:
                break;
        }
    }
}

export function* updateUserEmail(payload, metaType) {
    try {
        let user = firebase.auth().currentUser;
        yield call([user, user.updateEmail], payload.email);
        yield put(actions.firebaseUpdateFulfilled(metaType, payload));
    } catch (error) {
        yield put(actions.firebaseUpdateRejected(error, metaType));
    }
}

export function* updateUserPassword(payload, metaType) {
    try {
        let user = firebase.auth().currentUser;
        yield call([user, user.updatePassword], payload.password);
        yield put(actions.firebaseUpdateFulfilled(metaType, payload));
    } catch (error) {
        yield put(actions.firebaseUpdateRejected(error, metaType));
    }
}

export function* updateUserProfile(payload, metaType) {
    try {
        let uid = firebase.auth().currentUser.uid;
        let ref = firebase.database().ref('user/' + uid);
        yield call([ref, ref.update], payload);
        yield put(actions.firebaseUpdateFulfilled(metaType, payload));
    } catch (error) {
        yield put(actions.firebaseUpdateRejected(error, metaType));
    }
}