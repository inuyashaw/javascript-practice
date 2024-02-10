import { cart } from '../../data/cart.js';
import { findMatchingProduct } from '../../data/products.js';
import { deliveryCentOptional } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';


export function calculationItemSize() {
  let cartSize = 0;
  cart.forEach(element => {
    cartSize += element.quantity;
  });
  return cartSize;
}

export function priceSummaryFunc() {
  let cartSize = 0;
  let totalPriceCent = 0;
  let totalDeliveryPriceCent = 0;
  let totalBeforeTax = 0;
  let totalTaxCent = 0;
  cart.forEach(element => {
    const productItem = findMatchingProduct(element.productId);
    cartSize += element.quantity;
    totalPriceCent += productItem.priceCents * element.quantity;
    totalDeliveryPriceCent += deliveryCentOptional(element.deliveryId);
  });
  totalBeforeTax = totalPriceCent + totalDeliveryPriceCent;
  totalTaxCent = Math.round(totalBeforeTax * 0.1);

  let priceSummaryHTML = `
    <div class="payment-summary-title">
    Order Summary
    </div>

    <div class="payment-summary-row">
    <div>Items (${cartSize}):</div>
    <div class="payment-summary-money">$${formatCurrency(totalPriceCent)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(totalDeliveryPriceCent)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(totalTaxCent)}</div>
    </div>

    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTax + totalTaxCent)}</div>
    </div>

    <button class="place-order-button button-primary">
    Place your order
    </button>
`;
  return priceSummaryHTML;
}
