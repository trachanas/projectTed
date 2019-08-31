const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.surname = !isEmpty(data.surname) ? data.surname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.telephoneNumber = !isEmpty(data.telephoneNumber) ? data.telephoneNumber : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.zipCode = !isEmpty(data.zipCode) ? data.zipCode : "";
  data.vatNumber = !isEmpty(data.vatNumber) ? data.vatNumber : "";
  data.creditCardNumber = !isEmpty(data.creditCardNumber) ? data.creditCardNumber : "";


  // Username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required!";
  }

  // Password checks
  if (Validator.isEmpty(data.password)){
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  //Password confirm
  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Confirm password field is required";
  }

  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Passwords must match";
  }
  
  // Name confirm
  if (Validator.isEmpty(data.name)){
    errors.name = "Name field is required!";
  }

  // Surname confirm
  if (Validator.isEmpty(data.surname)){
    errors.surname = "Surname field is required!";
  }

// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

// Telephone number check
  if (Validator.isEmpty(data.telephoneNumber)){
    errors.telephoneNumber = "Telephone Number field is required!";
  }

  // Country check
  if (Validator.isEmpty(data.country)){
    errors.country = "Country field is required!";
  }

  // City check
  if (Validator.isEmpty(data.city)){
    errors.city = "City field is required!";
  }

  // Zip code check
  if (Validator.isEmpty(data.zipCode)){
    errors.zipCode = "Zip code field is required!";
  }

  // Country check
  if (Validator.isEmpty(data.vatNumber)){
    errors.vatNumber = "VAT Number field is required!";
  }

  // Credit card number
  if (Validator.isEmpty(data.creditCardNumber)){
    errors.creditCardNumber = "Credit card number field is required!";
  }


return {
    errors,
    isValid: isEmpty(errors)
  };
};