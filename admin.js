let productNameNode = document.getElementById("product_name");
let productDescriptionNode = document.getElementById("product_description");
let productPriceNode = document.getElementById("product_price");
let productQuantityNode = document.getElementById("product_quantity");

let productImage = document.getElementById("choose_file");

let addProductButton = document.getElementById("add_product");
let productCatalogueContainer = document.getElementById("product_catalogue_container");


if (JSON.parse(localStorage.getItem("product_info")) !== null || JSON.parse(localStorage.getItem("product_info")).length !== 0) {
    let arr = JSON.parse(localStorage.getItem("product_info"));
    let len = arr.length;
    var count = arr[len-1].productID+1;
}
else{
    var count = 0;
}

var imageDataURL;
productImage.addEventListener("change",changeFileNameToString);
function changeFileNameToString(){
    let reader = new FileReader();
    reader.readAsDataURL(this.files[0]); // for multiple files use loop
    reader.addEventListener("load",()=>{
        imageDataURL = reader.result;
        // console.log(imageDataURL);
        return imageDataURL;
    });
}
addProductButton.addEventListener("click",()=>{
    
    // let imageDataURL = changeFileNameToString();
    console.log(imageDataURL);
    let product = {
        productName : productNameNode.value,
        productDescription : productDescriptionNode.value,
        productPrice : productPriceNode.value,
        productQuantity : productQuantityNode.value,
        productID : count++,
        productImage : imageDataURL
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
    // if(arr.length != null){
    //     productCatalogue.id = arr[arr.length-1].productID + 1;
    // }
    // else{
        productCatalogue.id = product.productID;
    // }
    // image
    var img = document.createElement("img");
    img.classList.add("product_images");
    img.setAttribute("src",product.productImage);
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
    productImage.value = "";
    // UPDATE BUTTON
    updateBtn.addEventListener("click",(event)=>{
        updateProduct(event);
    });
    // DELETE BUTTON
    deleteBtn.addEventListener("click",(event)=>{
        deleteProduct(event);
    })
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
    let currentNode = event.target.parentNode.parentNode.parentNode;
    // console.log(currentID);
    let updatedName = currentNode.childNodes[1].childNodes[0].childNodes[1].value;
    // console.log(updatedName);
    let updatedDesc = currentNode.childNodes[1].childNodes[1].childNodes[1].value;
    // console.log(updatedDesc);
    let updatedPrice = currentNode.childNodes[1].childNodes[2].childNodes[1].value;
    // console.log(updatedPrice);
    let updatedQuantity = currentNode.childNodes[1].childNodes[3].childNodes[1].value;
    // console.log(updatedQuantity);

    let arr = getLocalStorage();

    for (let i = 0; i < arr.length; i++) {
        if(arr[i].productID == currentNode.id){
            arr[i].productName = updatedName;
            arr[i].productDescription = updatedDesc;
            arr[i].productPrice = updatedPrice;
            arr[i].productQuantity = updatedQuantity;
            localStorage.setItem("product_info",JSON.stringify(arr));
            break;
        }
    }
}
function deleteProduct(event) {
    
    let deleteIdNode = event.target.parentNode.parentNode.parentNode;
    console.log(deleteIdNode);
    
    let parentContainer = deleteIdNode.parentNode;
    parentContainer.removeChild(deleteIdNode);

    let arr = getLocalStorage();
    console.log(arr[deleteIdNode.id - arr[0].productID]);
    arr.splice(deleteIdNode.id - arr[0].productID,1);
    localStorage.setItem("product_info",JSON.stringify(arr));
    for (let i = deleteIdNode.id+1; i < arr.length; i++) {
        console.log(arr[i].productID);
        arr[i-1].productID = i-1;
        localStorage.setItem("product_info",JSON.stringify(arr));
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