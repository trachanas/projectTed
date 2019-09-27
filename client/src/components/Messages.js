import React  from 'react';
import {connect} from 'react-redux';
import {ListGroup} from "react-bootstrap";



const Messages = ({myMes = {}, m}) => {

        console.log(myMes);
        let rec = myMes.length === 0 ? "" : myMes[0].receiver;
        return (
            <div>
                <h2>Received messages for: {rec}</h2>

                {myMes.map((i) => {

                    return (

                        <>
                        <ListGroup variant = "Info">
                            <ListGroup.Item><strong>From User: {i.sender}</strong> {i.message}  </ListGroup.Item>
                        </ListGroup>
                        </>
                    )
                })}
            </div>
        );
    }


const mapStateToProps = (state) => ({ myMes: state.products.myMes , m: state.products.myMes.receiver})

//const mapStateToProps = (state) => ({ products: state.products.data });


export default connect(mapStateToProps,null)(Messages);
