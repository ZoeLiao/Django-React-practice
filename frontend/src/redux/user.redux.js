import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_FAILURE} from './../components/Const';

/**
 * 這是一個 reducer，一個有 (state, action) => state signature 的 pure function。
 * 它描述一個 action 如何把 state 轉換成下一個 state。
 *
 * state 的形狀取決於你：它可以是基本類型、一個陣列、一個物件，
 * 或甚至是一個 Immutable.js 資料結構。唯一重要的部分是你
 * 不應該改變 state 物件，而是當 state 變化時回傳一個新的物件。
 *
 * 在這個範例中，我們使用一個 `switch` 陳述句和字串，不過你可以使用一個 helper，
 * 來遵照一個不同的慣例 (例如 function maps)，如果它對你的專案有意義。
 */

// state初始值
let initState = {
    redirectTo: '',
    email: '',
    username: '',
    password: '',
    pwdConfirm: '',
    msg: '',
    isLogin: false
}

// reducer: (previousState, action) => newState
export function user(state=initState, action) {
    switch (action.type) {
       case REGISTER_SUCCESS:
            return {...state, ...action.data, msg: '', redirectTo: '/login'}
       case REGISTER_FAILURE:
            return {...state, msg: action.msg}
       default:
            return state;
    }
}

// action creator
function registerFail(msg) {
    return {
        msg,
        type: REGISTER_FAILURE
    }
}

// action creator
function registerSuccess(data) {
    return {
        data,
        type: REGISTER_SUCCESS
    }
}

export function register(dispatch, {email, username, password, pwdConfirm}) {
    alert('dispatch', dispatch)
    alert('email', email, username, password, pwdConfirm)
    if(!email || !username || !password) {
        return dispatch(registerFail('賬號、用戶名、或密碼不能為空'))
    }
    if(password !== pwdConfirm) {
        return dispatch(registerFail('兩次密碼不一致'))
    }
    return dispatch => {
        axios.post('/user/register/',{email, username, password})
            .then(res => {
                if(res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess(res.data.data))
                }else {
                    dispatch(registerFail(res.data.msg))
                }
            }
        )
    }
}
