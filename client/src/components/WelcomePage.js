import React, { useEffect } from 'react'
import { connect } from "react-redux";
import 'react-table/react-table.css';
import ReactTable from "react-table";
import {Button} from "react-bootstrap";
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

    let activeBids = [];

    products.forEach((product) => {
        if (myMoment < moment(product.Ends) ){
            activeBids.push(product)
        }
    });

    showActiveBids(activeBids);

    const columns = [{
        Header: <strong style={{color: "#000000", fontFamily: "Montserrat, sans-serif"}}>Product name</strong>,
        accessor: 'Name',
    }, {
        Header: <strong style={{color: "#000000", fontFamily: "Montserrat, sans-serif"}}>Item ID</strong>,
        accessor: 'ItemID',
     },
        { Cell: ({original: data}) => {
              //  console.log(data);
            return (
                //<Button  onClick = {() => handleClick(inputText)} variant="outline-info">Search</Button>
                <Button onClick={() => handleClick(data)} variant = "info">Details</Button>
               // <button onClick={() => handleClick(original)}>Details</button>
            )
        }
    }

    ];
    return (

        <div>
            <ReactTable
                style={{textAlign: "center"}}
                data = {products}
                columns={columns}
            />
                {/*{products.map( item => {*/}
                {/*    return(*/}


                {/*    )*/}
                {/*})}*/}

        </div>
    )
};


const mapStateToProps = (state) => ({ products: state.products.data, UserID: state.auth.user._id  });

const mapDispatchToProps = { fetchProd: fetchProducts , setOneProduct, showActiveBids, addToHistory };
//const mapDispatchToProps = (dispatch) => ({ ac: (asd) => dispatch(fetchProducts(asd)) }) //{ fetchProd: fetchProducts , setOneProduct };

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);

