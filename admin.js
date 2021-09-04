let productNameNode = document.getElementById("product_name");
let productDescriptionNode = document.getElementById("product_description");
let productPriceNode = document.getElementById("product_price");
let productQuantityNode = document.getElementById("product_quantity");
let productImageButton = document.getElementById("choose_file");
let addProductButton = document.getElementById("add_product");

let productCatalogueContainer = document.getElementById("product_catalogue_container");

addProductButton.addEventListener("click",addProductToUI);

function addProductToUI() {
    
    let product = {
        productName : productNameNode.value,
        productDescription : productDescriptionNode.value,
        productPrice : productPriceNode.value,
        productQuantity : productQuantityNode.value
    }

    let isValid = validateInputs(product);
    // console.log(isValid);
    if(isValid.status){

        console.log(product.productName);
        console.log(product.productDescription);
        console.log(product.productPrice);
        console.log(product.productQuantity);

        let productCatalogue = document.createElement("div");
        productCatalogue.classList.add("product_catalogue");
        let img = document.createElement("img");

        let details = document.createElement("div");
        details.id = "details";

        let name = document.createElement("b");
        name.innerText = product.productName;
        details.appendChild(name);

        let description = document.createElement("p");
        description.id = "description";
        description.innerText = product.productDescription;
        details.appendChild(description);

        let price = document.createElement("p");
        price.id = "price";
        price.innerHTML = '<span class="number_tags">Product price : </span>'  + product.productPrice;
        details.appendChild(price);

        let quantity = document.createElement("p");
        quantity.id = "quantity";
        quantity.innerHTML = '<span class="number_tags">Product quantity : </span>' + product.productQuantity;
        details.appendChild(quantity);
    
        productCatalogue.appendChild(img);
        productCatalogue.appendChild(details);
        productCatalogueContainer.appendChild(productCatalogue);
    }
    else{
        alert(isValid.message);
    }
    productNameNode.value = "";
    productDescriptionNode.value = "";
    productPriceNode.value = "";
    productQuantityNode.value = "";
}

function validateInputs(product) {

    let productName = product.productName;
    let productDescription = product.productDescription;
    let productPrice = product.productPrice;
    let productQuantity = product.productQuantity;
    

    console.log(productName);

    if (productName === "") {
        return {
            status : false,
            message: "Enter product name"
        };
    }
    else if (productDescription === "") {
        return {
            status : false,
            message : "Enter product description"
        };
    } 
    else if (productPrice === "") {
        return {
            status : false,
            message : "Enter product price"
        };
    } 
    else if (productQuantity === "") {
        return {
            status : false,
            message : "Enter product quantity"
        };
    }
    return {
        status : true
    } 
}