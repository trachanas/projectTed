import React, { useEffect } from 'react'
import { connect } from "react-redux";
import 'react-table/react-table.css';
import {  ListGroup } from 'react-bootstrap'
import { fetchProducts , setOneProduct , showActiveBids } from "../actions/product-actions";
const  moment = require('moment');

const WelcomePage = ({ fetchProd, setOneProduct, showActiveBids, products = [], history,  }) => {

    useEffect(() => {
        fetchProd();
    }, [fetchProd]);

    const handleClick = (item) => {
        setOneProduct(item);
        history.push("/product");
    };

    // const columns = [{
    //     Header: 'Product Name',
    //     accessor: ''
    // }]

    

    var myMoment  = moment("Sun Dec 16 2001 18:27:30 GMT+0200");

    let activeBids = []


    products.forEach((product) => {
        if (myMoment < moment(product.Ends) ){
            activeBids.push(product)
        }
    })
    

    showActiveBids(activeBids)
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


const mapStateToProps = (state) => ({ products: state.products.data });

const mapDispatchToProps = { fetchProd: fetchProducts , setOneProduct, showActiveBids };
//const mapDispatchToProps = (dispatch) => ({ ac: (asd) => dispatch(fetchProducts(asd)) }) //{ fetchProd: fetchProducts , setOneProduct };

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);

