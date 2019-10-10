import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleGoLogin = this.handleGoLogin.bind(this);
    };

    handleGoLogin() {
        this.props.history.push('/login');
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
			    	<Form.Control type="email" placeholder="Enter email" />
			    	<Form.Text className="text-muted">
			    	  We'll never share your email with anyone else.
			    	</Form.Text>
			      </Form.Group>

			      <Form.Group controlId="formBasicPassword">
			    	<Form.Label>Password</Form.Label>
			    	<Form.Control type="password" placeholder="Password" />
			      </Form.Group>

			      <Form.Group controlId="formConfirmPassword">
			    	<Form.Label>Password Confirmation</Form.Label>
			    	<Form.Control type="password" placeholder="Password" />
			      </Form.Group>

			      <Form.Group controlId="formBasicCheckbox">
			    	<Form.Check type="checkbox" label="Check me out" />
			      </Form.Group>
                  <span class="mr-3">
			        <Button variant="primary" type="submit">
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
