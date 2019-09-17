const express = require("express");
const router = express.Router();
const key = require("../../config/keys");
const validateAddBid = require("../../validation/addBid");


const Data = require("../../models/Products")
const db = key.mongoURI;



// db.Employee.update(
//     {"Employeeid" : 1},
//     {$set: { "EmployeeName" : "NewMartin"}});

router.post("/addBid", (req , res) => {
    console.log("Eimaste edw");
    
    console.log(req.body);

    const { errors , isValid } = validateAddBid(req.body); 

    if (!isValid){
        return res.status(400).json(errors);
    }

    const newBid = new Data ({
        ItemID: req.body.ItemID,
        Name:   req.body.Name,
        Category: req.body.Category,
        Currently: req.body.Currently,
        First_Bid: req.body.First_Bid,
        Number_of_Bids: req.body.Number_of_Bids,
        Bids: [],
        Location: req.body.Location,
        Country: req.body.Country,
        Started: req.body.Started,
        Ends: req.body.Ends,
        Seller: req.body.Seller,
        Description: req.body.Description
    })

    newBid.save().then(bid => res.json(bid)).catch(err => console.log(err));
    
})




module.exports = router;
