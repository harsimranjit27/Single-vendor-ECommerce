/*
 *  Get email ID 
 *  Get password
 *  Get user type
 *  Get login button
 *  Get new sign up button
 */
let loginButton = document.getElementById("login_btn");
let newSignUp = document.getElementById("create_account");
newSignUp.addEventListener("click",redirectToSignUp);
loginButton.addEventListener("click", () => {

    document.querySelector("#invalid_email_login").style.display = "none";
    document.querySelector("#selectUserType_signup").style.display = "none";
    document.getElementById("notRegisteredMessage").style.display = "none";

    let emailID = document.getElementById("login_email").value;
    // console.log(emailID);
    let password = document.getElementById("login_pass").value;
    // console.log(password);
    
    let userType = clickUserType();

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
        document.querySelector("#invalid_email_login").style.display = "inline";
        document.querySelector("#selectUserType_login").style.display = "none";
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

function clickUserType() {  
    let userType = "";
    if (document.getElementById("radio_input_user").checked) {
        userType = "user";
    }
    else if (document.getElementById("radio_input_admin").checked) {
        userType = "admin";
    }
    return userType;
}


function validateEmail(emailID){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailID).toLowerCase());
}
function checkUserRegisteredOrNot(emailID) {
    let userArr = getUserDetailsFromLocalStorage();
    if(userArr === null){
        return false;
    }
    const foundEMail = userArr.find(email => (email === emailID));
    if(foundEMail){
        redirectToWebsiteAsRegisteredUser(emailID);
        return true;
    }
    else{
        return false;
    }
}
function redirectToSignUp() {
    document.querySelector(".login_container").style.display = "none";
    document.querySelector(".signUpContainer").style.display = "inherit";
    document.querySelector(".admin_container").style.display = "none";
}

function getUserDetailsFromLocalStorage() {
    if (localStorage.getItem("user_details") !== null || localStorage.getItem("user_details") !== undefined){
        userArr = JSON.parse(localStorage.getItem("user_details"));
        return userArr;
    }
    return null;
}
/**
 * Validate typed email address and password
 * Check if the email is already registered 
 * if registered, take them to the main website allowing add items to cart
 * if not registered, direct user to sign up page
 * 
 */