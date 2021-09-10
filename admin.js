let productNameNode = document.getElementById("product_name");
let productDescriptionNode = document.getElementById("product_description");
let productPriceNode = document.getElementById("product_price");
let productQuantityNode = document.getElementById("product_quantity");
let productImageButton = document.getElementById("choose_file");
let addProductButton = document.getElementById("add_product");
let productCatalogueContainer = document.getElementById("product_catalogue_container");

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
    let products = getLocalStorage();
    products.forEach(element => {
        addProductToUI(element);
    });    
}
function addProductToUI(product) {

    let productCatalogue = document.createElement("div");
    productCatalogue.classList.add("product_catalogue");
    productCatalogue.id = product.productID;

    // image
    var img = document.createElement("img");
    img.classList.add("product_images");
    // details
    let details = document.createElement("div");
    details.classList.add("details");
    // detail-1
    let name = document.createElement("div");
    name.classList.add("name");
    let nameSpan = document.createElement("span");
    nameSpan.classList.add("detailSpan");
    nameSpan.innerText = "Product Name : ";
    var nameInput = document.createElement("input");
    nameInput.value = product.productName;
    nameInput.classList.add("detail_from_localStorage");
    nameInput.id = "nameInput";
    name.appendChild(nameSpan);
    name.appendChild(nameInput);
    details.appendChild(name);
    // detail-2
    let description = document.createElement("div");
    description.classList.add("description");
    let descSpan = document.createElement("span");
    descSpan.classList.add("detailSpan");
    descSpan.innerText = "Product Description : ";
    var descInput = document.createElement("input");
    descInput.classList.add("detail_from_localStorage");
    descInput.id = "descInput";
    descInput.value = product.productDescription;
    description.appendChild(descSpan);
    description.appendChild(descInput);
    details.appendChild(description);
    // detail-3
    let price = document.createElement("div");
    price.classList.add("price");
    let priceSpan = document.createElement("span");
    priceSpan.classList.add("detailSpan");
    priceSpan.innerText = "Product Price : ";
    var priceInput = document.createElement("input");
    priceInput.classList.add("detail_from_localStorage");
    priceInput.id = "priceInput";
    priceInput.value = product.productPrice;
    price.appendChild(priceSpan);
    price.appendChild(priceInput);
    details.appendChild(price);
    // detail-4
    let quantity = document.createElement("div");
    quantity.classList.add("quantity");
    let quantitySpan = document.createElement("span");
    quantitySpan.classList.add("detailSpan");
    quantitySpan.innerText = "Product Quantity : ";
    var quantityInput = document.createElement("input");
    quantityInput.classList.add("detail_from_localStorage");
    quantityInput.id = "quantityInput";
    quantityInput.value = product.productQuantity;
    quantity.appendChild(quantitySpan);
    quantity.appendChild(quantityInput);
    details.appendChild(quantity);
    let productDetails = document.getElementsByClassName("product_details");
    
    let btnDiv = document.createElement("div");
    btnDiv.classList.add("btnDiv");
    var updateBtn = document.createElement("button");
    updateBtn.classList.add("update_btn");
    updateBtn.innerText = "UPDATE";
    var deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete_btn");
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

    updateBtn.addEventListener("click",(event)=>{
        updateProduct(event);
    });

}

function validateInputs(product) {

    // let productName = product.productName;
    // let productDescription = product.productDescription;
    // let productPrice = product.productPrice;
    // let productQuantity = product.productQuantity;

    // ES6 way to get elements from product object
    // console.log(product);
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

function updateProduct(event) {
    let currentID = event.target.parentNode.parentNode.parentNode.id;
    // console.log(currentID);
    let updatedName = document.getElementById(currentID).childNodes[1].childNodes[0].childNodes[1].value;
    // console.log(updatedName);
    let updatedDesc = document.getElementById(currentID).childNodes[1].childNodes[1].childNodes[1].value;
    // console.log(updatedDesc);
    let updatedPrice = document.getElementById(currentID).childNodes[1].childNodes[2].childNodes[1].value;
    // console.log(updatedPrice);
    let updatedQuantity = document.getElementById(currentID).childNodes[1].childNodes[3].childNodes[1].value;
    // console.log(updatedQuantity);

    let arr = getLocalStorage();

    for (let i = 0; i < arr.length; i++) {
        if(arr[i].productID == currentID){
            arr[i].productName = updatedName;
            arr[i].productDescription = updatedDesc;
            arr[i].productPrice = updatedPrice;
            arr[i].productQuantity = updatedQuantity;
            arr[i].id = currentID;
            localStorage.setItem("product_info",JSON.stringify(arr));
            break;
        }
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