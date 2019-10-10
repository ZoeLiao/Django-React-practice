import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


// 配合applyMiddleware解決redux非同步問題
import thunk from 'redux-thunk'

// createStore接受reducer生成stote compose合併生成store其他資料 applyMiddleware接受thunk解決redux非同步問題
import {createStore, compose, applyMiddleware} from 'redux'

// Provider負責傳遞store
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

const store = createStore(reducer, compose(
    applyMiddleware(thunk), //解決redux非同步問題
    window.devToolsExtension ? window.devToolsExtension() : f => f // chrome控制檯redux工具
))

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
