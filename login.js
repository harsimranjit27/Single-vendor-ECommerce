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
        let userLoginDetails = {
            emailID,
            password
        };
        let registered = checkUserRegisteredOrNot(emailID, userType);
        if (registered.result == "registered admin") {
            let adminArr = getDetailsFromLocalStorage("admin");
            let passMatch = matchPasswords(adminArr,userLoginDetails);
            if (passMatch) {
                console.log("Pass match");
                document.querySelector(".admin_container").style.display = "inherit";
                document.querySelector(".signUpContainer").style.display = "none";
                document.querySelector(".login_container").style.display = "none";
            }
            else{
                console.log("Pass not match");
                document.getElementById("wrongPassword").style.display = "inline";
            }
        }
        else if (registered.result == "registered user") {
            // console.log("registered user");
            let userArr = getDetailsFromLocalStorage("user");
            let passMatch = matchPasswords(userArr,userLoginDetails);
            if (passMatch) {
                document.querySelector(".admin_container").style.display = "none";
                document.querySelector(".signUpContainer").style.display = "none";
                document.querySelector(".login_container").style.display = "none";
                document.querySelector("#website_container").style.display = "inherit";
                console.log("User password match");
            }
            else{
                document.getElementById("wrongPassword").style.display = "inline";
            }
        }
        else if (registered.result == "not registered user" || registered.result === "not registered admin") {
            console.log("not registered");
            password.value = "";
            document.getElementById("notRegisteredMessage").style.display = "inherit";
            // document.querySelector(".login_container").style.display = "none";
            // document.querySelector(".signUpContainer").style.display = "inherit";
            // document.querySelector(".admin_container").style.display = "none";
        }

        function checkUserRegisteredOrNot(emailID, userType) {
            console.log("registered user or not function");
            var obj = {
                emailID,
                result: ""
            };
            if (userType === "user") {
                let userArr = getDetailsFromLocalStorage("user");
                // console.log(userArr);
                if (userArr === null || userArr === undefined) {
                    obj.result = "not registered user";
                    return obj;
                }
                let foundEMail = userArr.find(elem => (elem.emailAddress === emailID));
                // console.log(foundEMail);
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
        function matchPasswords(arr,loginDetails) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].newPassword === loginDetails.password) {
                    return true;
                }
            }
            return false;
        }
        
        emailID.value = "";
        password.value = "";
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
    document.getElementById("wrongPassword").style.display = "none";
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