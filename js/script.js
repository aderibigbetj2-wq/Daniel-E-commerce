console.log("script loaded");
/* Setup Products in localStorage: Creates a list of product data*/
let store = [
    {id: 1, product: "Cartoon Print T-Shirt", price: 500 },
    {id: 2, product: "Cartoon T-Shirt", price: 500 },
    {id: 3, product: "3D Print T-Shirt", price: 500 },
    {id: 4, product: "classic Girl T-Shirt", price: 500 },
    {id: 5, product: "Leggings", price: 1500 },
    {id: 6, product: "Girl Trouser", price: 2500 },
    {id: 7, product: "Denim Jeans", price: 3000 },
    {id: 8, product: "Winter Jacket", price: 4000 },
];
 /*Saves products list in localStoarge so persists even after refreshing page*/
if (!localStorage.getItem("products")) {
localStorage.setItem("products",JSON.stringify(store));
}

/*load cart: Saved cart items from localStorage, selects the cart link element to display the number of item in the cart*/

let cartArr = JSON.parse(localStorage.getItem("cart")) || [];

let cartLink = document.getElementById("cart-link");

/* Update cart counter: create update function and displays number of items in cart*/

function updateCartCount() {
   if (cartLink) {
    cartLink.textContent = `Cart (${cartArr.length})`;
   } 
}

updateCartCount();

/*Add to cart: Total operation of the cart section*/

let productSections = document.querySelectorAll(".products section");

productSections.forEach(section => {

    let button = section.querySelector(".add-to-cart");
    if (!button) return;


        let id = Number(section.dataset.id);
        let img = section.dataset.img;

    if (cartArr.some(item => item.id === id)) {
        button.textContent = "Remove from Cart";
    }

    button.addEventListener("click", function () {

        let existingIndex = cartArr.findIndex(item => item.id === id);

        if (existingIndex > -1)  {

            cartArr.splice(existingIndex, 1);
            button.textContent = "Add to Cart";
        } else {
            cartArr.push({ id, img });
            button.textContent = "Remove from Cart";
        }

        localStorage.setItem("cart", JSON.stringify(cartArr));
        updateCartCount();
    });

});

/* Display Cart Items */

let cartContainer = document.getElementById("cart-container");

if (cartContainer) {

    cartContainer.innerHTML= "";

    if (cartArr.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {

        let products = JSON.parse(localStorage.getItem("products"));

        cartArr.forEach(item => {

            let product = products.find(p => p.id === item.id);
            if (!product) return;

            let div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <img src="${item.img}" width="120">
                <h3>${product.product}</h3>
                <p>${product.price}</p>
                `;

                cartContainer.appendChild(div);
        })
    }
}