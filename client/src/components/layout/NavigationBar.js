import React, { useState }  from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import '../../App.css'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {  showActiveBids, searchText, showRecommended, showMessages, getMessages } from "../../actions/product-actions";
import {  setUserInfo, setCurrentUser } from "../../actions/authActions";
import { Navbar, Nav, Form, Button,  Dropdown } from 'react-bootstrap'


const NavigationBar = ({  item = {}, history, searchText, showActiveBids , user, setCurrentUser , showRecommended, getMessages}) => {
  
    const showBids = (activeBids) => {
      showActiveBids(activeBids);
      history.push("/showActiveBids");
    };

    const [inputText , setValue] = useState("");

    const handleInput = ({target: {value}}) => setValue(value);

    const handleAddBid = (user) => {
        history.push("/addBid");
    };

    const handleClick = text => {
        searchText({ Name: text });
    };

    const showMes = () => {
        getMessages({ user });
        setTimeout(()=>{
            history.push("/messages");

        }, 2000)
    };

    const showRec = () => {
        showRecommended(user._id);
        history.push("/recommend");
    };

    const setUser = (user) => {
        setCurrentUser(user);
    };

    return (
        <div>
            <Navbar bg = "dark" variant = "dark">
            <Navbar.Brand onClick = {() => setUser(user)} href="/welcomePage">ANGE</Navbar.Brand>
               <Nav className="mr-auto">
               {user.username ?
                <div>
                    <div style={{color : "#FFFFFFFF"}}>{user.username}</div>
                    <Nav.Link href="/logout">Logout</Nav.Link>
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
                <Dropdown.Menu>
                  <Dropdown.Item disabled = {!user.username} onClick = {() => handleAddBid(user)}>Add Bid</Dropdown.Item>
                  {user && <Dropdown.Item  onClick = {() => showBids(item)}>Active Bids</Dropdown.Item>}
                  <Dropdown.Item href = "/advancedSearch">Advanced Search</Dropdown.Item>
                  <Dropdown.Item onClick = {() => showRec()} >Recommended Products</Dropdown.Item>
                    {user && <Dropdown.Item onClick = {() => showMes()}>My messages</Dropdown.Item>}
                    {/*<Dropdown.Item onClick = {() => exportBids()}>Export Bids to XML</Dropdown.Item>*/}
                </Dropdown.Menu>
              </Dropdown>

              <Form inline>
                <Form.Control onChange = {handleInput} value = {inputText} type="text" placeholder="Search" className="mr-sm-2"  />
                <Button onClick = {() => handleClick(inputText)} variant="outline-info">Search</Button>
              </Form>
            </Navbar>
        </div>
    )};
    


const mapDispatchToProps = { showActiveBids, searchText , setUserInfo, setCurrentUser, showRecommended, showMessages, getMessages};

const mapStateToProps = state =>  ({item : state.products.activeBids, user: state.auth.user});

export default connect(mapStateToProps , mapDispatchToProps)(withRouter(NavigationBar));


