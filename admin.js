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

    // image
    let img = document.createElement("img");
    // details
    let details = document.createElement("div");
    details.id = "details";
    // detail-1
    let name = document.createElement("div");
    name.id = "name";
    let nameSpan = document.createElement("span");
    nameSpan.classList.add("detailSpan");
    nameSpan.innerText = "Product Name : ";
    let nameInput = document.createElement("input");
    nameInput.value = product.productName;
    nameInput.id = "detail_from_localStorage";
    name.appendChild(nameSpan);
    name.appendChild(nameInput);
    details.appendChild(name);
    // detail-2
    let description = document.createElement("div");
    description.id = "description";
    let descSpan = document.createElement("span");
    descSpan.classList.add("detailSpan");
    descSpan.innerText = "Product Description : ";
    let descInput = document.createElement("input");
    descInput.id = "detail_from_localStorage";
    descInput.value = product.productDescription;
    description.appendChild(descSpan);
    description.appendChild(descInput);
    details.appendChild(description);
    // detail-3
    let price = document.createElement("div");
    price.id = "price";
    let priceSpan = document.createElement("span");
    priceSpan.classList.add("detailSpan");
    priceSpan.innerText = "Product Price : ";
    let priceInput = document.createElement("input");
    priceInput.id = "detail_from_localStorage";
    priceInput.value = product.productPrice;
    price.appendChild(priceSpan);
    price.appendChild(priceInput);
    details.appendChild(price);
    // detail-4
    let quantity = document.createElement("div");
    quantity.id = "quantity";
    let quantitySpan = document.createElement("span");
    quantitySpan.classList.add("detailSpan");
    quantitySpan.innerText = "Product Quantity : ";
    let quantityInput = document.createElement("input");
    quantityInput.id = "detail_from_localStorage";
    quantityInput.value = product.productQuantity;
    quantity.appendChild(quantitySpan);
    quantity.appendChild(quantityInput);
    details.appendChild(quantity);
    
    let btnDiv = document.createElement("div");
    btnDiv.id = "btnDiv";
    let updateBtn = document.createElement("button");
    updateBtn.id = "update_btn";
    updateBtn.innerText = "UPDATE";
    let deleteBtn = document.createElement("button");
    deleteBtn.id = "delete_btn";
    deleteBtn.innerText = "DELETE";
    btnDiv.appendChild(updateBtn);
    btnDiv.appendChild(deleteBtn);
    details.appendChild(btnDiv);

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