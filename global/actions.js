import * as types from './types';

export function firebaseListenRequested(ref, metaType) {
    return {
        type: types.firebase.FIREBASE_LISTEN_REQUESTED,
        payload: {ref},
        meta: {type: metaType},
    }
}

export function firebaseListenRejected(error, metaType) {
    return {
        type: types.firebase.FIREBASE_LISTEN_REJECTED,
        payload: {error},
        meta: {type: metaType},
    }
}

export function firebaseListenFulfilled(payload, metaType) {
    return {
        type: types.firebase.FIREBASE_LISTEN_FULFILLED,
        payload,
        meta: {type: metaType},
    }
}

export function firebaseListenChildAdded(id, value, metaType) {
    return {
        type: types.firebase.FIREBASE_LISTEN_CHILD_ADDED,
        payload: {id, value},
        meta: {type: metaType},
    }
}

export function firebaseListenRemoved(clearItems, metaType) {
    return {
        type: types.firebase.FIREBASE_LISTEN_REMOVED,
        payload: {clearItems},
        meta: {type: metaType},
    }
}

export function firebaseRemoveListenerRequested(clearItems, metaType) {
    return {
        type: types.firebase.FIREBASE_REMOVE_LISTENER_REQUESTED,
        payload: {clearItems},
        meta: {type: metaType},
    }
}

export function firebaseUpdateRequested(payload, metaType) {
    return {
        type: types.firebase.FIREBASE_UPDATE_REQUESTED,
        payload,
        meta: {type: metaType},
    }
}

export function firebaseUpdateRejected(error, metaType) {
    return {
        type: types.firebase.FIREBASE_UPDATE_REJECTED,
        payload: {error},
        meta: {type: metaType},
    }
}

export function firebaseUpdateFulfilled(metaType, payload) {
    return {
        type: types.firebase.FIREBASE_UPDATE_FULFILLED,
        payload,
        meta: {type: metaType},
    }
}