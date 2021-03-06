import {Component} from 'react';
import axios from "axios";
import {withRouter} from 'react-router-dom'

@withRouter
class CheckLogin extends Component {
    componentDidMount() {
        if(window.location.pathname.startsWith('/api/')) {
            axios.get('/api/words/')
                .then(res => {
                    if(res.status === 200) {
                        if(res.data.code === 0) {
                        }else {
                            this.props.history.push('/login/')
                        }
                    }
                })
        }
    }
    render() {
        return null;
    }
}

export default CheckLogin;
