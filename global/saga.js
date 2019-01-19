import * as actions from './actions';
import * as firebase from 'firebase';
import * as types from './types';
import {eventChannel, buffers} from 'redux-saga';
import {all, put, take, call, fork, cancel, flush} from 'redux-saga/effects'

//todo: add generic function for calling watchListener for arbitrary Paths

export function* rootSaga() {
    yield all([
        watchListener(types.metaTypes.profile),
        watchUpdater(),
    ]);
}

export function* watchUpdater() {
    while (true) {
        const listenUpdateAction = yield take(
            types.firebase.FIREBASE_UPDATE_REQUESTED
        );

        switch(listenUpdateAction.meta.type){
            case types.metaTypes.email:
                yield call(updateUserEmail, listenUpdateAction.payload, listenUpdateAction.meta.type);
                break;
            case types.metaTypes.password:
                yield call(updateUserPassword, listenUpdateAction.payload, listenUpdateAction.meta.type);
                break;
            case types.metaTypes.profile:
                yield call(updateUserProfile, listenUpdateAction.payload, listenUpdateAction.meta.type);
                break;
            default:
                break;
        }
    }
}

export function* updateUserEmail(payload, metaType){
    try {
        let user = firebase.auth().currentUser;
        yield call([user, user.updateEmail], payload.email);
        yield put(actions.firebaseUpdateFulfilled(metaType, payload));
    } catch(error) {
        yield put(actions.firebaseUpdateRejected(error, metaType));
    }
}

export function* updateUserPassword(payload, metaType){
    try {
        let user = firebase.auth().currentUser;
        yield call([user, user.updatePassword], payload.password);
        yield put(actions.firebaseUpdateFulfilled(metaType, payload));
    } catch(error) {
        yield put(actions.firebaseUpdateRejected(error, metaType));
    }
}

export function* updateUserProfile(payload, metaType){
    try {
        let uid = firebase.auth().currentUser.uid;
        let ref = firebase.database().ref('user/' + uid);
        yield call([ref, ref.update], payload);
        yield put(actions.firebaseUpdateFulfilled(metaType, payload));
    } catch(error) {
        yield put(actions.firebaseUpdateRejected(error, metaType));
    }
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
            console.log('fulfilled');
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