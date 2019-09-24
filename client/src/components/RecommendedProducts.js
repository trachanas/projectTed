import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Button} from "react-bootstrap";
import ReactTable from "react-table";
import {ListGroup} from "react-bootstrap";
import {addToHistory, fetchProducts, setOneProduct, showActiveBids} from "../actions/product-actions";

class RecommendedProducts extends Component {

    render() {
        console.log(this.props.rec);
        let ret = [];
        this.props.rec.forEach((v) => {
            ret.push(v)
        });

        const handleClick = (item) => {
            //addToHistory({UserID, productID: item._id} );
            this.props.setOneProduct(item);
            this.props.history.push("/product");
         };

        return (
            <div>
                {ret.map((item) => {
                    return(
                        <ListGroup key = {item.ItemID} variant = "Info">
                            <ListGroup.Item onClick={() => handleClick(item)}>{item.Name}</ListGroup.Item>
                        </ListGroup>
                    );
                })}
            </div>
        );
    }
}

//const mapStateToProps = state =>  ({item : state.products.activeBids, user: state.auth.user});
const mapDispatchToProps = { fetchProd: fetchProducts , setOneProduct, showActiveBids, addToHistory };

const mapStateToProps = state =>  ({ rec: state.products.recP });

export default connect(mapStateToProps , mapDispatchToProps)(withRouter(RecommendedProducts));
