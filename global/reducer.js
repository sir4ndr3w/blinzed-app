import { initialState } from './state';
import * as types from './types';

export function reducer(state = initialState, action) {
    console.log('test', action);
    switch (action.type) {
        case types.firebase.FIREBASE_LISTEN_REQUESTED:
            return {...state, [action.meta.type]: {inProgress: true, error: ''}};
        case types.firebase.FIREBASE_LISTEN_FULFILLED:
            return {...state, user: action.payload.items};
        case types.firebase.FIREBASE_LISTEN_CHILD_ADDED:
            return {...state, user: {...state, neu: action.payload.items}};
        case types.firebase.FIREBASE_UPDATE_REJECTED:
            return {...state, [action.meta.type]: {inProgress: false, error: action.payload}};
        default:
            return state;
    }
}
