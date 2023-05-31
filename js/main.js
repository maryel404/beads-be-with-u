function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  var buyButton = document.getElementsByClassName("btn-buy")[0];
  buyButton.addEventListener("click", buyButtonClicked);

  calculateTotal();
}

function resetCart() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }

  calculateTotal();
}

function buyButtonClicked() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  if (cartContent.childElementCount === 0) {
    alert("Your cart is empty. Please add items to your cart before checking out.");
    return;
  }

  alert("Your Order is Placed. Thank You for Purchasing!");

  resetCart();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  var cartBox = buttonClicked.parentElement;
  cartBox.remove();

  calculateTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
  }

  calculateTotal();
}

function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("img-front")[0].src;
  addProductToCart(title, price, productImg);

  calculateTotal();
}

function addProductToCart(title, price, productImg) {
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-product-title");

  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert("You have already added this item to cart");
          return;
      }
  }

  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartBoxContent = `
      <img src="${productImg}" alt="" class="cart-img">
      <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
          <input type="number" value="1" class="cart-quantity">
      </div>
      <i class='bx bxs-trash-alt cart-remove'></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);

  cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
  cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

function calculateTotal() {
  var cartBoxes = document.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
      var cartBox = cartBoxes[i];
      var priceElement = cartBox.getElementsByClassName("cart-price")[0];
      var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
      var price = parseFloat(priceElement.innerText.replace("₱", ""));
      var quantity = quantityElement.value;
      total += price * quantity;
  }

  document.getElementsByClassName("total-price")[0].innerText = "₱" + total.toFixed(2);
}

window.addEventListener("DOMContentLoaded", function () {
  var totalElement = document.querySelector(".total-price");
  totalElement.textContent = "₱0.00";
});

document.addEventListener("DOMContentLoaded", function () {
  resetCart();
  ready();
});


  
//Search me
function search() {
    let filter = document.getElementById('find').value.toUpperCase();
    let item = document.querySelectorAll('.column');
    let l = document.getElementsByTagName('h2');
    for (var i = 0; i <= l.length; i++) {
        let a = item[i].getElementsByTagName('h2')[0];
        let value = a.innerHTML || a.innerText || a.textContent;
        if (value.toUpperCase().indexOf(filter) > -1) {
            item[i].style.display = "";
        } else {
            item[i].style.display = "none";
        }
    }
}


const overlay = document.querySelector('.overlay');
const cartIcon = document.querySelector('.cart-toggle');

function toggleOverlay() {
  overlay.classList.toggle('show');
}

cartIcon.addEventListener('click', function(event) {
  event.preventDefault(); // prevent default link behavior
  toggleOverlay();
});

var cancelBtn = document.querySelector(".cancel-btn");
cancelBtn.addEventListener("click", cancelClicked);

function cancelClicked() {
  // Hide the overlay
  var overlay = document.querySelector(".overlay");
  overlay.classList.remove("show");

  // Change the icon to cart
  var cartToggle = document.querySelector(".cart-toggle");
  cartToggle.innerHTML = '<i class="fa fa-shopping-cart"></i>';
}


function toggleCart() {
  var cartButton = document.querySelector(".cart-toggle");
  var cartIcon = '<i class="fa fa-shopping-cart"></i>';
  var closeIcon = '<i class="fa fa-times-circle"></i>';

  if (cartButton.innerHTML === cartIcon) {
    // Toggle cart visibility or perform any other cart-related actions
    cartButton.innerHTML = closeIcon;
  } else {
    // Toggle cart visibility or perform any other cart-related actions
    cartButton.innerHTML = cartIcon;
  }
}
