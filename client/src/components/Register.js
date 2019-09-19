import React, { Component } from 'react'
import {Form, Col, Button, Row} from 'react-bootstrap'
import CountrySelect from './CountrySelect'
import { withRouter} from "react-router-dom"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";



class Register extends Component {

    constructor (){
        super();
        this.state = {
            username : "",  
            password: "",
            passwordConfirm : "", 
            name : "",    
            surname  : "" ,
            email : "",  
            telephoneNumber: "",
            country: "",
            city: "",
            zipCode: "",
            vatNumber: "",
            creditCardNumber: "",
            isAccepted: false,
            errors : {}
        }

        this.initialState = this.state;
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    }

    callBack = (countrySelect) => {
        this.setState({
            country: countrySelect
        })
    }
    onChange = e => {
        this.setState({[e.target.id] : e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();
       
    const newUser = {
        username: this.state.username,
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm,
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        telephoneNumber: this.state.telephoneNumber,
        country: this.state.country,
        city: this.state.city,
        zipCode: this.state.zipCode,
        vatNumber: this.state.vatNumber,
        creditCardNumber: this.state.creditCardNumber,
        rating: Math.floor((Math.random() * 300) + 100),
        isAccepted: this.state.isAccepted
    };
      this.props.registerUser(newUser, this.props.history);
  
    }

    resetForm = () => {
        this.setState(this.initialState)
    }
    

    render() {

       // const { errors } = this.state;
        return (
            <div style = {decPage}>
            <Form onSubmit = {this.onSubmit} style = {decSignForm}>
                <Form.Group > 
                    
                    <Form.Label><strong>Username</strong></Form.Label>
                    <Form.Control
                        name = "username"
                        value = {this.state.username}
                        onChange = {this.onChange}
                        id = "username"
                        type = "text" 
                        placeholder = "Username" />
                    <Form.Text className="text-muted">
                        Username must contain at least 6 characters!
                    </Form.Text>
                </Form.Group>

        
                <Form.Row>
                    <Col>
                        <Form.Group >
                            
                            <Form.Label><strong>Password</strong></Form.Label>
                            <Form.Control 
                                name = "password"
                                value = {this.state.password}
                                onChange = {this.onChange}
                                id = "password"
                                type="password" 
                                placeholder="Password" 
                            />
                            <Form.Text className="text-muted">
                                Password must contain at least 6 characters, one digit and one special character!
                            </Form.Text>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group >                           
                            <Form.Label><strong>Confirm Password</strong></Form.Label>
                            <Form.Control
                                name = "passwordConfirm"
                                value = {this.state.passwordConfirm} 
                                onChange = {this.onChange}
                                id = "passwordConfirm"
                                type = "password" 
                                placeholder = "Password" 
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>
                
                <br/>
                <Form.Row>
                    <Col>
                        <Form.Group >
                        
                        <Form.Label><strong>Surname</strong></Form.Label>
                        <Form.Control 
                            name = "surname"
                            value = {this.state.surname}
                            onChange = {this.onChange}
                            id = "surname"
                            type = "text"
                            placeholder="Surname"
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group >
                        
                        <Form.Label><strong>Name</strong></Form.Label>
                        <Form.Control 
                            name = "name"
                            value = {this.state.name}
                            onChange = {this.onChange}
                            id = "name"
                            type = "text"
                            placeholder = "Name"
                        />
                        </Form.Group>
                    </Col>
                </Form.Row>

                <label><strong>Contact Information</strong></label>
                <Form.Row>
                    <Col>
                        <Form.Group>
                        <Form.Label>Telephone Number</Form.Label>
                        <Form.Control 
                                    name = "telephoneNumber"
                                    value = {this.state.telephoneNumber}
                                    onChange = {this.onChange}
                                    id = "telephoneNumber"
                                    type = "text"
                                    placeholder="Phone Number"/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                                    name = "email"
                                    value = {this.state.email}
                                    onChange = {this.onChange}
                                    id = "email"
                                    type = "text"
                                    placeholder="Email"/>
                        </Form.Group>
                    </Col>

                </Form.Row>
             
                <label><strong>Address</strong></label>

                <Form.Row>

                    <Col>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                                <Form.Control 
                                    name = "city"
                                    value = {this.state.city}
                                    onChange = {this.onChange}
                                    id = "city"
                                    type = "text"
                                    placeholder="City"/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label>Zip Code</Form.Label>
                                <Form.Control 
                                    name = "zipCode"
                                    value = {this.state.zipCode}
                                    onChange = {this.onChange}
                                    id = "zipCode"
                                    type = "text"
                                    placeholder="Zip Code"/>
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Row>
                <Col>

                <Form.Group>
                        <Form.Label>Country</Form.Label>
                                <CountrySelect call = {this.callBack}/>

                        </Form.Group>
                        </Col>

                </Form.Row>
                
                <label><strong>Payment Information</strong></label>
                <Form.Row>
                    <Col>
                        <Form.Group >
                            <Form.Label>VAT Number</Form.Label>
                                <Form.Control 
                                    name = "vatNumber"
                                    value = {this.state.vatNumber}
                                    onChange = {this.onChange}
                                    id = "vatNumber"
                                    type = "text"
                                    placeholder="VAT Number"/>

                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group >
                            <Form.Label>Credit Card</Form.Label>
                                <Form.Control 
                                    name = "creditCardNumber"
                                    value = {this.state.creditCardNumber}
                                    onChange = {this.onChange}
                                    id = "creditCardNumber"
                                    type = "text"
                                    placeholder="Credit Card Number"/>
                        </Form.Group>
                    </Col>
                </Form.Row>
                
                <Row>
                    <Col>
                        <Button 
                            type ="submit"
                            variant="primary"
                        >
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
    marginTop: "20px",
    padding: "15px 15px 150px 15px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "40%"
}

const decPage = {
    borderBottom: "1px solid grey"
}

// const errorStyle = {
//     fontFamily : "Helvetica Neue",
//     color: "#ff0000"
// }

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Register));