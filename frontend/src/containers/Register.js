import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {register} from './../redux/user.redux'
import {connect} from 'react-redux';


@connect(
    // 從 store 提取的 state
    state => state,
    // Defining mapDispatchToProps As An Object: { action creator }
    // props.dispatch(() => register()) to props.register()
    {register}
)
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            pwdConfirm: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleGoLogin = this.handleGoLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        console.log(this.props)
    };

    handleChange(e) {
        const property = e.target.name;
        const value = e.target.value;
        this.setState({
            [property]: value
        });
        console.log(this.state)
    }

    handleGoLogin() {
        this.props.history.push('/login');
    }

	handleRegister() {
        console.log(this.props)
	    this.props.register(this.state)
	}

    render() {
        return (
        <main className="content">
          <h1 className="word-header text-white text-uppercase text-center my-4">Learn Words</h1>
          <div className="row ">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">

			    <Form>
			      <Form.Group controlId="formBasicEmail">
			    	<Form.Label>Email address</Form.Label>
			    	<Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange}/>
			    	<Form.Text className="text-muted">
			    	  We'll never share your email with anyone else.
			    	</Form.Text>
			      </Form.Group>

			      <Form.Group controlId="formBasicUsername">
			    	<Form.Label>User Name</Form.Label>
			    	<Form.Control placeholder="Enter username" name="username" onChange={this.handleChange}/>
			      </Form.Group>

			      <Form.Group controlId="formBasicPassword">
			    	<Form.Label>Password</Form.Label>
			    	<Form.Control type="password" placeholder="Enter password" name="password" onChange={this.handleChange}/>
			      </Form.Group>

			      <Form.Group controlId="formConfirmPassword">
			    	<Form.Label>Password Confirmation</Form.Label>
			    	<Form.Control type="password" placeholder="Enter password" name="pwdConfirm" onChange={this.handleChange}/>
			      </Form.Group>

			      <Form.Group controlId="formBasicCheckbox">
			    	<Form.Check type="checkbox" label="Check me out" />
			      </Form.Group>

                  {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo}></Redirect>:null}

				  <div className="mb-2" style={{color:"red"}}>{this.props.user ? this.props.user.msg : ''}</div>

                  <span className="mr-3">
			        <Button variant="primary" type="submit" onClick={this.handleRegister}>
			          Submit
			        </Button>
                  </span>
                  
                  <span>
			        <Button variant="primary" onClick={this.handleGoLogin}>
			          Login	
			        </Button>
                  </span>
			    </Form>

              </div>
            </div>
          </div>
        </main>

    )
}
}

export default Register
