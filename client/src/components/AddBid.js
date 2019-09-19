import React, { Component } from 'react'
import {Form, Col, Button, Row, InputGroup} from 'react-bootstrap'
import uuidv1 from "uuid";
import { connect } from 'react-redux';
import { addBid } from '../actions/product-actions'
import { withRouter} from "react-router-dom"
import GetCoordsFromMap from "./GetCoordsFromMap";
import CountrySelect from "./CountrySelect";

function addDays( days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}

class AddBid extends Component {
    constructor () {
        super();
        this.state = {
            ItemID: "",
            Name: "",
            Category: [],
            Currently: "",
            Buy_Price: "",
            First_Bid: "",
            Number_of_Bids: "",
            Bids: {
                Bid: {
                    Bidder: {
                        Location: "",
                        Country: ""
                    },        
                    Time: "",
                    Location: ""
                }
            },
            Location: "",
            Latitude: "",
            Longitude: "",
            Country: "",
            Started: "",
            Ends: "",
            
                Rating: "",
                UserID: "",
          
            Description: ""
        }

        this.initialState = this.state;
    }

    onChangeBid = ({ target: { id, value }}) => {
        this.setState((prevState) => ({
            ...prevState,
            Bids: {
                Bid: {
                    ...prevState.Bid,
                    Bidder: {
                        ...prevState.Bids.Bid.Bidder,
                        [id]: value,
                    },
                },
            },
        }));
    };

    callBack = (countrySelect) => {
        this.setState({
            Country : countrySelect
        })
    };

    onChange = e => {
        this.setState({ [e.target.id] : e.target.value });
    };

    submitForm = e => {
        e.preventDefault();
        const {lat , lng} = this.props.coords;
        const newBid = {
            ItemID: uuidv1(),
            Name:   this.state.Name,
            Category:   this.state.Category,
            Currently:  "$" + this.state.Currently,
            Buy_Price:  "$" + this.state.Buy_Price,
            First_Bid:  "$" + this.state.First_Bid,
            Number_of_Bids:     "0",
            Location:   this.state.Location,
            Latitude:   lat,
            Longitude:  lng,
            Country:    this.state.Country,
            Started:    new Date(),
            Ends:       addDays(Math.floor((Math.random() * 10) + 1)),
            Seller:     {UserID: this.props.user.username,
                        Rating: this.props.user.rating
            },
            Description:    this.state.Description
        };

        this.props.addBid(newBid, this.props.history);
    };



    resetForm = () => {
        this.setState(this.initialState)
    };
    render() {
        return (
            <div style = {decPage}>

                <Form style = {decSignForm}>
                    <Form.Group>
                        <Form.Label><strong>Product Name</strong></Form.Label>
                        <Form.Control
                            name = "name"
                            value = {this.state.Name}
                            onChange = {this.onChange}
                            id = "Name"
                            type = "text"
                            placeholder = "Product Name"   
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label><strong>Category</strong></Form.Label>
                        <Form.Control
                            name = "category"
                            value = {this.state.Category}
                            onChange = {this.onChange}
                            id = "Category"
                            type = "text"
                            placeholder = "Category"   
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label><strong>Current Bid Price</strong></Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                            </InputGroup.Prepend>
                        <Form.Control
                            name = "currently"
                            value = {this.state.Currently}
                            onChange = {this.onChange}
                            id = "Currently"
                            type = "text"
                        />
                        </InputGroup>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label><strong>First Bid</strong></Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                name = "first_bid"
                                value = {this.state.First_Bid}
                                onChange = {this.onChange}
                                id = "First_Bid"
                                type = "text"
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label><strong>Buy Price</strong></Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                            </InputGroup.Prepend>
                        <Form.Control
                            name = "buy_price"
                            value = {this.state.Buy_Price}
                            aria-describedby="inputGroupPrepend"

                            onChange = {this.onChange}
                            id = "Buy_Price"
                            type = "text"
                        />
                        </InputGroup>

                    </Form.Group>

                    <Form.Group>
                        <Form.Label><strong>Location</strong></Form.Label>
                        <Form.Control
                            name = "location"
                            value = {this.state.Location}
                            onChange = {this.onChange}
                            id = "Location"
                            type = "text"
                            placeholder = "Location"
                        />
                    </Form.Group>
                    <label><strong>Select your location on the map</strong></label>
                    <div>
                        <GetCoordsFromMap />
                    </div>

                    <Form.Group>
                        <Form.Label><strong>Country</strong></Form.Label>
                        <CountrySelect call = {this.callBack}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="4"
                            name = "description"
                            value = {this.state.Description}
                            onChange = {this.onChange}
                            id = "Description"
                            type = "text"
                            placeholder = "Enter your description..."
                        />
                    </Form.Group>

                    <Row>
                    <Col>
                        <Button 
                            type ="submit"
                            variant="primary"
                            onClick = {this.submitForm}
                        >
                            Submit Bid
                        </Button>
                    </Col>
                    <Col>
                    <Button 
                        onClick ={this.resetForm} 
                        variant="secondary">
                        Reset Bid
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

const mapStateToProps = state => ({
    user: state.auth.user,
    coords: state.products.coords
});


export default connect(mapStateToProps, {addBid}) (withRouter(AddBid));
