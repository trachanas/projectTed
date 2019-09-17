import React  from 'react';
import {connect} from 'react-redux';
import '../App.css';
import {  setOneProduct  } from "../actions/product-actions";
import {  ListGroup } from 'react-bootstrap'



const ShowActiveBids = ({  item = {} , setOneProduct, history }) => {
    console.log(item)
    //props.item

    const handleClick = (item) => {
        setOneProduct(item);
        history.push("/product");
    };

    return (
        <div>
            <ul>
                {item.map( product => {
                    return(
                        <ListGroup key = {product.ItemID} variant = "Info">
                            <ListGroup.Item onClick={() => handleClick(product)}>{product.Name}</ListGroup.Item>
                        </ListGroup>
                    )
                })}
            </ul>    
           
        </div>
    );
}


const mapStateToProps = state =>  ({ item : state.products.activeBids })
const mapDispatchToProps = {setOneProduct};


export default connect( mapStateToProps, mapDispatchToProps )(ShowActiveBids);
