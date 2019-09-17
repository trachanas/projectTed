import React  from 'react';
import {connect} from 'react-redux';
import '../App.css';
import { Button } from 'react-bootstrap';
import { Tab, Tabs } from 'react-bootstrap-tabs';
import { setCoords , updateElement} from "../actions/product-actions";


const Product = ({  item = {}, history, setCoords  }) => {
    //console.log(item);
    
    var categories  = []
    var bids = []
    var bid = {}
    console.log(item);
    const handleClick = () => {
        setCoords(coords)
        history.push("/openMap");
    };

    const update = (id) => {
        updateElement(id);
    };

    item.Category.forEach(element => {
        categories.push(element)
    });

    var buyPrice = item.Buy_Price === undefined ? "None" : item.Buy_Price;

    item.Bids.forEach(element => {
        bid = {
            Location: element.Location,
            Country: element.Country,
            Amount: element.Amount,
            Time: element.Time,
            UserID: element.UserID,
            Rating: element.Rating
        }
        bids.push(bid);
    });
    

    const enabledButton = item.Longitude !== "0" && item.Latitude !== "0"
    
    console.log(item)
    var seller = {};
    item.Seller.forEach(e => {
        seller = {
            Rating: e.Rating,
            UserID: e.UserID
        }
    })

    const coords = {
        Latitude: item.Latitude,
        Longitude: item.Longitude
    }

    
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
                        <li><strong>Current price: </strong> {item.Currently}</li>
                        <li><strong>Bid started: </strong> {item.Started}</li>
                        <li><strong>Bid ends: </strong> {item.Ends}</li>
                        <li><strong>Country: </strong> {item.Country}</li>
                        <li><strong>Location: </strong>{item.Location}</li>  
                        <li><strong>Position: </strong>{item.Latitude} , {item.Longitude}</li>  
                        <li><strong>Seller: </strong>UserID: {seller.UserID} , Rating: {seller.Rating}</li>                 
                    </ul>

                    <Button   disabled = {!enabledButton} onClick={() => handleClick(coords)}>Open Map</Button>

                </Tab>
                
                <Tab label = "Description">{item.Description}</Tab>
                <Tab label = "Deposit Bid">

                    <Button onClick = {() => update(item.ItemID)} >Deposit Button</Button>


                </Tab>
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

const mapStateToProps = state =>  ({item : state.products.item})

const mapDispatchToProps = { setCoords, updateElement };


//const mapStateToProps = (state) => ({ products: state.products.data });

export default connect(mapStateToProps,  mapDispatchToProps)(Product);

