const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = validateAddBid = data => {
    let errors = {};

    data.ItemID = !isEmpty(data.ItemID) ? data.ItemID: "";
    data.Name = !isEmpty(data.Name) ? data.Name: "";
    data.Category = !isEmpty(data.Category) ? data.Category: "";
    data.Currently = !isEmpty(data.Currently) ? data.Currently: "";
    data.First_Bid = !isEmpty(data.First_Bid) ? data.First_Bid: "";
    data.Number_of_Bids = !isEmpty(data.Number_of_Bids) ? data.Number_of_Bids: "";
    data.Bids = !isEmpty(data.Bids) ? data.Bids: "";
    data.Location = !isEmpty(data.Location) ? data.Location: "";
    data.Country = !isEmpty(data.Country) ? data.Country: "";
    data.Started = !isEmpty(data.Started) ? data.Started: "";
    data.Ends = !isEmpty(data.Ends) ? data.Ends: "";
    data.Seller = !isEmpty(data.Seller) ? data.Seller: "";
    data.Description = !isEmpty(data.Description) ? data.Description: "";
     

    if (Validator.isEmpty(data.ItemID)) {
        errors.ItemID = "ItemID field is required!";
    }

    if (Validator.isEmpty(data.Name)) {
        errors.Name = "Name field is required!";
    }

    if (Validator.isEmpty(data.Category)) {
        errors.Category = "Category field is required!";
    }

    if (Validator.isEmpty(data.Currently)) {
        errors.Currently = "Currently field is required!";
    } else if(!Validator.isNumeric(data.Currently)){
        errors.Currently = "Currently field must contain only digits!";
    } else if (data.Currently <= 0){
        errors.Currently = "Currently must be a positive number!";
    }
    
    if (Validator.isEmpty(data.First_Bid)) {
        errors.First_Bid = "First Bid field is required!";
    }else if(!Validator.isNumeric(data.First_Bid)){
        errors.First_Bid = "First Bid field must contain only digits!";
    } else if (data.Currently <= 0){
        errors.First_Bid = "First Bid must be a positive number!";
    }

    if (Validator.isEmpty(data.Location)) {
        errors.Location = "Location field is required!";
    }

    if (Validator.isEmpty(data.Country)) {
        errors.Country = "Country field is required!";
    }

    if (Validator.isEmpty(data.Started)) {
        errors.Started = "Started field is required!";
    }

    if (Validator.isEmpty(data.Ends)) {
        errors.Ends = "Ends field is required!";
    }


    // if (Validator.isEmpty(data.Seller)) {
    //     errors.Seller = "Seller field is required!";
    // }

    if (Validator.isEmpty(data.Description)) {
        errors.Description = "Description field is required!";
    }


    return{
        errors, isValid: isEmpty(errors)
    };
};


