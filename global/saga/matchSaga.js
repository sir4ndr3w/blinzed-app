import {call, fork, put, take} from "redux-saga/effects";
import * as types from "../types";
import * as firebase from "firebase";
import * as actions from "../actions";

export function* matchSaga() {
    console.log('das');
}