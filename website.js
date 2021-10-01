/**
 * get products from local storage
 * add them to website from localStorage
 */
let productsToDisplayDiv = document.querySelector(".products");
let loginBtn = document.querySelector("#userName");
let goToCartBtn = document.getElementById("cartBtn");
let productsAddedToWebsite = false;

function getLocalStorage() {
    if (localStorage.getItem("product_info") === null) {
        let product_info = [];
        return product_info;
    } else {
        product_info = JSON.parse(localStorage.getItem("product_info"));
        return product_info;
    }
}

let productsArr = getLocalStorage();
console.log(productsArr);

if (productsArr.length === 0) {
    document.getElementById("noProductsAvailable").style.display = "inherit";
    document.getElementById("productsAvailable").style.display = "none";
} else {
    // Add products to website
    // console.log(productsArr);
    productsArr.forEach(products => {
        let element = {
            productImage: products.productImage,
            productName: products.productName,
            productDescription: products.productDescription,
            productPrice: products.productPrice
        };
        // console.log(element);

        document.getElementById("noProductsAvailable").style.display = "none";

        // Displaying products to website
        let productDiv = document.createElement("div");
        productDiv.classList.add("productDivOnWebsite");

        let imageDiv = document.createElement("div");
        imageDiv.classList.add("imageDivOnWebsite");
        let image = document.createElement("img");
        image.classList.add("imagesOfProductsOnWebsite");
        image.setAttribute("src", element.productImage);
        imageDiv.appendChild(image);
        productDiv.appendChild(imageDiv);

        let nameDiv = document.createElement("div");
        nameDiv.classList.add("nameDivOnWebsite");
        let name = document.createElement("h3");
        name.classList.add("nameOfProductsOnWebsite");
        name.innerText = element.productName;
        nameDiv.appendChild(name);
        productDiv.appendChild(nameDiv);

        let descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("descriptionDivOnWebsite");
        let description = document.createElement("h5");
        description.classList.add("descriptionOfProductsOnWebsite");
        description.innerText = element.productDescription;
        descriptionDiv.appendChild(description);
        productDiv.appendChild(descriptionDiv);

        let priceDiv = document.createElement("div");
        priceDiv.classList.add("priceDivOnWebsite");
        let price = document.createElement("p");
        price.innerText = "₹ ";
        price.classList.add("priceOfProductsOnWebsite");
        price.innerText += element.productPrice;
        priceDiv.appendChild(price);
        productDiv.appendChild(priceDiv);

        let addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("addToCartBtn");
        addToCartBtn.setAttribute("type", "submit");
        addToCartBtn.innerText = "ADD TO CART";
        productDiv.appendChild(addToCartBtn);

        productsToDisplayDiv.appendChild(productDiv);
    });
    productsAddedToWebsite = true;
    if (productsAddedToWebsite) {
        let addToCartBtn = document.querySelectorAll(".addToCartBtn");
        // console.log(addToCartBtn);
        let userArr = JSON.parse(localStorage.getItem("user_details"));
        let loggedInEMail = localStorage.getItem("loggedInEMail");

        addToCartBtn.forEach(element => {
            element.addEventListener("click", () => {
                element.innerText = "Added !!";
                userArr.forEach(user => {
                    if (user.emailAddress === loggedInEMail.replace(/['"]+/g, '')) {

                        let products = JSON.parse(localStorage.getItem("product_info"));
                        let name = element.parentNode.childNodes[1].innerText;
                        let price = element.parentNode.childNodes[3].innerText;
                        let img = (products.find(e => e.productName === name)).productImage;
                        let details = {
                            name,
                            price,
                            img
                        }
                        console.log(details);
                        user.cart.push(details);
                        // console.log(user.cart);
                        localStorage.setItem("user_details", JSON.stringify(userArr));
                    }
                });
            });

        });
    }
}

goToCartBtn.addEventListener("click", checkLoggedIn);

function checkLoggedIn() {
    let loggedInEMail = localStorage.getItem("loggedInEMail");

    let users = JSON.parse(localStorage.getItem("user_details"));
    let currUser = users.find(e => e.emailAddress === loggedInEMail.replace(/['"]+/g, ''));

    // not logged in
    if (loggedInEMail === "" || loggedInEMail === undefined || loggedInEMail === null) {
        document.querySelector("#website_container").style.display = "none";
        document.querySelector(".signUpContainer").style.display = "none";
        document.querySelector(".admin_container").style.display = "none";
        document.querySelector(".login_container").style.display = "inherit";
        document.querySelector(".cart_container").style.display = "none";
        console.log("Please login");
    }

    // logged in
    if (currUser.cart.length) {

        document.querySelector("#website_container").style.display = "none";
        document.querySelector(".signUpContainer").style.display = "none";
        document.querySelector(".admin_container").style.display = "none";
        document.querySelector(".login_container").style.display = "none";
        document.querySelector(".cart_container").style.display = "inherit";
        document.querySelector("#noItems").style.display = "none";

        let returnBtn = document.querySelector("#backToHome");
        returnBtn.addEventListener("click", () => {
            document.querySelector("#website_container").style.display = "initial";
            document.querySelector(".cart_container").style.display = "none";
        });

        for (let i = 0; i < currUser.cart.length; i++) {

            let cartProduct = document.createElement("div");
            cartProduct.classList.add("cartProduct");

            let image = document.createElement("img");
            image.classList.add("productImageInCart");
            image.setAttribute("src", currUser.cart[i].img);
            cartProduct.appendChild(image);

            let name = document.createElement("h2");
            name.classList.add("nameOfProductInCart");
            name.innerText = currUser.cart[i].name;
            cartProduct.appendChild(name);

            let price = document.createElement("p");
            price.classList.add("priceOfProductInCart");
            price.innerText = currUser.cart[i].price;
            cartProduct.appendChild(price);

            // let description = document.createElement("p");
            // description.classList.add("descriptionOfProduct");
            // description.appendChild(currUser.cart[i].uctDescription);
            // cartProduct.appendChild(description);

            let quantity = document.createElement("div");
            var plusBtn = document.createElement("button");
            plusBtn.classList.add("inc_dec_btn");
            plusBtn.innerText = "+";
            quantity.appendChild(plusBtn);
            var minusBtn = document.createElement("button");
            minusBtn.classList.add("inc_dec_btn");
            minusBtn.innerText = "−";
            quantity.appendChild(minusBtn);

            let count = 1;
            var countDisplay = document.createElement("span");
            countDisplay.classList.add("countOfItem");
            countDisplay.innerText = count;
            plusBtn.addEventListener("click", (event) => {
                count++;
                event.target.parentNode.childNodes[2].innerText = count;
            });
            minusBtn.addEventListener("click", (event) => {
                count--;
                if (count === 0) {
                    let userArr = JSON.parse(localStorage.getItem("user_details"));

                    let cart = userArr.find(e => e.emailAddress === loggedInEMail.replace(/['"]+/g, '')).cart;
                    let name = cart.find(e => e.name === event.target.parentNode.parentNode.childNodes[1].innerText);
                    cart.splice(cart.indexOf(name), 1);
                    localStorage.setItem("user_details", JSON.stringify(userArr));
                    console.log(userArr);

                    document.querySelector(".allProductsInCart").removeChild(event.target.parentNode.parentNode);
                }
                if (count > 1) {
                    event.target.parentNode.childNodes[2].innerText = count;
                }

            });
            quantity.appendChild(countDisplay);
            cartProduct.appendChild(quantity);
            console.log(cartProduct);

            document.querySelector(".allProductsInCart").appendChild(cartProduct);
        }

    }
}

if (localStorage.getItem("loggedInEMail") !== null && localStorage.getItem("loggedInEMail") !== undefined && localStorage.getItem("loggedInEMail") !== "") {
    let loggedInUser = JSON.parse(localStorage.getItem("user_details")).find(e => e.emailAddress === localStorage.getItem("loggedInEMail").replace(/['"]+/g, ''));
    loginBtn.innerText = loggedInUser.fname;
}
loginBtn.addEventListener("click", () => {
    if (localStorage.getItem("loggedInEMail") === "" || localStorage.getItem("loggedInEMail") === null || localStorage.getItem("loggedInEMail") === undefined) {
        document.querySelector(".login_container").style.display = "inherit";
        document.querySelector("#website_container").style.display = "none";
        document.querySelector(".signUpContainer").style.display = "none";
        document.querySelector(".admin_container").style.display = "none";
        document.querySelector(".cart_container").style.display = "none";
    }
});