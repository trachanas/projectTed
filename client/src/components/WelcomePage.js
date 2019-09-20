import React, { useEffect } from 'react'
import { connect } from "react-redux";
import 'react-table/react-table.css';
import {  ListGroup } from 'react-bootstrap'
import { fetchProducts , setOneProduct , showActiveBids, addToHistory } from "../actions/product-actions";
const  moment = require('moment');

const WelcomePage = ({ fetchProd, setOneProduct, showActiveBids, products = [], history, UserID  }) => {

    useEffect(() => {
        fetchProd();
    }, [fetchProd]);

    const handleClick = (item) => {
        addToHistory({UserID, productID: item._id} );
        setOneProduct(item);
        history.push("/product");
    };

    var myMoment  = moment(Date());

    let activeBids = []


    products.forEach((product) => {
        if (myMoment < moment(product.Ends) ){
            activeBids.push(product)
        }
    })
    

    showActiveBids(activeBids);
    
    return (
        <div>
            <ul>
                {products.map( item => {
                    return(
                        <ListGroup key = {item.ItemID} variant = "Info">
                            <ListGroup.Item onClick={() => handleClick(item)}>{item.Name}</ListGroup.Item>
                        </ListGroup>
                    )
                })}
            </ul>    
        </div>
    )
};


const mapStateToProps = (state) => ({ products: state.products.data, UserID: state.auth.user.id  });

const mapDispatchToProps = { fetchProd: fetchProducts , setOneProduct, showActiveBids, addToHistory };
//const mapDispatchToProps = (dispatch) => ({ ac: (asd) => dispatch(fetchProducts(asd)) }) //{ fetchProd: fetchProducts , setOneProduct };

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);

