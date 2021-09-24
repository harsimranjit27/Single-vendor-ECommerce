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
    // Validation
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
        if (userType === "user") {
            let user = {
                type: "user",
                fname: fname.value,
                lname: lname.value,
                emailAddress: emailAddress.value,
                newPassword: newPassword.value,
                reenterPassword: reenterPassword.value
            };
            setDetailsToLocalStorage(user,"user");
            detailsValid = true;
        } else if(userType === "admin") {
            let admin = {
                type: "admin",
                fname: fname.value,
                lname: lname.value,
                emailAddress: emailAddress.value,
                newPassword: newPassword.value,
                reenterPassword: reenterPassword.value
            };
            setDetailsToLocalStorage(admin,"admin");
            detailsValid = true;
        }
        else{
            document.querySelector("#selectUserType_signup").style.display = "inline";
            document.querySelector("#invalid_email_signup").style.display = "none";
        }
    }
    if(detailsValid){
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
    let foundInUserEMail = userArr.find(email => (email === emailID));
    let foundInAdminEMail = adminArr.find(email => (email === emailID));
    if (foundInUserEMail) {
        redirectToLogin(emailID);
        return true;
    } 
    else if (foundInAdminEMail) {
        redirectToLogin(emailID);
        return true;
    } 
    else {
        return false;
    }
}

function setDetailsToLocalStorage(signUpDetails,type) {
    if (type === "user") {
        let userArray = getDetailsFromLocalStorage("user");
        if(userArray === null){
            console.log("userType not passed in getDetailsFromLocalStorage");
        }
        userArray.push(signUpDetails);
        localStorage.setItem("user_details", JSON.stringify(userArray));
    } else if(type === "admin"){
        let adminArray = getDetailsFromLocalStorage("admin");
        if(adminArray === null){
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
    }
    else if(userType === "admin"){
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