import {all, call, cancel, flush, fork, put, take} from "redux-saga/effects";
import * as types from "../types";
import * as actions from "../actions";
import {buffers, eventChannel} from "redux-saga";
import * as firebase from "firebase";

export function* listenSaga() {
    yield all([
        watchListener(types.metaTypes.profile),
        watchListener(types.metaTypes.chats),
        watchListener(types.metaTypes.messages),
    ]);
}

export function* watchListener(metaType) {
    while (true) {
        const listenRequestAction = yield take(
            types.firebase.FIREBASE_LISTEN_REQUESTED
        );
        if (listenRequestAction.meta.type === metaType) {
            let task = yield fork(
                getDataAndListenToChannel,
                listenRequestAction.payload.ref,
                metaType
            );
            while (true) {
                const action = yield take([
                    types.firebase.FIREBASE_REMOVE_LISTENER_REQUESTED,
                    types.firebase.FIREBASE_LISTEN_REQUESTED,
                ]);

                if (action.meta.type === metaType) {
                    yield cancel(task);
                    yield put(
                        actions.firebaseListenRemoved(!!action.payload.clearItems, metaType)
                    );

                    if (action.type === types.firebase.FIREBASE_LISTEN_REQUESTED) {
                        task = yield fork(
                            getDataAndListenToChannel,
                            action.payload.ref,
                            metaType
                        )
                    } else {
                        break
                    }
                }
            }
        }
    }
}

export function createEventChannel(ref) {
    const listener = eventChannel(emit => {
        firebase.database().ref(ref).on('child_added', snap => {
            emit({
                eventType: types.eventTypes.CHILD_ADDED,
                key: snap.key,
                value: snap.val(),
            })
        });
        return () => {
            firebase.database().ref(ref).off()
        }
    }, buffers.expanding(1));
    return listener
}

export function* getDataAndListenToChannel(ref, metaType) {
    const chan = yield call(createEventChannel, ref);
    try {
        try {
            const snap = yield call([firebase.database().ref(ref), firebase.database().ref(ref).once], 'value');
            yield flush(chan);
            const val = snap.val();
            const value = val ? val : {};
            yield put(actions.firebaseListenFulfilled(value, metaType));
        } catch (error) {
            yield put(actions.firebaseListenRejected(error, metaType));
        }
        while (true) {
            const data = yield take(chan);
            yield put(
                actions.firebaseListenChildAdded(data.key, data.value, metaType)
            )
        }
    } finally {
        chan.close();
    }
}