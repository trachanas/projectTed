import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import cart from './cart.png'
import '../../App.css'
import styled from 'styled-components'

export class Navbar extends Component {
    render() {
        return (
            <div>
                <NavWrap className = "navbar navbar-expand-sm navbar-dark-px-sm-5">
                <ul class = "nav-item">
                <a class = "nav-link"> <Link to="/welcomePage">
                    <img
                        src = {cart}
                        alt = "Homepage"
                        className = "navbar-brand" 
                    />    
                </Link> 
                </a>
                </ul>
                <Link to = "/login" className = "ml-auto">
                    <RegisterButton>
                       
                        Login
                    </RegisterButton>
                </Link>
  {/* <li class="nav-item">
    <a class="nav-link active" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#">Disabled</a>
  </li>
</ul> */}

                <Link to = "/register" >
                    <RegisterButton>
                        
                        Register
                    </RegisterButton>
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
    font-family: Courier;
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
