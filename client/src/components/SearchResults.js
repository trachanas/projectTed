import React from 'react'
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { fetchProducts , setOneProduct , showActiveBids } from "../actions/product-actions";


const SearchResults = ({products , setOneProduct, history}) => {
    
    const handleClick = (item) => {
        setOneProduct(item);
        history.push("/product")
    };
    
    let results = [];
   
    if (products !== undefined){        
        results = products;
    }

    return (
        <div>
            <ul>
                {results.map( item => {
                    return(
                        <ListGroup key = {item.ItemID} variant = "Info">
                            <ListGroup.Item onClick={() => handleClick(item)}>{item.Name}</ListGroup.Item>
                        </ListGroup>
                    )
                })}
            </ul>   
        </div>
    )
}



const mapStateToProps = (state) => ({ products: state.products.data });
const mapDispatchToProps = { fetchProd: fetchProducts , setOneProduct, showActiveBids };

export default connect(mapStateToProps , mapDispatchToProps )(SearchResults);

