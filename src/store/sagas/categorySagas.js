import { put, takeLatest, all } from 'redux-saga/effects';
import {
    GET_CATEGORY_REQUEST,


} from '../constants';
import AppModel from '../../models/AppModel';
import {showMessage} from '../../components/BaseComponent'

// import { showMessage, showToast } from '../../../base/BaseComponent'
import * as Strings from '../../res/Strings'

import {
    getCategoriesStarted,
    getCategoriesSuccess,
    getCategoriesFailure,

} from '../slice/categorySlice';




export function* getCategoriesRequest(action) {
    try {
        yield put(getCategoriesStarted());
        const responseObj = yield AppModel.fetchCategory(action.requestBody);
        console.log('responseObj', responseObj);
        yield put(getCategoriesSuccess(responseObj.data))
       // showMessage(false,"responseObj.data.data")
        // if (isRequestSuccessful(responseObj, false, false, true)) {
        //     yield put(getCategoriesSuccess(responseObj.data))
        // } else {
        //     yield put(getCategoriesFailure())
        // }
    } catch (error) {
        yield put(getCategoriesFailure());
        console.log(true, 'getCategoriesRequest error')
    }
}


const getMsg = (msg) => {
    if (typeof msg === 'string') {
        return msg;
    } else {
        return msg[0]
    }
}

const isRequestSuccessful = (responseObj, isAlert, isToast, isFailureToast = false) => {
    if (responseObj && responseObj.data && responseObj.data.error === false) {
        if (responseObj.data && (responseObj.data.message)) {
            setTimeout(() => {
                if (isAlert) {
                    showMessage(false, getMsg(responseObj.data.message))
                } else if (isToast) {
                    showToast(getMsg(responseObj.data.message))
                }
            }, 200);
        }
        return true;
    } else {
        if (responseObj && responseObj.data && (responseObj.data.message)) {
            setTimeout(() => {
                if (isAlert) {
                    showMessage(true, getMsg(responseObj.data.message))
                } else if (isFailureToast) {
                    showToast(getMsg(responseObj.data.message))
                }
            }, 200);
        } else {
            setTimeout(() => {
                showMessage(true, Strings.serverIssue)
            }, 200);
        }
        return false
    }
}

export function* actionWatcher() {
    yield takeLatest(GET_CATEGORY_REQUEST, getCategoriesRequest)



}
export default function* authSagas() {
    yield all([
        actionWatcher(),
    ]);
}