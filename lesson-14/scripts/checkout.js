import { getCart, storageCart, deleteFromCart } from "../data/cart.js";
import { products } from "../data/products.js";


let checkoutSumHTML = '';

function updateCartHTML() {
  let cart = getCart();
  cart.forEach((cartItem) => {

    let matchingItem;

    products.forEach((productItem) => {
      if (cartItem.productId === productItem.id) {
        matchingItem = productItem;
      }
    });

    let checkoutHTML = `
    <div class="cart-item-container item-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>
  
      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">
  
        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${(matchingItem.priceCents / 100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link"
            data-delete-id="${matchingItem.id}">
              Delete
            </span>
          </div>
        </div>
  
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
    `;

    checkoutSumHTML += checkoutHTML;
  });

  document.querySelector(".js-order-summary").innerHTML = checkoutSumHTML;
}

updateCartHTML();


document.querySelectorAll('.js-delete-quantity-link').forEach((deleteItem) => {
  deleteItem.addEventListener('click', () => {

    const deleteId = deleteItem.dataset.deleteId;
    deleteFromCart(deleteId);
    document.querySelector(`.item-${deleteId}`).remove();

    console.log("newList:", newCart);
  });
});
