import React, {useState}  from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import '../../App.css'
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import {  showActiveBids, searchText } from "../../actions/product-actions";

import { Navbar, Nav, Form, Button, FormControl, Dropdown } from 'react-bootstrap'


const NavigationBar = ({  item = {}, history, searchText, showActiveBids , user}) => {
  
    const showBids = (activeBids) => {
      showActiveBids(activeBids);
      history.push("/showActiveBids");
    };

    const [inputText , setValue] = useState("");

    const handleInput = ({target: {value}}) => setValue(value);
    
    const handleClick = text => searchText({ Name: text});
    const test = () => 2
    return (
        <div>
            <Navbar bg = "dark" variant = "dark">
            <Navbar.Brand href="/welcomePage">ANGE</Navbar.Brand>
               <Nav className="mr-auto">
               {user ? 
                <div>
                  {user}
                  <Nav.Link href="/logout">logout</Nav.Link>
                </div>
               :
                <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                </>
                }
              </Nav>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Bids
                </Dropdown.Toggle>
              {test()}
                <Dropdown.Menu>
                  <Dropdown.Item disabled = {!user} href = "/addBid">Add Bid</Dropdown.Item>
                  {user && <Dropdown.Item  >Active Bids</Dropdown.Item>}
                  <Dropdown.Item href = "/advancedSearch">Advanced Search</Dropdown.Item>
                </Dropdown.Menu>

               
              </Dropdown>

              <Form inline>
                <FormControl onChange = {handleInput} value = {inputText} type="text" placeholder="Search" className="mr-sm-2"  />
                <Button  onClick = {() => handleClick(inputText) }variant="outline-info">Search</Button>
              </Form>
            </Navbar>
        </div>
    )}
    


const mapDispatchToProps = { showActiveBids, searchText };


const mapStateToProps = state =>  ({item : state.products.activeBids, user: state.auth.user.name})

export default connect(mapStateToProps , mapDispatchToProps)(withRouter(NavigationBar));


