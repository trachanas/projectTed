import React, { useEffect } from 'react'
import { connect } from "react-redux";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { fetchProducts } from "../actions/product-actions";
import {Accordion, Card, Button} from 'react-bootstrap'


const WelcomePage = ({ fetchProducts, products = [], history }) => {
    

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    console.log(history)

    const handleClick = (id) => {
        history.push("/product");
    };

    //const names = products.map(item => item.Name)
   /// console.log(names)
    // names.forEach(item =>
    //     console.log(item)
    // )

    const columns = [{
        Header: 'Product Name',
        accessor: ''
    }]

    return (
        <div>
            <ul>
                {products.map( item => {
                    return(
                     <div style = {box} key = {item.ItemID} onClick={() => handleClick(item.ItemID)}><h4>{item.Name}</h4></div>
                    )
                })}
            </ul>    
        </div>
    )
};


//onClick={() => handleClick(item.ItemID)}
const mapStateToProps = (state) => ({ products: state.products.data });

const mapDispatchToProps = { fetchProducts };

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
 {/* <ul>
                {products.map((item) => (
                    <li key={item.ItemID} onClick={() => handleClick(item.ItemID)}>{item.Name}</li>
                ))}
            </ul> */}


const box = {
    border : "1px solid black"
}