import React, {useState} from 'react';
import {connect} from 'react-redux';
import '../App.css';
import {Button, Form, Accordion, Card, InputGroup} from 'react-bootstrap';
import { Tab, Tabs } from 'react-bootstrap-tabs';
import { setCoords , updateElement} from "../actions/product-actions";


const Product = ({  item = {}, history, setCoords, user, updateElement  }) => {

    var categories = [];
    var bids = [];
    var bid = {};

    const handleClick = () => {
        setCoords(coords);
        history.push("/openMap");
    };

    const [amount, setValue] = useState("");

    const handleInput = ({target: {value}}) => {
        setValue(value);
    };

    item.Category.forEach(element => {
        categories.push(element)
    });

    var buyPrice = item.Buy_Price === undefined ? "None" : "$ " + item.Buy_Price;

    item.Bids.forEach(element => {
        bid = {
            Location: element.Location,
            Country: element.Country,
            Amount: element.Amount,
            Time: element.Time,
            UserID: element.UserID,
            Rating: element.Rating
        };
        bids.push(bid);
    });

    const handleForm = () => {

        const Bid = [{
            Rating: user.rating,
            UserID: user.username,
            Location: user.city,
            Country: user.country,
            Time: new Date(),
            Amount: amount
        }];

        const newBid = {
            Bid: Bid,
            ItemID: item.ItemID
        }

        updateElement(newBid);
        history.push("/welcomePage");
    };

    const enabledButton = item.Longitude !== "0" && item.Latitude !== "0"

    let seller = {};
    item.Seller.forEach(e => {
        seller = {
            Rating: e.Rating,
            UserID: e.UserID
        }
    });

    const coords = {
        Latitude: item.Latitude,
        Longitude: item.Longitude
    };

    let bidLength ;
    if (bids.length === 0){
        bidLength = 0;
    }
    console.log(item.ItemID);
    return (
        <div>
           <h1 className = "decTabs" > {item.Name} </h1>
           <Tabs>
                <Tab label = "Product Details">
                    <ul>
                        <li><strong>Category: </strong>{categories.toString()}</li>
                        <li><strong>Item ID: </strong>{item.ItemID}</li>
                        <li><strong>Number of bids: </strong>{item.Number_of_Bids}</li>
                        <li><strong>Buy Price: </strong>{buyPrice}</li>
                        <li><strong>First Bid: </strong>$ {item.First_Bid}</li>
                        <li><strong>Current price: </strong>$ {item.Currently}</li>
                        <li><strong>Bid started: </strong> {item.Started}</li>
                        <li><strong>Bid ends: </strong> {item.Ends}</li>
                        <li><strong>Country: </strong> {item.Country}</li>
                        <li><strong>Location: </strong>{item.Location}</li>
                        <li><strong>Position: </strong>{item.Latitude} , {item.Longitude}</li>
                        <li><strong>Seller: </strong>UserID: {seller.UserID} , Rating: {seller.Rating}</li>
                    </ul>

                    <Button disabled = {!enabledButton} onClick={() => handleClick(coords)}>Open Map</Button>
                    {user.username && <Accordion style = {decSignForm} defaultActiveKey="1">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} style = {{fontSize: "30px"}}variant="link" eventKey="0">
                                    Deposit Bid
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                    name = "amount"
                                                    value = {amount}
                                                    onChange = {handleInput}
                                                    id = "amount"
                                                    type = "text"
                                                    placeholder = "How much do you want to pay?"
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </Form>

                                    <Button  onClick = {() => handleForm()}>Deposit here</Button>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>}
                </Tab>

                <Tab label = "Description">{item.Description}</Tab>

                <Tab label = "Bid Details"> {
                    bidLength === 0 ? <li key = "0">None</li> : bids.map(e=>(
                        <li key = {e.Time}>
                        Country: {e.Country} Location: {e.Location} Time: {e.Time} Amount: {e.Amount} UserID: {e.UserID} Rating: {e.Rating}
                        </li>
                    )) }</Tab>
            </Tabs>
        </div>
    )
}

const mapStateToProps = state =>  ({item : state.products.item,
                                    user : state.auth.user
})

const mapDispatchToProps = { setCoords, updateElement };


//const mapStateToProps = (state) => ({ products: state.products.data });

const decSignForm = {
    fontSize: "25px",
    marginTop: "20px",
    padding: "15px 15px 150px 15px",
    marginLeft: "auto",
    textAlign: "center",
    marginRight: "auto",
    width: "40%"
}

// const decPage = {
//     borderBottom: "1px solid grey"
// }

export default connect(mapStateToProps,  mapDispatchToProps)(Product);

