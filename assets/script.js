// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  //Save the new password (created in 'generatePassword()') into a variable called 'password'
  var password = generatePassword();
  //Select where to display the new password
  var passwordText = document.querySelector("#password");

  //Display the new password to the user
  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
  //Create a variable to hold the new password as it generates
  var password = "";

  //Create variables to hold users selected criteria
  var length;
  var charLower;
  var charUpper;
  var charNum;
  var charSpec;

  //Create variable to exit prompt loop once user input is valid
  var isValid = false;

  //Loops until user selects a number between 8-128
  while (!isValid) {
    length = prompt("Please select how long your password will be: ", "Must be between 8-128!");
    //If user types a valid number between 8-128
    if (8 <= length && length <= 128) {
      //Toggle isValid to true to escape validation loop
      isValid = true;
    }
  }

  //Send the user a prompt for each password criteria and validate the input using a 'validateBoolean' function. Loops until the user selects at least one of the password criteria
  while (!charLower && !charUpper && !charNum && !charSpec) {
    charLower = validateBoolean("Would you like to include lower case letters? Type Yes or No?");
    charUpper = validateBoolean("Would you like to include upper case letters? Type Yes or No?");
    charNum = validateBoolean("Would you like to include numbers? Type Yes or No?");
    charSpec = validateBoolean("Would you like to include special characters? Type Yes or No?");
    //If no criteria is selected during the prompts, alert the user that they must pick at least one
    if (!charLower && !charUpper && !charNum && !charSpec) {
      alert("Please select at least one criteria!");
    }
  }

  //Variable to hold range of possible ASCII values for password. Using randomized indexes, the password will be populated using the values in this array
  var charRange = [];
  //For each password criteria selected by the user, add all relavent characters using their ASCII value to the 'charRange' array
  if (charLower) {
    for (var i = 97; i <= 122; i++) {
      charRange.push(i);
    }
  }
  if (charUpper) {
    for (var i = 65; i <= 90; i++) {
      charRange.push(i);
    }
  }
  if (charNum) {
    for (var i = 48; i <= 57; i++) {
      charRange.push(i);
    }
  }
  if (charSpec) {
    charRange.push(33);
    charRange.push(35);
    charRange.push(36);
    charRange.push(37);
    charRange.push(64);
  }
  //For the length of the password specified by the user, concatenate a new character from the 'charRange' array into the 'password' variable
  for (var i = 0; i < length; i++) {
                //Converts each index's value into the ASCII equivalent character (ie. 97 = a)
    password += String.fromCharCode(charRange[Math.floor(Math.random() * charRange.length)]);
  }


  //Return the new password to the writePassword() function
  return password;
}

//Reusable loop for the boolean validation when user is selecting their password criterias
function validateBoolean(promptText) {
  //Create variable to toggle to next prompt once user input is valid
  var isValid = false;
  //Create variable to hold the user's selection. True means they want the criteria included or false to skip the criteria
  var boolValue;
  while (!isValid) {
    var input = prompt(promptText);
    //Checks for null in case user selects 'Cancel' instead of typing a value and selecting 'OK'. If they do, it assumes the user does not want that criteria and returns false
    if (input == null) {
      boolValue = false;
      break;
    }
    //Checks for valid text input of 'yes' or 'no'. If neither is inputted, it prompts the user to try again with valid input
    switch (input.toLowerCase()) {
      case "yes":
        boolValue = true;
        isValid = true;
        break;

      case "no":
        boolValue = false;
        isValid = true;
        break;

      default:
        alert("Please type 'Yes' or 'No'");
    }
  }
  //Returns if the user wants the criteria or not
  return boolValue;
}