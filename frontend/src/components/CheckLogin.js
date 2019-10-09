mport {Component} from 'react';
import {withRouter} from 'react-router-dom'

@withRouter
class CheckLogin extends Component {
    componentDidMount() {
        axios.get('/api/words/')
            .then(res => {
                if(res.status === 200) {
                    if(res.data.code === 0) {

                    }else {
                        this.props.history.push('/user/login/')
                    }
                }
            })
    }
    render() {
        return null;
    }
}

export default CheckLogin;
