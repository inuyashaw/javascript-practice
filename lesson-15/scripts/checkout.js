import { cartHTML } from './checkout/CartSummaryList.js';
import { priceSummaryFunc, calculationItemSize } from './checkout/priceSummary.js';
import { removeFromCart, updateCartDeliveryId } from '../data/cart.js';


function generateHTML() {

  document.querySelector('.js-order-summary')
    .innerHTML = cartHTML();


  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();
        generateHTML();
      });
    });

  document.querySelector('.js-payment-summary').innerHTML =  priceSummaryFunc();
  const cartItem = calculationItemSize();
  document.querySelector('.checkout-header-middle-section').innerHTML = cartItem + ' Items';


  document.querySelectorAll('.js-delivery-option-input').forEach((item) => {
    item.addEventListener('click', () => {
      const { deliveryId, matchingId } = item.dataset;
      updateCartDeliveryId(deliveryId, matchingId);
      
      generateHTML();
    });
  });

}

generateHTML();