

// Initialize product list

let products = [];

// Function to add product

function addProduct(event) {
event.preventDefault();

 const productName = document.getElementById('product-name').value;

    const productDescription = document.getElementById('product-description').value;

    const productPrice = document.getElementById('product-price').value;

    const productImage = document.getElementById('product-image').files[0];

    const newProduct = {

        id: Date.now(),

        name: productName,

        description: productDescription,

        price: productPrice,

        image: productImage,

        quantity: 0

    };

    products.push(newProduct);

    renderProductList();

    document.getElementById('add-product-form').reset();

}

// Function to render product list

function renderProductList() {

    const productListElement = document.getElementById('product-list');

    const productListHtml = products.map((product) => {

        const imageUrl = URL.createObjectURL(product.image);

        return `

      <li class="product-item">
    <img src="${imageUrl}" alt="${product.name}" width="100" height="100">
            <div class="product-info">
                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <p>Price: $${product.price}</p>

                <p>Quantity: ${product.quantity}</p>

              
                <form class="update-quantity-form">

                    <input type="number" id="update-quantity" value="0">

                    <button type="submit" class="update-quantity-button" data-product-id="${product.id}">Update Quantity</button>

                </form>

                <button class="delete-product-button" data-product-id="${product.id}">Delete Product</button>
               </div>

            </li>

        `;

    }).join('');

    productListElement.innerHTML = productListHtml;

    // Add event listeners to update quantity buttons

    const updateQuantityButtons = document.querySelectorAll('.update-quantity-button');

    updateQuantityButtons.forEach((button) => {

        button.addEventListener('click', updateQuantity);

    });

    // Add event listeners to delete product buttons

    const deleteProductButtons = document.querySelectorAll('.delete-product-button');

    deleteProductButtons.forEach((button) => {

        button.addEventListener('click', deleteProduct);

    });

}

// Function to update quantity

function updateQuantity(event) {

    event.preventDefault();

    const productId = event.target.dataset.productId;

    const product = products.find((product) =>product.id  == productId);

    const updateQuantityInput = event.target.parentNode.querySelector('#update-quantity');

    const updateQuantityValue = parseInt(updateQuantityInput.value);

    if (updateQuantityValue > 0) {

        product.quantity += updateQuantityValue;

    } else if (updateQuantityValue < 0 && product.quantity >= Math.abs(updateQuantityValue)) {

        product.quantity += updateQuantityValue;

    }

    renderProductList();

}

// Function to delete product

function deleteProduct(event) {

    const productId = event.target.dataset.productId;

    products = products.filter((product) => product.id != productId);

    renderProductList();

}

// Add event listener to add product form

document.getElementById('add-product-form').addEventListener('submit', addProduct);



