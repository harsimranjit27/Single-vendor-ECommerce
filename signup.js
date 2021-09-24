/**
 * #first_name
 * #last_name
 * #emailAddress
 * #newPassword
 * #reenterPassword
 * #registerBtn
 */

let fname = document.getElementById("first_name");
let lname = document.getElementById("last_name");
let emailAddress = document.getElementById("emailAddress");
let newPassword = document.getElementById("newPassword");
let reenterPassword = document.getElementById("reenterPassword");
let registerBtn = document.getElementById("registerBtn");

let newPassValue = newPassword.value;

// When the user clicks on the password field, show the message box
newPassword.addEventListener("focusin", () => {
    document.getElementById("newPassMessage").style.display = "block";
});
// When the user clicks outside of the password field, hide the message box
newPassword.addEventListener("focusout", () => {
    document.getElementById("newPassMessage").style.display = "none";
});
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let length = document.getElementById("length");
// Password criteria fulfillment
newPassword.addEventListener("keyup", () => {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (newPassword.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (newPassword.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (newPassword.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if (newPassword.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
});

// When the user clicks on the reenter password field, show the message box
reenterPassword.addEventListener("focusin", () => {
    document.getElementById("reenterPassMessage").style.display = "inline";
    matchPasswords();
});
// Reentering password
reenterPassword.addEventListener("keyup", () => {
    matchPasswords();
});
// When the user clicks outside of the reenter password field, hide the message box
reenterPassword.addEventListener("focusout", () => {
    document.getElementById("reenterPassMessage").style.display = "none";
});

function matchPasswords() {

    // Matching passwords
    let passwordNotMatched = document.getElementById("passNotMatch");
    let passwordMatched = document.getElementById("passMatch");
    if (reenterPassword.value === newPassword.value) {
        document.getElementById("reenterPassMessage").style.display = "inline";
        document.getElementById("reenterPassMessage").style.width = "10em";
        passwordNotMatched.style.display = "none";
        passwordMatched.style.display = "inline";

        passwordMatched.classList.add("validPass");
        passwordNotMatched.classList.remove("invalid");
    } else {
        passwordNotMatched.style.display = "inline";
        passwordMatched.style.display = "none";

        passwordMatched.classList.remove("validPass");
        passwordNotMatched.classList.add("invalid");

        document.getElementById("reenterPassMessage").style.width = "25%";
    }
}

registerBtn.addEventListener("click", () => {

    document.querySelector("#invalid_email_signup").style.display = "none";
    document.querySelector("#selectUserType_signup").style.display = "none";

    let userType = "";
    userType = clickUserType();

    function clickUserType() {
        let userType = "";
        if (document.getElementById("type-user").checked) {
            userType = "user";
        } else if (document.getElementById("type-admin").checked) {
            userType = "admin";
        }
        return userType;
    }

    var detailsValid = false;

    var validEMail;
    // EMail validation
    if (emailAddress.value) {
        validEMail = validateEmail(emailAddress.value);
        console.log(emailAddress.value);
    }

    function validateEmail(emailID) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(emailID).toLowerCase());
    }

    if (!validEMail) {
        document.querySelector("#invalid_email_signup").style.display = "initial";
        document.querySelector("#selectUserType_signup").style.display = "none";
        console.log("invalid email");
    }
    // valid email
    else {
        let registered = checkUserRegisteredOrNot(emailAddress.value);
        if (!registered) {
            if (userType === "user") {
                let user = {
                    type: "user",
                    fname: fname.value,
                    lname: lname.value,
                    emailAddress: emailAddress.value,
                    newPassword: newPassword.value,
                    reenterPassword: reenterPassword.value
                };
                setDetailsToLocalStorage(user, "user");
                detailsValid = true;
            } else if (userType === "admin") {
                let admin = {
                    type: "admin",
                    fname: fname.value,
                    lname: lname.value,
                    emailAddress: emailAddress.value,
                    newPassword: newPassword.value,
                    reenterPassword: reenterPassword.value
                };
                setDetailsToLocalStorage(admin, "admin");
                detailsValid = true;
            } else {
                document.querySelector("#selectUserType_signup").style.display = "inline";
                document.querySelector("#invalid_email_signup").style.display = "none";
            }
        }
    }
    // Emptying entered fields after successful registration
    if (detailsValid) {
        if (userType === "user") {
            document.getElementById("type-user").checked = false;
        } else if (userType === "admin") {
            document.getElementById("type-admin").checked = false;
        }
        fname.value = "";
        lname.value = "";
        emailAddress.value = "";
        newPassword.value = "";
        reenterPassword.value = "";
    }
});

function checkUserRegisteredOrNot(emailID) {
    let userArr = getDetailsFromLocalStorage("user");
    let adminArr = getDetailsFromLocalStorage("admin");
    let foundInUserEMail = userArr.find(elem => (elem.emailAddress === emailID));
    let foundInAdminEMail = adminArr.find(elem => (elem.emailAddress === emailID));
    if (foundInUserEMail) {
        redirectToLogin(emailID);
        return true;
    } else if (foundInAdminEMail) {
        redirectToLogin(emailID);
        return true;
    } else {
        return false;
    }
}

function redirectToLogin(emailID) {
    document.querySelector(".signUpContainer").style.display = "none";
    document.querySelector(".login_container").style.display = "initial";
    document.getElementById("login_email").value = emailID;
}

function setDetailsToLocalStorage(signUpDetails, type) {
    if (type === "user") {
        let userArray = getDetailsFromLocalStorage("user");
        if (userArray === null) {
            console.log("userType not passed in getDetailsFromLocalStorage");
        }
        userArray.push(signUpDetails);
        localStorage.setItem("user_details", JSON.stringify(userArray));
    } else if (type === "admin") {
        let adminArray = getDetailsFromLocalStorage("admin");
        if (adminArray === null) {
            console.log("userType not passed in getDetailsFromLocalStorage");
        }
        adminArray.push(signUpDetails);
        localStorage.setItem("admin_details", JSON.stringify(adminArray));
    }
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
/**
 * Wrap above details in object and store array in object
 */