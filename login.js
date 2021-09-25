let loginButton = document.getElementById("login_btn");
let newSignUp = document.getElementById("create_account");
newSignUp.addEventListener("click", redirectToSignUp);
loginButton.addEventListener("click", () => {

    document.querySelector("#invalid_email_login").style.display = "none";
    document.querySelector("#selectUserType_signup").style.display = "none";
    document.getElementById("notRegisteredMessage").style.display = "none";

    let emailID = document.getElementById("login_email").value;
    // console.log(emailID);
    let password = document.getElementById("login_pass").value;
    // console.log(password);

    let userType = "";
    userType = clickUserType();

    // Validation
    let validEMail = "";
    if (emailID) {
        validEMail = validateEmail(emailID);
        // console.log(validEMail);
    }

    if (validEMail === "" || !validEMail) {
        document.querySelector("#invalid_email_login").style.display = "inline";
        document.querySelector("#selectUserType_login").style.display = "none";
        document.getElementById("notRegisteredMessage").style.display = "none";
    }

    // password not entered
    if (validEMail && password === "") {
        document.getElementById("enterPassword_login").style.display = "inline";
        document.querySelector("#selectUserType_login").style.display = "none";
        document.getElementById("notRegisteredMessage").style.display = "none";
    }

    // Validation for userType
    if (validEMail && password && userType === "") {
        document.getElementById("selectUserType_login").style.display = "inline";
        document.getElementById("enterPassword_login").style.display = "none";
        document.getElementById("invalid_email_login").style.display = "none";
        document.getElementById("notRegisteredMessage").style.display = "none";
    }
    // Whether details are entered or not
    if (validEMail && password && userType) {
        console.log("validEMail : ",validEMail);
        console.log("password : ",password);
        console.log("userType : ",userType);
        console.log("emailID : ",emailID);
        let userLoginDetails = {
            emailID,
            password
        };
        console.log(userLoginDetails);
        console.log(userLoginDetails.emailID);
        let emailToPassAsParameter = userLoginDetails.emailID;
        let registered = checkUserRegisteredOrNot(emailToPassAsParameter, userType);
        console.log("type : ",typeof(registered));
        console.log(registered);
        if (registered.result == "registered admin") {
            document.querySelector(".signUpContainer").style.display = "none";
            document.querySelector(".login_container").style.display = "none";
            document.querySelector(".admin_container").style.display = "initial";
            console.log("reg admin");
        }
        else if (registered.result == "registered user") {
            document.querySelector(".signUpContainer").style.display = "none";
            document.querySelector(".login_container").style.display = "none";
            document.querySelector(".admin_container").style.display = "none";
            console.log("reg user");
            redirectToWebsiteAsRegisteredUser(userLoginDetails.emailID, registered);
        }
        else if (registered.result == "not registered user" || registered.result === "not registered admin") {
            document.getElementById("notRegisteredMessage").style.display = "visible";
            console.log("nota");
        }
        emailID.value = "";
        password.value = "";

        function checkUserRegisteredOrNot(emailID, userType) {
            console.log("registered user or not");
            var obj = {
                result : ""
            };
            if (userType === "user") {
                let userArr = getDetailsFromLocalStorage("user");
                console.log(userArr);
                if (userArr === null || userArr === undefined) {
                    obj.result = "not registered user";
                    return obj;
                }
                let foundEMail = userArr.find(elem => (elem.emailAddress === emailID));
                console.log(foundEMail);
                if (foundEMail) {
                    obj.result = "registered user";
                    return obj;
                } else {
                    obj.result = "not registered user";
                    return obj;
                }
            } else if (userType === "admin") {
                let adminArr = getDetailsFromLocalStorage("admin");
                if (adminArr === null || adminArr === undefined) {
                    obj.result = "not registered admin";
                    return obj;
                }
                let foundEMail = adminArr.find(elem => (elem.emailAddress === emailID));
                if (foundEMail) {
                    obj.result = "registered admin";
                    return obj;
                } else {
                    obj.result = "not registered admin";
                    return obj;
                }
            } else {
                console.log("userType not provided");
            }
            return obj;
        }

    }
});

document.getElementById("login_email").addEventListener("focusin", () => {
    document.getElementById("selectUserType_login").style.display = "none";
    document.getElementById("enterPassword_login").style.display = "none";
    document.getElementById("invalid_email_login").style.display = "none";
    document.getElementById("notRegisteredMessage").style.display = "none";
});
document.getElementById("login_pass").addEventListener("focusin", () => {
    document.getElementById("selectUserType_login").style.display = "none";
    document.getElementById("enterPassword_login").style.display = "none";
    document.getElementById("invalid_email_login").style.display = "none";
    document.getElementById("notRegisteredMessage").style.display = "none";
});
document.getElementById("radio_input_user").addEventListener("focusin", () => {
    document.getElementById("selectUserType_login").style.display = "none";
    document.getElementById("enterPassword_login").style.display = "none";
    document.getElementById("invalid_email_login").style.display = "none";
    document.getElementById("notRegisteredMessage").style.display = "none";
});
document.getElementById("radio_input_admin").addEventListener("focusin", () => {
    document.getElementById("selectUserType_login").style.display = "none";
    document.getElementById("enterPassword_login").style.display = "none";
    document.getElementById("invalid_email_login").style.display = "none";
    document.getElementById("notRegisteredMessage").style.display = "none";
});

function clickUserType() {
    let userType = "";
    if (document.getElementById("radio_input_user").checked) {
        userType = "user";
    } else if (document.getElementById("radio_input_admin").checked) {
        userType = "admin";
    }
    return userType;
}

function validateEmail(emailID) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailID).toLowerCase());
}

function redirectToSignUp() {
    document.querySelector(".login_container").style.display = "none";
    document.querySelector(".signUpContainer").style.display = "inherit";
    document.querySelector(".admin_container").style.display = "none";
}

function getDetailsFromLocalStorage(userType) {
    if (userType === "user") {
        if (localStorage.getItem("user_details") === null) {
            let userArr = [];
            return userArr;
        } else {
            userArr = JSON.parse(localStorage.getItem("user_details"));
            return userArr;
        }
    } else if (userType === "admin") {
        if (localStorage.getItem("admin_details") === null) {
            let adminArr = [];
            return adminArr;
        } else {
            adminArr = JSON.parse(localStorage.getItem("admin_details"));
            return adminArr;
        }
    }
    return null;
}