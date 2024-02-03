let cart = getCart();
if (!cart) {
  cart = [];
}


export function storageCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCart() {
  return JSON.parse(localStorage.getItem('cart'));
}

export function addToCart(productId) {
  let cart = getCart();
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }

  storageCart(cart);
}