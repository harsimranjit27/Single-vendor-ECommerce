/*
 *  Get email ID 
 *  Get password
 *  Get user type
 *  Get login button
 *  Get new sign up button
 */

let loginButton = document.getElementById("login_btn");
let newSignUp = document.getElementById("create_account");

loginButton.addEventListener("click", () => {

    document.getElementById("invalid_email").style.display = "none";
    document.getElementById("selectUserType").style.display = "none";
    document.getElementById("notRegisteredMessage").style.display = "none";

    let emailID = document.getElementById("login_email").value;
    // console.log(emailID);
    let password = document.getElementById("login_pass").value;
    // console.log(password);
    let userType = "";

    if (document.getElementById("radio_input_user").checked) {
        userType = "user";
    } else if (document.getElementById("radio_input_admin").checked) {
        userType = "admin";
    }
    // Validation
    if (emailID) {
        var validEMail = validateEmail(emailID);
        console.log(validEMail);
    }
    // Validation for userType
    if(userType === ""){
        document.getElementById("selectUserType").style.display = "inline";
        document.getElementById("invalid_email").style.display = "none";
        document.getElementById("notRegisteredMessage").style.display = "none";
    }
    if (!validEMail) {
        document.getElementById("invalid_email").style.display = "inline";
        document.getElementById("selectUserType").style.display = "none";
        document.getElementById("notRegisteredMessage").style.display = "none";
    }
    // Whether details are entered or not
    if(validEMail && password && userType){
        let userLoginDetails = {
            emailID,
            password
        };
        console.log(userLoginDetails);
        let registered = checkUserRegisteredOrNot(userLoginDetails.emailID);
        if(!registered){
            document.getElementById("notRegisteredMessage").style.display = "initial";
        }
        emailID.value = "";
        password.value = "";
    }
});

function validateEmail(emailID){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(emailID).toLowerCase());
}
function checkUserRegisteredOrNot(emailID) {
    let userArr = getUserDetailsFromLocalStorage();
    const foundEMail = userArr.find(email => (email === emailID));
    if(foundEMail){
        redirectToWebsiteAsRegisteredUser(emailID);
        return true;
    }
    else{
        return false;
    }
}

function setUserDetailsToLocalStorage(userLoginDetails) {
    let userArray = getUserDetailsFromLocalStorage();
    userArray.push(userLoginDetails);
    localStorage.setItem("user_details", JSON.stringify(userArray));
}
function getUserDetailsFromLocalStorage() {
    if (localStorage.getItem("user_details") === null) {
        let userArr = [];
        return userArr;
    } else {
        userArr = JSON.parse(localStorage.getItem("user_details"));
        return userArr;
    }
}
/**
 * Validate typed email address and password
 * Check if the email is already registered 
 * if registered, take them to the main website allowing add items to cart
 * if not registered, direct user to sign up page
 * 
 */