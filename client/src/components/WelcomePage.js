import React, { useEffect } from 'react'
import { connect } from "react-redux";

import { fetchProducts } from "../actions/product-actions";

const WelcomePage = ({ fetchProducts, products = [], history }) => {
    
    console.log(products)
    
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleClick = (id) => {
        history.push(id);
    };

    return (
        <div>
            <h1>This is the WelcomePage</h1>
            {/* <ul>
                {products.map((item) => (
                    <li key={item.ItemID} onClick={() => handleClick(item.ItemID)}>{item.Name}</li>
                ))}
            </ul> */}
        </div>
    )
};

const mapStateToProps = (state) => ({ products: state.products.data });

const mapDispatchToProps = { fetchProducts };

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
