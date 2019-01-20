import { initialState } from './state';
import * as types from './types';

// todo: isLoaded von bool zu date um aktualitaet zu bestimmen

// todo: fuer chats bei UPDATE FULFILLED in Chats noch Chat ID als Unterkey benutzen

export function reducer(state = initialState, action) {
    console.log('Action:', action);
    let status = "";
    switch (action.type) {

        //Listen
        case types.firebase.FIREBASE_LISTEN_REQUESTED:
            return Object.assign({},state);
        case types.firebase.FIREBASE_LISTEN_FULFILLED:
            status = Object.assign({}, state[action.meta.type],{ isLoaded: true }, action.payload);
            return Object.assign({}, state, { [action.meta.type]: status });
        case types.firebase.FIREBASE_LISTEN_REJECTED:
            return Object.assign({}, state, {[action.meta.type]: { isLoaded: false, error: action.payload.error }});

        //Update
        case types.firebase.FIREBASE_UPDATE_REQUESTED:
            if(action.meta.type === types.metaTypes.profile || action.meta.type === types.metaTypes.email || action.meta.type === types.metaTypes.password ){
                //state.profile.inProgress.push(action.meta.type);
                return { ...state, profile: {...state.profile, inProgress: {...state.profile.inProgress, [action.meta.type]: true}}};
            }
            return Object.assign({}, state, {[action.meta.type]: { inProgress: true, isLoaded: false }});

        case types.firebase.FIREBASE_UPDATE_FULFILLED:
            if(action.meta.type === types.metaTypes.profile || action.meta.type === types.metaTypes.email || action.meta.type === types.metaTypes.password ){
                let newState = Object.assign({}, state);
                const { [action.meta.type]: error, ...otherErrors } = newState.profile.error;
                let newError = otherErrors;

                const { [action.meta.type]: progress, ...otherProgress } = newState.profile.inProgress;
                let newProgress = otherProgress;
                console.log('next state', Object.assign({}, newState, {...newState, profile: {...newState.profile, error: newError, inProgress: newProgress}}));
                return Object.assign({}, newState, {...newState, profile: {...newState.profile, error: newError, inProgress: newProgress}});
            }
            status = Object.assign({}, state[action.meta.type],{ inProgress: false, isLoaded: true }, action.payload);
            return Object.assign({}, state, { [action.meta.type]: status });

        case types.firebase.FIREBASE_UPDATE_REJECTED:
            //todo change from delete to spread operator
            if(action.meta.type === types.metaTypes.profile || action.meta.type === types.metaTypes.email || action.meta.type === types.metaTypes.password ){
                let newState = Object.assign({}, state);
                const { [action.meta.type]: progress, ...otherProgress } = newState.profile.inProgress;
                let newProgress = otherProgress;
                let newErrors = Object.assign({}, newState.profile.error, {[action.meta.type]: action.payload.error});
                console.log('next state', Object.assign({}, newState, {...newState, profile: {...newState.profile, inProgress: newProgress}}));
                return Object.assign({}, newState, {...newState, profile: {...newState.profile, inProgress: newProgress, error: newErrors}});
            }

            return Object.assign({}, state, {[action.meta.type]: { inProgress: false, error: action.payload.error }});

        //Remove
        case types.firebase.FIREBASE_REMOVE_REQUESTED:
            return Object.assign({}, state, {[action.meta.type]: { inProgress: true, isLoaded: false }});
        case types.firebase.FIREBASE_REMOVE_FULFILLED:
            return Object.assign({}, state, {[action.meta.type]: { inProgress: false, isLoaded: true }});
        case types.firebase.FIREBASE_REMOVE_REJECTED:
            return Object.assign({}, state, {[action.meta.type]: { inProgress: false, isLoaded: false, error: action.payload.error }});

        //Child
        //todo fuer Chat Children hinzufuegen und on Update mit Assign den Inhalt ueberschreibem
        case types.firebase.FIREBASE_LISTEN_CHILD_ADDED:
            status = Object.assign({}, state[action.meta.type],{ inProgress: false, isLoaded: true }, action.payload);
            return Object.assign({}, state, { [action.meta.type]: status });
        case types.firebase.FIREBASE_LISTEN_CHILD_CHANGED:
            status = Object.assign({}, state[action.meta.type],{ inProgress: false, isLoaded: true }, action.payload);
            return Object.assign({}, state, { [action.meta.type]: status });

        //Test action
        default:
            return state;
    }
}
