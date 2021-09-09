let productNameNode = document.getElementById("product_name");
let productDescriptionNode = document.getElementById("product_description");
let productPriceNode = document.getElementById("product_price");
let productQuantityNode = document.getElementById("product_quantity");
let productImageButton = document.getElementById("choose_file");
let addProductButton = document.getElementById("add_product");
let productCatalogueContainer = document.getElementById("product_catalogue_container");

let productDetails = document.getElementsByClassName("product_details");
if (JSON.parse(localStorage.getItem("product_info")) !== null) {
    var count=JSON.parse(localStorage.getItem("product_info")).length;
}
else{
    var count = 0;
}

addProductButton.addEventListener("click",()=>{

    let product = {
        productName : productNameNode.value,
        productDescription : productDescriptionNode.value,
        productPrice : productPriceNode.value,
        productQuantity : productQuantityNode.value,
        productID : ++count
    }    

    let isValid = validateInputs(product);
    if(isValid.status){
        // console.log(product);
        setLocalStorage(product);
        addProductToUI(product);
    }
    else{
        alert(isValid.message);
    }
});

loadArrayFromLocalStorage();
function loadArrayFromLocalStorage() {
    products = getLocalStorage();
    products.forEach(element => {
        addProductToUI(element);
    });    
}

function addProductToUI(product) {

    let productCatalogue = document.createElement("div");
    productCatalogue.classList.add("product_catalogue");
    let img = document.createElement("img");

    let details = document.createElement("div");
    details.id = "details";

    let name = document.createElement("p");
    // name.id = "name";
    name.innerHTML = '<span class="name_tags">Product name :  </span><b id="name"> '+product.productName+' </b> ';
    details.appendChild(name);

    let description = document.createElement("p");
    // description.id = "description";
    description.innerHTML = '<span class="name_tags">Product description : </span> <p id="description"> '+ product.productDescription+'</p>';
    details.appendChild(description);

    let price = document.createElement("p");
    // price.id = "price";
    price.innerHTML = '<span class="name_tags">Product price : </span> <p id="price" >' + product.productPrice + '</p>';
    details.appendChild(price);

    let quantity = document.createElement("p");
    // quantity.id = "quantity";
    quantity.innerHTML = '<span class="name_tags">Product quantity : </span> <p id="quantity"> ' + product.productQuantity + '</p>';
    details.appendChild(quantity);

    productCatalogue.appendChild(img);
    productCatalogue.appendChild(details);
    productCatalogueContainer.appendChild(productCatalogue);
    
    productNameNode.value = "";
    productDescriptionNode.value = "";
    productPriceNode.value = "";
    productQuantityNode.value = "";
}

function validateInputs(product) {

    // let productName = product.productName;
    // let productDescription = product.productDescription;
    // let productPrice = product.productPrice;
    // let productQuantity = product.productQuantity;

    // ES6 way to get elements from product object
    console.log(product);
    let {
        productName,
        productPrice,
        productQuantity,
        productDescription
    } = product;
    // console.log(productName);

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

function setLocalStorage(product) {

    let products = getLocalStorage();
    products.push(product);
    localStorage.setItem("product_info",JSON.stringify(products));

}
function getLocalStorage() {
    
    if (localStorage.getItem("product_info") === null) {
        let product_info = [];
        return product_info;
    }
    else{
        product_info = JSON.parse(localStorage.getItem("product_info"));
        return product_info;
    }

}