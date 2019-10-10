import { createStore } from 'redux'

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

export function user(state=0, action) {
    switch (action.type) {
        default:
            return state;
    }
}
