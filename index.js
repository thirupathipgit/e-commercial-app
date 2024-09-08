let searchResultsEl = document.getElementById("SearchResult");
let sendGetRequestBtnEl = document.getElementById("sendGetRequestBtn");
let cartlist = document.getElementById("addCartLists");
let cart = [];

function addQuentity(price, priceId, QuentityId) {
  let productQuentity = document.getElementById(QuentityId);
  let productPrice = document.getElementById(priceId);
  let previousValue = parseInt(productQuentity.textContent);

  let updateQuentity = 1 + previousValue;
  productQuentity.textContent = updateQuentity;
  let previousProductPrice = price;
  let updateProductPrice = previousProductPrice * updateQuentity;
  productPrice.textContent = updateProductPrice;
}
function decreaseQuentity(price, priceId, QuentityId) {
  let productQuentity = document.getElementById(QuentityId);
  let productPrice = document.getElementById(priceId);
  let previousValue = parseInt(productQuentity.textContent);
  if (previousValue > 0) {
    let updateQuentity = previousValue - 1;
    productQuentity.textContent = updateQuentity;
    let previousProductPrice = price;
    let updateProductPrice = previousProductPrice * updateQuentity;
    productPrice.textContent = updateProductPrice;
  }
}

function addProductList(result) {
  let { title, image, price, id } = result;
  let priceId = "price" + id;
  let QuentityId = "quntity" + id;
  let deleteId = "list" + id;
  let addCartHeading = document.createElement("h1");
  addCartHeading.textContent = "CART DETAILS";
  cartlist.appendChild(addCartHeading);
  let addCartContainer = document.createElement("li");
  addCartContainer.id = deleteId;
  addCartContainer.classList.add("add-cart-bg");
  cartlist.appendChild(addCartContainer);
  let imgE1 = document.createElement("img");
  imgE1.src = image;
  imgE1.classList.add("add-cart-img");
  addCartContainer.appendChild(imgE1);
  let addCartTitle = document.createElement("h2");
  addCartTitle.textContent = title;
  addCartTitle.classList.add("add-cart-paragraph");
  addCartContainer.appendChild(addCartTitle);
  let addCartButtonContainer = document.createElement("div");
  addCartButtonContainer.classList.add("add-cart-button-container");
  addCartContainer.appendChild(addCartButtonContainer);
  let IncreaseButton = document.createElement("button");
  IncreaseButton.textContent = "+";
  IncreaseButton.classList.add("add-cart-buttons");
  addCartButtonContainer.appendChild(IncreaseButton);

  let Quentity = document.createElement("p");
  Quentity.textContent = 1;
  Quentity.id = QuentityId;
  let values = Quentity.textContent;
  Quentity.classList.add("add-cart-paragraph");
  addCartButtonContainer.appendChild(Quentity);

  let DecreaseButton = document.createElement("button");
  DecreaseButton.textContent = "-";
  DecreaseButton.classList.add("add-cart-buttons");
  addCartButtonContainer.appendChild(DecreaseButton);

  IncreaseButton.onclick = function () {
    addQuentity(price, priceId, QuentityId, values);
  };
  DecreaseButton.onclick = function () {
    decreaseQuentity(price, priceId, QuentityId, values);
  };

  let priceDetail = document.createElement("p");
  priceDetail.textContent = price;
  priceDetail.id = priceId;
  priceDetail.classList.add("add-cart-price");
  addCartContainer.appendChild(priceDetail);

  let DeleteButton = document.createElement("i");
  DeleteButton.classList.add("fa-solid", "fa-trash", "add-cart-delete");
  addCartContainer.appendChild(DeleteButton);
}

function createAndAppendSearchResult(result) {
  let { link, title, description, image, price, rating, id } = result;
  let { rate } = rating;
  let elementId = "LIST" + id;
  let resultItemEl = document.createElement("div");
  resultItemEl.id = elementId;
  resultItemEl.classList.add("result-item");
  cartlist.appendChild(resultItemEl);

  let titleEl = document.createElement("h1");

  titleEl.textContent = title;
  titleEl.classList.add("result-title");
  resultItemEl.appendChild(titleEl);

  let imageElement = document.createElement("img");
  imageElement.src = image;
  imageElement.classList.add("http-image");
  resultItemEl.appendChild(imageElement);

  let priceDetails = document.createElement("div");
  priceDetails.classList.add("http-price-details");
  resultItemEl.appendChild(priceDetails);

  let priceEl = document.createElement("p");
  priceEl.textContent = `PRICE:$ ${price}`;
  priceEl.classList.add("http-price");
  priceDetails.appendChild(priceEl);

  let ratingEl = document.createElement("p");
  ratingEl.textContent = `RATING: ${rate}`;
  ratingEl.classList.add("http-rating");
  priceDetails.appendChild(ratingEl);

  let AddCart = document.createElement("button");
  AddCart.textContent = "ADD CART";
  AddCart.classList.add("add-cart-button");
  priceDetails.appendChild(AddCart);
  searchResultsEl.appendChild(resultItemEl);
  AddCart.onclick = function () {
    addProductList(result);
    cart = [...cart, result];
    alert("YOUR ITEM ADDED IN CART ICON CHECK IT");
  };
}

function DisplayResult(httpResponse) {
  for (let result of httpResponse) {
    createAndAppendSearchResult(result);
  }
  console.log(httpResponse);
}

function ShowALLProduct() {
  let requestUrl = "https://fakestoreapi.com/products";
  let options = {
    method: "GET",
  };

  fetch(requestUrl, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      let httpResponse = jsonData;
      DisplayResult(httpResponse);
    });
}
