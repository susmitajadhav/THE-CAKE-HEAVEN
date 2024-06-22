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

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function displayWishlist() {
    const emptyMessage = document.getElementById("empty-message");
    const wishlistItems = document.getElementById("wishlistItems");

    if (wishlist.length === 0) {
      emptyMessage.style.display = "block";
      wishlistItems.style.display = "none";
    } else {
      emptyMessage.style.display = "none";
      wishlistItems.innerHTML = "";
      wishlist.forEach((cake, index) => {
        if (cake) {
          // Ensure cake is not null
          const wishlistCard = `
      <div class="card product-card wishlist-card mb-4">
        <img src="${cake.image}" class="card-img-top" alt="${cake.name}">
        <div class="p-1">
          <p class="card-text fs-5 fw-bold mb-0">${cake.name}</p>
          <div class="d-flex gap-2 ps-4 pb-2">
          <p class="card-text mb-0">${cake.weight},</p>
          <p class="card-text mb-0">${cake.eggOrEggless},</p>
          <p class="card-text mb-0">Rs. ${cake.price},</p>
          <p class="card-text rating mb-0">${
            cake.rating
            } <span class="text-warning fa fa-star"></span></p>
            </div>
          <button class="btn btn-sm btn-danger" onclick="removeFromWishlist(${index})">Remove</button>
          <button class="btn btn-sm btn-primary" onclick="addFromWishlistToCart(${index})">Add to Cart</button>
        </div>
      </div>
    `;
          wishlistItems.innerHTML += wishlistCard;
        }
      });
    }
  }

  function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    displayWishlist();
  }

  function addFromWishlistToCart(index) {
    const cake = wishlist[index];
    const existingItemIndex = cart.findIndex((c) => c && c.id === cake.id); // Ensure cart item is not null

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cake.quantity = 1; // Initialize quantity
      cart.push({ ...cake }); // Ensure all details are transferred
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    wishlist.splice(index, 1); // Remove from wishlist after adding to cart
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    displayWishlist();
  }

  // Initial display of wishlist items
  displayWishlist();