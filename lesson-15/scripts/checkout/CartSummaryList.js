import { cart} from '../../data/cart.js';
import { findMatchingProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryDayOptional } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';


export function cartHTML() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = findMatchingProduct(productId);

    const deliveyDay = deliveryDayOptional(cartItem.deliveryId);

    cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${deliveyDay}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
        ${deliveryOptionsHTML(cartItem)}
        </div>
      </div>
    </div>
  `;

    //console.log(deliveryOptionsHTML(cartItem));
  });
  return cartSummaryHTML;
}


function deliveryOptionsHTML(cartItem) {
  let deliverySummaryStr = '';
  const today = dayjs();
  deliveryOptions.forEach((item) => {
    let deliveryStr = `
    <div class="delivery-option">
      <input type="radio" 
      ${cartItem.deliveryId === item.deliveryId ? 'checked' : ''}
        class="delivery-option-input js-delivery-option-input"
        data-delivery-id=${item.deliveryId}
        data-matching-id=${cartItem.productId}
        name="delivery-option-${cartItem.productId}">
      <div>
        <div class="delivery-option-date">
          ${today.add(item.deliveryDay, 'day').format('dddd, MMMM DD')}
        </div>
        <div class="delivery-option-price">
          ${item.deliveryCents ? formatCurrency(item.deliveryCents) + '-' : 'FREE'} Shipping
        </div>
      </div>
    </div>     
  `;
    deliverySummaryStr += deliveryStr;
  });

  return deliverySummaryStr;
}





