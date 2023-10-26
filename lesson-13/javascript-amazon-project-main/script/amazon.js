let productHTML = '';

products.forEach((eachProduct) => {
  productHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${eachProduct.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${eachProduct.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${eachProduct.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${eachProduct.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${(eachProduct.priceCents / 100).toFixed(2)}
          </div>

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

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary"
          data-product-id=${eachProduct.id}>
            Add to Cart
          </button>
        </div>
  `;
});

document.querySelector('.products-grid').innerHTML = productHTML;

document.querySelectorAll('.add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    //console.log(button.dataset);

    let matchButton;

    cart.forEach((item) => {
      if(item.id === button.dataset.productId)
      {
        matchButton = item;
      }
    });

    if(matchButton)
    {
      matchButton.quantity += 1;
    }
    else
    {
      cart.push({
        id : button.dataset.productId,
        quantity : 1
      })
    }

    //console.log(cart);
    
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  });
});