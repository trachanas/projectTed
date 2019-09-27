import React from 'react'
import '../../src/App.css'
import { Button } from 'react-bootstrap'

const RequestWaiting = ({history}) => {

        const handleClick = () => {
            history.push("/welcomePage")
        }
        return (
            <div className = "request">
                <h1>Your request is being processed!</h1>
                <h2>You can continue to Main Page as visitor</h2>
                <Button onClick = {() => handleClick()} >Continue</Button>
            </div>
        )
        
};


export default RequestWaiting;