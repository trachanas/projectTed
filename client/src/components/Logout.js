import React, {Component} from 'react';
import '../App.css'

class Logout extends Component {
    render() {
        return (
            <>
                <div style={decLog}>
                    Thanks for your visit!
                </div>
            </>
        );
    }
}

const decLog = {
    fontFamily: "Alfa Slab One, cursive",
    fontSize: "100px",
    textAlign: "center",
    marginTop: "122px",
    padding: "10px",
    marginLeft: "auto",
    marginRight: "auto"
};

export default Logout;