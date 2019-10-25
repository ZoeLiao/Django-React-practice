import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


// 配合applyMiddleware解決redux非同步問題
import thunk from 'redux-thunk'

// createStore接受reducer生成stote compose合併生成store其他資料 applyMiddleware接受thunk解決redux非同步問題
import {createStore, compose, applyMiddleware} from 'redux'

// Provider
// 接收上方在 Redux 中創建的 store，
// 並根據和 component 綁在一起的需求單 mapStateToProps 上要求的資料從 store 中取出，再透過 props 流向 component
import {Provider} from 'react-redux'

// 引入react-router-dom各種路由元素
import {BrowserRouter as Router, Route} from 'react-router-dom'

// 引入判斷是否登入元件
import CheckLogin from './components/CheckLogin'

// 引入頁面路由元件
import Login from './containers/Login'
import Register from './containers/Register'
import App from './containers/App'

// 生成store
import reducer from './reducer'

// 每個專案都應該只能有一個 store 存在
// 若是有許多不同類型的資料，則是以 Reducer 區分
const store = createStore(reducer, compose(
    // @param {Function} [enhancer] store enhancer
    // 解決redux非同步問題
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f // chrome控制檯redux工具
))
console.log('store', store.getState())

// 頁面渲染
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="react-login-register">
				<CheckLogin></CheckLogin>
				<Route path='/login' component={Login}></Route>
				<Route path='/register' component={Register}></Route>
				<Route path='/app' component={App}></Route>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
)
