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
    errors.username = "Username field is required";
  } else if (!Validator.isLength(data.username, {min: 6, max: 60})) {
    errors.username = "Username must be at least 6 characters";
  }

  // Password checks
  if (Validator.isEmpty(data.password)){
    errors.password = "Password field is required!";
  }

  let matches = data.password.match(/\d+/g);

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters!";
  }else if (matches == null){
    errors.password = "Password must contain at least one digit!";
  }

  //Password confirm
  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "You have to type the password again!";
  }

  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Passwords must match!";
  }
  
  // Name confirm
  if (Validator.isEmpty(data.name)){
    errors.name = "Name field is required!";
  } else if (!Validator.isAlpha(data.name)) {
    errors.name = "Name must contain only letters!"
  }

  // Surname confirm
  if (Validator.isEmpty(data.surname)){
    errors.surname = "Surname field is required!";
  } else if (Validator.isAlpha(data.surname)) {
    errors.surname = "Surname must contain only letters!"
  }

// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required!";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid!";
  }

// Telephone number check
  if (Validator.isEmpty(data.telephoneNumber)){
    errors.telephoneNumber = "Telephone number field is required!";
  } else if (!Validator.isNumeric(data.telephoneNumber)) {
    errors.name = "Telephone number must contain only digits!"
  } else if (!Validator.isLength(data.telephoneNumber,{ min: 10, max: 10 } )) {
    errors.name = "Telephone number must contain only 10 digits!"
  }

  // Country check
  if (Validator.isEmpty(data.country)){
    errors.country = "Country field is required!";
  }

  // City check
  if (Validator.isEmpty(data.city)){
    errors.city = "City field is required!";
  } else if (!Validator.isAlpha(data.city)) {
    errors.name = "City field must contain only letters!"
  }

  // Zip code check
  if (Validator.isEmpty(data.zipCode)){
    errors.zipCode = "Zip code field is required!";
  } else if (!Validator.isNumeric (data.zipCode)) {
    errors.zipCode = "Zip code must contain only digits!"
  } else if (!Validator.isLength(data.zipCode, { min: 5, max: 5 } )) {
    errors.zipCode = "Zip code must contain only 5 digits!"
  }

  // VAT Number check
  if (Validator.isEmpty(data.vatNumber)){
    errors.vatNumber = "VAT Number field is required!";
  }else if (!Validator.isNumeric(data.vatNumber)) {
    errors.name = "VAT Number must contain only digits!"
  } else if (!Validator.isLength(data.telephoneNumber,{ min: 10, max: 10 } )) {
    errors.name = "VAT number must contain 10 digits!"
  }

  // Credit card number

  let matches2 = data.creditCardNumber.match(/[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4}/);

  if (Validator.isEmpty(data.creditCardNumber)) {
    errors.creditCardNumber = "Credit card number field is required!";
  } else if (Validator.matches(data.creditCardNumber,/[0-9]{4}-{0,1}[0-9]{4}-{0,1}[0-9]{4}-{0,1}[0-9]{4}/ )) {
    errors.creditCardNumber = "Wrong format!";
  }



return {
    errors,
    isValid: isEmpty(errors)
  };
};