import React, { Component } from 'react'
import {Button, Form, Col, Row, Image} from 'react-bootstrap'
import "../index.css"
import logoStart from '../aaa.png'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class Login extends Component {
    constructor (){
        super();
        this.state = {
            username : "",
            password : "",
            errors: {}
        }    

        this.initialState = this.state;
    }
       
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
    if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }
    
    onChange = e => {
      this.setState({[e.target.id] : e.target.value});
    };

    onSubmit = e => {
      e.preventDefault();
      const userData = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    }
        
    resetForm = () => {
      this.setState(this.initialState);
    }
    render() {

        const { errors } = this.state;
        return (
            <div>
              <Image style = {decLogoStart} src = {logoStart}/>
              <Form style={decSignForm}>

                <Form.Group>
                    <Form.Label><strong>Username</strong></Form.Label>
                        <Form.Control 
                            name = "username"
                            value = {this.state.username}
                            onChange = {this.onChange}
                            id = "username"
                            type="username" 
                            placeholder="Username" 
                        />
                </Form.Group>
                <Form.Group >
                    <Form.Label><strong>Password</strong></Form.Label>
                    <Form.Control
                        name = "password"
                        value = {this.state.password}
                        onChange = {this.onChange}
                        id = "password"
                        type = "password" 
                        placeholder="Password" 
                    />
                    <Form.Text className="text-muted">
                        Password must contain at least 6 characters, one digit and one special character!
                    </Form.Text>
                </Form.Group>
               
                <Row>
                    <Col>
                        <Button
                            onClick = {this.onSubmit}
                            variant = "primary">
                            Submit
                        </Button>
                    </Col>
                    <Col>
                    <Button 
                        onClick ={this.resetForm} 
                        variant="secondary">
                        Reset
                    </Button> 
                    </Col>
                </Row>
   
            </Form>
            </div>
        )
    }
}

const decSignForm = {
    fontSize: "15px",
    marginTop: "0px",
    padding: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "40%",
}


const errorStyle = {
    fontFamily : "Helvetica Neue",
    color: "#ff0000"
}

const decLogoStart = {
    width: "15%",
    display: "flex",
    marginTop: "30px",
    marginLeft: "auto",
    marginRight: "auto"
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);