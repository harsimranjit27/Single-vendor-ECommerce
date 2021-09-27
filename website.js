/**
 * get products from local storage
 * add them to website from localStorage
 */
let productsToDisplayDiv = document.querySelector(".products");

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

if (productsArr.length === 0) {
    document.getElementById("noProductsAvailable").style.display = "inherit";
    document.getElementById("productsAvailable").style.display = "none";
} else {
    // Add products to website
    console.log(productsArr);
    productsArr.forEach(products => {
        let element = {
            productImage: products.productImage,
            productName: products.productName,
            productDescription: products.productDescription,
            productPrice: products.productPrice
        };
        // console.log(element);

        document.getElementById("noProductsAvailable").style.display = "none";

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
}