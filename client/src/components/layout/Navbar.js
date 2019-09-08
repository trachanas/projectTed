import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import cart from './cart.png'
import '../../App.css'
import styled from 'styled-components'
import { Input } from 'mdbreact'

{/* <div class="container">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div> */}




export class Navbar extends Component {
    render() {
        return (
            <div>
                <NavWrap className = "navbar navbar-expand-sm navbar-dark-px-sm-5">
               
             
                <ul className = "nav-item">
                        <Link to="/welcomePage" >
                            <img
                                src = {cart}
                                alt = "Homepage"
                                className = "navbar-brand" />    
                        </Link> 
                </ul>
                <button className = "ml-auto">this is a button</button>

                
                <Link to = "/login" className = "ml-auto">
                    <RegisterButton>Login</RegisterButton>
                </Link>
 

                <Link to = "/register">
                    <RegisterButton>Register</RegisterButton>
                </Link>


                <Link to = "/addBid" >
                    <RegisterButton>Add Bid</RegisterButton>
                </Link>
            </NavWrap>
            </div>
        )
    }
}


// const decRegisterButton = {
//     fontFamily: "Courier",
//     fontSize: "1.3rem",
//     background: "transparent",
//     border: "0.05rem solid",
//     borderColor: "var(--lightBlue)",
//     borderRadius: "0.45rem",
//     padding: "0.2rem 0.5rem",
//     cursor: "pointer",
//     margin: "0.2rem 0.5rem 0.2rem 0",
//     transition: "all 0.5s ease-in-out",
//     '&:hover': {
//         background : "var(--lightBlue)"
//     },
//     '&:focus' : {
//         outline : "none"
//     }
// };

// const decNavWrap = {
//     background: "var(--mainBlue)",
//     '.nav-link' : {
//         color: "var(--mainWhite) !important",
//         fontSize: "1.3 rem"
//     }
// }

const NavWrap = styled.nav`
    background: var(--mainBlue);
    .nav-link{
        color: var(--mainWhite) !important;
        font-size: 1.3 rem; 
    }
`
const RegisterButton = styled.button`
    font-size: 1.3rem;
    background: transparent;
    border: 0.05rem solid;
    color: #FFFFFF,
    padding: "0.2rem 0.5rem",
    border-color: var(--lightBlue);
    border-radius: 0.45rem;
    cursor: pointer;
    margin: "0.2rem 0.5rem 0.2rem 0",

    transition: all 0.5s ease-in-out;
    &:hover {
        background: var(--lightBlue)
    }
    &:focus {
        outline: none
    }
`;

export default Navbar;
