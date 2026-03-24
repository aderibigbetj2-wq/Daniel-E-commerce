/* Load data*/
let products = JSON.parse(localStorage.getItem("products")) || [];
let cartArr = JSON.parse(localStorage.getItem("cart")) || [];

let cartContainer = document.getElementById("cart-items");
let totalElement = document.getElementById("cart-total");
let cartLink = document.getElementById("cart-link");

/* Update Header Counter */
function updatedCartCount() {
    if (cartLink) {
    cartLink.textContent = `Cart (${cartArr.length})`;
    }
}

/* Render Cart*/
function renderCart() {

    cartContainer.innerHTML = "";
    let total = 0;

    if(cartArr.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.textContent = "Total: 0kr";
        updatedCartCount();
        return;
    }

    cartArr.forEach(cartItem => {

        let productData = products.find(p => p.id === cartItem.id);
        if (!productData) return;

        total += productData.price;

        let item = document.createElement("article");
        item.classList.add("cart-item");

         item.innerHTML = `
        <figure>
           <img src="${cartItem.img}" alt="${productData.product}" width="80">
           <figcaption>${productData.product}</figcaption>
        </figure>
        <p>${productData.price}kr</p>
        <button onclick="removeItem(${productData.id})">Remove</button>
        `;

        cartContainer.appendChild(item);

    });

     totalElement.textContent = "Total: " + total + "kr";
    updatedCartCount();

    
    }

    /* Remove Item*/
function removeItem(id) {
    cartArr = cartArr.filter(item => item.id !==id);
    localStorage.setItem("cart", JSON.stringify(cartArr));
    renderCart();
}

/*initialize*/

renderCart();