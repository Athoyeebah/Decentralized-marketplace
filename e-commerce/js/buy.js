
// Get products grid element
const productsGrid = document.querySelector('.products-grid');
const cartIcon = document.querySelector('.cart-link header-link');
const cartQuantity = document.querySelector('.cart-quantity');

// Sample product data
const products = [
{
id: 1,
name: 'Athletic Sock',
price: 10.99,
description: 'Durable socks made from lush fabric',
imageUrl: './images/athletic-cotton-socks-6-pairs.jpg',
},
{
id: 2,
name: 'Backpack',
price: 9.99,
description: 'Made from durable material',
imageUrl: './images/backpack.jpg',
},
// Add more products here
];

// Initialize cart
let cart = [];

// Render product list
function renderProductList() {
const productListHtml = products.map((product) => {
return `
<div class="product-container"> 
    <div class="product-image-container">
         <img class="product-image" src="${product.imageUrl}"> 
   </div> <div class="product-name limit-text-to-2-lines"> ${product.name} </div>
    <div class="product-description"> ${product.description} </div>
     <div class="product-price"> $${product.price.toFixed(2)} </div>
      <div class="product-quantity-container">
      <select> 
   <option selected value="1">1</option> 
   <option value="2">2</option> 
   <option value="3">3</option> 
  <option value="4">4</option> 
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option> 
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
  </select>
  </div> 
  <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}"> Add to Cart </button>
  </div>`;
}).join('');
productsGrid.innerHTML = productListHtml;

// Add event listeners to cart buttons
document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
button.addEventListener('click', (event) => {
const productId = event.target.dataset.productId;
const quantity = event.target.parentNode.querySelector('select').value;
addToCart(productId, quantity);
updateCartQuantity();
});
});
}

renderProductList();

// Add product to cart
function addToCart(productId, quantity) {
const product = products.find((product) =>product.id == productId);

const existingProduct = cart.find((productInCart) =>  product.id == productId);

if (existingProduct) {
existingProduct.quantity += parseInt(quantity);
} else {
cart.push({ id: productId, quantity: parseInt(quantity), product: product });
}
}

// Update cart quantity display
function updateCartQuantity() {
let cartQuantity = 0;
cart.forEach((cartItem) => {
cartQuantity += cartItem.quantity;
});
cartQuantityElement = document.querySelector('.cart-quantity');
if(cartQuantityElement) {
cartQuantityElement.innerHTML = cartQuantity;
}
}

