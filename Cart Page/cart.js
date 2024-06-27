document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.getElementById("darkModeSwitch");

  function applyDarkModePreference() {
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
      toggleSwitch.checked = true;
    } else {
      document.body.classList.remove("dark-mode");
      toggleSwitch.checked = false;
    }
  }

  function toggleDarkMode() {
    if (toggleSwitch.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }

  toggleSwitch.addEventListener("change", toggleDarkMode);
  applyDarkModePreference();
});
document.addEventListener("DOMContentLoaded", function () {
    var currentLocation = window.location.pathname;
    var navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === currentLocation) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartPage() {
    const cartItems = document.getElementById("cartItems");
    const orderSummary = document.getElementById("order-summary");
    const emptyMessage = document.getElementById("empty-message");
    const emptyCart = document.getElementById("carts-items");

    if (cart.length === 0) {
      orderSummary.style.display = "none";
      emptyCart.style.display = "none";
      emptyMessage.style.display = "block";
    } else {  
      orderSummary.style.display = "block";
      emptyCart.style.display = "block";
      cartItems.innerHTML = "";
      cart.forEach((item, index) => {
        const cartItem = `
      <div class="cake-card d-flex justify-content-between align-items-center mb-3">
          <img src="${item.image}" class="cake-img" alt="${item.name}">
          <div>
              <h5>${item.name}</h5>
              <p>${item.weight}, ${item.flavor || ""}, ${
          item.eggOrEggless || ""
        }</p>
              <p>Rs. ${item.price}</p>
          </div>
          <div class="d-flex align-items-center">
              <button class="btn btn-outline-secondary" onclick="decreaseQuantity(${index})">-</button>
              <input type="text" value="${
                item.quantity
              }" class="form-control mx-2 text-center" style="width: 50px;" readonly>
              <button class="btn btn-outline-secondary" onclick="increaseQuantity(${index})">+</button>
          </div>
          <div class="px-4">
          <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
      </div>
      </div>
  `;
        cartItems.innerHTML += cartItem;
      });
    }
    updateOrderSummary();
  }

  function increaseQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartPage();
  }

  function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartPage();
    }
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartPage();
  }

  function updateOrderSummary() {
    const itemsPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shippingCharge = 40;
    const totalPrice = itemsPrice + shippingCharge;

    document.getElementById("itemsPrice").textContent = `₹${itemsPrice}`;
    document.getElementById(
      "shippingCharge"
    ).textContent = `₹${shippingCharge}`;
    document.getElementById("totalPrice").textContent = `₹${totalPrice}`;
  }

  function proceedToReview() {
    window.location.href = "../Address Page/address.html";
  }

  updateCartPage();