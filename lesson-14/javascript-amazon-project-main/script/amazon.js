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
            <select class="js-quantity-selector-${eachProduct.id}">
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

          <div class="added-to-cart js-added-to-cart-${eachProduct.id}">
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

const addedSetTimedId = {};

document.querySelectorAll('.add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    //console.log(button.dataset);
    let selectQuantity = document.querySelector(`.js-quantity-selector-${button.dataset.productId}`).value;
    selectQuantity = Number(selectQuantity);

    let matchButton;

    const {productId} = button.dataset;

    cart.forEach((item) => {
      if(item.id === productId)
      {
        matchButton = item;
      }
    });

    if(matchButton)
    {
      matchButton.quantity += selectQuantity;
    }
    else
    {
      cart.push({
        productId,
        quantity : selectQuantity
      })
    }

    console.log(cart);
    
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    let addedCart = document.querySelector(`.js-added-to-cart-${productId}`);
    addedCart.classList.add('added-to-cart-visible');

    let SetId = addedSetTimedId[productId];

    if(SetId)
    {
      clearTimeout(SetId);
      addedSetTimedId[productId] = 0;
    }
    
    SetId = setTimeout(() => { addedCart.classList.remove('added-to-cart-visible');}, 2000);
    addedSetTimedId[productId] = SetId;

    console.log(addedSetTimedId);

  });
});