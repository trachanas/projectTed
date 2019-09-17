import React, { Component } from 'react'
import {Form, Col, Button, Row} from 'react-bootstrap'
import uuidv1 from "uuid";
import { connect } from 'react-redux';
import { addBid } from '../actions/product-actions'
import { withRouter} from "react-router-dom"



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
    }

    onChangeSeller = () => {
        var seller = {...this.state.Seller};
        seller.UserID = "200";
        seller.Rating = "100";
        this.setState({seller})
    }
    
    onChange = e => {
        this.setState({ [e.target.id] : e.target.value });
    }

    submitForm = e => {
        e.preventDefault();

        const newBid = {
            ItemID: uuidv1(),
            Name:   this.state.Name,
            Category:   this.state.Category,
            Currently:  this.state.Currently,
            Buy_Price:  this.state.Buy_Price,
            First_Bid:  this.state.First_Bid,
            Number_of_Bids:     this.state.Number_of_Bids,
            Location:   this.state.Location,
            Latitude:   this.state.Latitude,
            Longitude:  this.state.Longitude,
            Country:    this.state.Country,
            Started:    this.state.Started,
            Ends:       this.state.Ends,
            Seller:     {UserID: this.state.UserID, 
                        Rating: this.state.Rating
            },
            Description:    this.state.Description
        };

        console.log(newBid);
        this.props.addBid(newBid, this.props.history);
    }

    resetForm = () => {
        this.setState(this.initialState)
    }
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
                        <Form.Control
                            name = "currently"
                            value = {this.state.Currently}
                            onChange = {this.onChange}
                            id = "Currently"
                            type = "text"
                            placeholder = "Current Bid Price"   
                        />
                    </Form.Group>


                    <Form.Group>
                        <Form.Label><strong>First Bid</strong></Form.Label>
                        <Form.Control
                            name = "first_bid"
                            value = {this.state.First_Bid}
                            onChange = {this.onChange}
                            id = "First_Bid"
                            type = "text"
                            placeholder = "First Bid"    
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label><strong>Buy Price</strong></Form.Label>
                        <Form.Control
                            name = "buy_price"
                            value = {this.state.Buy_Price}
                            onChange = {this.onChange}
                            id = "Buy_Price"
                            type = "text"
                            placeholder = "Buy Price"    
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label><strong>Number of Bids</strong></Form.Label>
                        <Form.Control
                            name = "buy_price"
                            value = {this.state.Number_of_Bids}
                            onChange = {this.onChange}
                            id = "Number_of_Bids"
                            type = "text"
                            placeholder = "Number of Bids"    
                        />
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
                    
                    <Form.Group>
                        <Form.Label><strong>Latitude</strong></Form.Label>
                        <Form.Control
                            name = "Latitude"
                            value = {this.state.Latitude}
                            onChange = {this.onChange}
                            id = "Latitude"
                            type = "text"
                            placeholder = "Latitude"    
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><strong>Longitude</strong></Form.Label>
                        <Form.Control
                            name = "Longitude"
                            value = {this.state.Longitude}
                            onChange = {this.onChange}
                            id = "Longitude"
                            type = "text"
                            placeholder = "Longitude"    
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label><strong>Country</strong></Form.Label>
                        <Form.Control
                            name = "country"
                            value = {this.state.Country}
                            onChange = {this.onChange}
                            id = "Country"
                            type = "text"
                            placeholder = "Country"    
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label><strong>Bid started at:</strong></Form.Label>
                        <Form.Control
                            name = "started"
                            value = {this.state.Started}
                            onChange = {this.onChange}
                            id = "Started"
                            type = "text"
                            placeholder = " "    
                        />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label><strong>Bid ends at:</strong></Form.Label>
                        <Form.Control
                            name = "ends"
                            value = {this.state.Ends}
                            onChange = {this.onChange}
                            id = "Ends"
                            type = "text"
                            placeholder = " "    
                        />
                    </Form.Group>
                    <label><strong>Seller</strong></label>
                    <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control 
                            name = "rating"
                            value = {this.state.Rating}
                            onChange = {this.onChange}
                            id = "Rating"
                            type = "text"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>UserID</Form.Label>
                        <Form.Control 
                            name = "userID"
                            value = {this.state.UserID}
                            onChange = {this.onChange}
                            id = "UserID"
                            type = "text"
                        />
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



export default connect(null, {addBid}) (withRouter(AddBid));
