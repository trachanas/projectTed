import React, { Component } from 'react'
import {Form, Col, Button, Row} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { searchText , setProducts } from "./../actions/product-actions";

class AdvancedSearch extends Component {
    
    constructor() {
        super();
        this.state = {
            Name: "", 
            Category: "",
            Description: "",
            Price: "",
            Location: ""
        }

        this.initialState = this.state;
    }     


    onChange = e => {
        this.setState({[e.target.id] : e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();

        const searchDetails = {
            Name: this.state.Name,
            Category: this.state.Category,
            Description: this.state.Description,
            Price: this.state.Price,
            Location: this.state.Location
        }

        console.log(searchDetails);
        if (this.state.Category === ""){
            this.props.searchText({Name: searchDetails.Name})
        } 
        else {
            this.props.searchText({
                Name: searchDetails.Name,
                Category: searchDetails.Category,
                Description: searchDetails.Description,
                Price:  searchDetails.Price,
                Location: searchDetails.Location,
            });
        }
        
        this.props.history.push("/searchResults");

    }

    resetForm = () => {
        this.setState(this.initialState)
    }

    render() {
        return (
            <div>
                <Form onSubmit = {this.onSubmit} style = {decSignForm}>
                    <Form.Group>
                            <Form.Label><strong>Name</strong></Form.Label>
                            <Form.Control
                                name = "Name"
                                value = {this.state.Name}
                                onChange = {this.onChange}
                                id = "Name"
                                type = "text" 
                                placeholder = "Name" />

                    </Form.Group>

                    <Form.Group>
                            <Form.Label><strong>Category</strong></Form.Label>
                            <Form.Control
                                name = "Category"
                                value = {this.state.Category}
                                onChange = {this.onChange}
                                id = "Category"
                                type = "text" 
                                placeholder = "Category" />
                    </Form.Group>



                    <Form.Group>
                            <Form.Label><strong>Description</strong></Form.Label>
                            <Form.Control
                                name = "Description"
                                value = {this.state.Description}
                                onChange = {this.onChange}
                                id = "Description"
                                type = "text" 
                                placeholder = "Description" />
                    </Form.Group>

                    <Form.Group>
                            <Form.Label><strong>Price</strong></Form.Label>
                            <Form.Control
                                name = "Price"
                                value = {this.state.Price}
                                onChange = {this.onChange}
                                id = "Price"
                                type = "text" 
                                placeholder = "Price" />
                    </Form.Group>


                    <Form.Group>
                            <Form.Label><strong>Location</strong></Form.Label>
                            <Form.Control
                                name = "Location"
                                value = {this.state.Location}
                                onChange = {this.onChange}
                                id = "Location"
                                type = "text" 
                                placeholder = "Location" />

                    </Form.Group>


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




const mapDispatchToProps = { searchText , setProducts };

export default connect(null , mapDispatchToProps)(withRouter(AdvancedSearch));


