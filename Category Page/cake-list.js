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

      const cakes = [
        {
          id: 1,
          name: "Chocolate Cake",
          weight: "1 kg",
          eggOrEggless: "Eggless",
          availability: "In Stock",
          price: 500,
          rating: 4.7,
          image: "CC1.jpg",
          description: "Delicious chocolate cake",
        },
        {
          id: 2,
          name: "Vanilla Cake",
          weight: "1.5 kg",
          eggOrEggless: "With Egg",
          availability: "In Stock",
          price: 600,
          rating: 4.5,
          image: "CC1.jpg",
          description: "Delicious vanilla cake",
        },
        {
          id: 3,
          name: "Black-Forest Cake",
          weight: "0.5 kg",
          eggOrEggless: "With Egg",
          availability: "In Stock",
          price: 350,
          rating: 4.5,
          image: "CC1.jpg",
          description: "Delicious Black-Forest cake",
        },
        {
          id: 4,
          name: "Red Velvet Cake",
          weight: "5 kg",
          eggOrEggless: "With Egg",
          availability: "Out of Stock",
          price: 4000,
          rating: 4.5,
          image: "CC1.jpg",
          description: "Delicious Red Velvet cake",
        },
        {
          id: 5,
          name: "Red Velvet Cake",
          weight: "4 kg",
          eggOrEggless: "With Egg",
          availability: "Out of Stock",
          price: 4000,
          rating: 4.5,
          image: "CC1.jpg",
          description: "Delicious Red Velvet cake",
        },
        {
          id: 6,
          name: "Red Velvet Cake",
          weight: "3 kg",
          eggOrEggless: "With Egg",
          availability: "Out of Stock",
          price: 4000,
          rating: 4.5,
          image: "CC1.jpg",
          description: "Delicious Red Velvet cake",
        },
        {
          id: 7,
          name: "Red Velvet Cake",
          weight: "2.5 kg",
          eggOrEggless: "With Egg",
          availability: "Out of Stock",
          price: 4000,
          rating: 4.5,
          image: "CC1.jpg",
          description: "Delicious Red Velvet cake",
        },
        {
          id: 8,
          name: "Red Velvet Cake",
          weight: "2 kg",
          eggOrEggless: "With Egg",
          availability: "Out of Stock",
          price: 4000,
          rating: 4.5,
          image: "CC1.jpg",
          description: "Delicious Red Velvet cake",
        },

        // Add more cakes as needed
      ];

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      function displayCakes() {
        const productList = document.getElementById("productList");
        productList.innerHTML = "";
        cakes.forEach((cake, index) => {
          const isWishlisted = wishlist.some(
            (item) => item && item.id === cake.id
          );
          const heartClass = isWishlisted ? "fas" : "far";
          const heartColor = isWishlisted ? "red" : "black";
          const cakeCard = `
      <div class="card product-card mb-4 mt-4">
        <img src="${cake.image}" class="card-img-top" alt="${cake.name}">
        <span class="wishlist-icon mx-3" onclick="toggleWishlist(${index}, this)">
          <i class="${heartClass} fa-heart heart-icon" style="scale:1.8; color:${heartColor};"></i>
        </span>
        <div class="d-flex justify-content-between px-1">
          <div class="px-2">
            <span><p class="card-text fs-5 fw-bold">${cake.name}</p></span>
            <span><p class="small card-text">${cake.weight}</p></span>
            <span><p class="small card-text">Rs. ${cake.price}</p></span>
            <p class="small card-text rating">${cake.rating} <span class="text-warning fa fa-star"></span></p>
          </div>
          <div class="align-self-end">
            <button class="btn border qb-btn my-2 " onclick="quickBuy(${index})">Quick Buy</button>
          </div>
        </div>
      </div>
    `;
          productList.innerHTML += cakeCard;
        });
      }

      function toggleWishlist(index, element) {
        const cake = cakes[index];
        const wishlistIndex = wishlist.findIndex(
          (item) => item && item.id === cake.id
        );

        if (wishlistIndex > -1) {
          wishlist.splice(wishlistIndex, 1);
          element.querySelector("i").classList.replace("fas", "far");
          element.querySelector("i").style.color = "black"; // Change color to black when removed from wishlist
        } else {
          wishlist.push(cake);
          element.querySelector("i").classList.replace("far", "fas");
          element.querySelector("i").style.color = "red"; // Change color to red when added to wishlist
        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      }

      function applyFilters() {
        const weightFilter = document.getElementById("weightFilter").value;
        const availabilityFilter =
          document.getElementById("availabilityFilter").value;
        const priceRange = document.getElementById("priceRange").value;
        const eggFilter = document.getElementById("eggFilter").value;

        const filteredCakes = cakes.filter((cake) => {
          const matchesWeight =
            weightFilter === "any" ||
            (weightFilter === "0.5_kg" && cake.weight === "0.5 kg") ||
            (weightFilter === "1_kg" && cake.weight === "1 kg") ||
            (weightFilter === "1.5_kg" && cake.weight === "1.5 kg") ||
            (weightFilter === "2_kg" && cake.weight === "2 kg") ||
            (weightFilter === "2.5_kg" && cake.weight === "2.5 kg") ||
            (weightFilter === "3_kg" && cake.weight === "3 kg") ||
            (weightFilter === "4_kg" && cake.weight === "4 kg") ||
            (weightFilter === "5_kg" && cake.weight === "5 kg");

          const matchesAvailability =
            availabilityFilter === "any" ||
            (availabilityFilter === "in_stock" &&
              cake.availability === "In Stock") ||
            (availabilityFilter === "out_of_stock" &&
              cake.availability === "Out of Stock");

          const matchesPrice = cake.price <= priceRange;
          const matchesEgg =
            eggFilter === "any" ||
            (eggFilter === "egg" && cake.eggOrEggless === "With Egg") ||
            (eggFilter === "eggless" && cake.eggOrEggless === "Eggless");

          return (
            matchesWeight && matchesAvailability && matchesPrice && matchesEgg
          );
        });

        displayFilteredCakes(filteredCakes);
      }

      function updatePriceRange() {
        const priceRangeValue = document.getElementById("priceRange").value;
        document.getElementById(
          "priceRangeValue"
        ).textContent = `Rs. 200 - Rs. ${priceRangeValue}`;
      }

      function displayFilteredCakes(cakes) {
        const productList = document.getElementById("productList");
        productList.innerHTML = "";
        cakes.forEach((cake, index) => {
          const isWishlisted = wishlist.some(
            (item) => item && item.id === cake.id
          );
          const heartClass = isWishlisted ? "fas" : "far";
          const heartColor = isWishlisted ? "red" : "black";
          const cakeCard = `
      <div class="card product-card mb-4 mt-4">
        <img src="${cake.image}" class="card-img-top" alt="${cake.name}">
        <span class="wishlist-icon mx-3" onclick="toggleWishlist(${index}, this)">
          <i class="${heartClass} fa-heart heart-icon" style="scale:1.8; color:${heartColor};"></i>
        </span>
        <div class="d-flex justify-content-between px-1">
          <div class="px-2">
            <span><p class="card-text fs-5 fw-bold">${cake.name}</p></span>
            <span><p class="small card-text">${cake.weight}</p></span>
            <span><p class="small card-text">Rs. ${cake.price}</p></span>
            <p class="small card-text rating">${cake.rating} <span class="text-warning fa fa-star"></span></p>
          </div>
          <div class="align-self-end">
            <button class="btn border qb-btn my-2 " onclick="quickBuy(${index})">Quick Buy</button>
          </div>
        </div>
      </div>
    `;
          productList.innerHTML += cakeCard;
        });
      }

      function addToCart(cakeId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cake = cakes.find((c) => c.id === cakeId);
        const existingItemIndex = cart.findIndex((c) => c.id === cakeId);

        if (existingItemIndex > -1) {
          cart[existingItemIndex].quantity += 1;
        } else {
          cake.quantity = 1; // Initialize quantity
          cart.push(cake);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "cart.html";
      }

      let selectedCake = {};

      function quickBuy(index) {
        selectedCake = cakes[index];
        document.getElementById("modalProductImage").src = selectedCake.image;
        document.getElementById("modalProductName").innerText =
          selectedCake.name;
        document.getElementById("modalProductDescription").innerText =
          selectedCake.description || "No description available.";
        document.getElementById("modalProductWeight").value = "1"; // Default to 1 kg
        document.getElementById("modalProductFlavor").value = "Chocolate"; // Default flavor
        document.getElementById("modalProductEgg").value = "withEgg"; // Default egg option
        updatePrice();
        $("#quickBuyModal").modal("show");
      }

      function updatePrice() {
        const weight = parseFloat(
          document.getElementById("modalProductWeight").value
        );
        const eggOption = document.getElementById("modalProductEgg").value;

        let basePrice = 700 * weight; // Assuming 1kg is 700, scale accordingly
        if (eggOption === "eggless") {
          basePrice += 50;
        }

        document.getElementById("modalProductPrice").value = basePrice; // Store only the numeric value
      }

      function addToCart(cartItem) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItemIndex = cart.findIndex(
          (c) =>
            c.id === cartItem.id &&
            c.weight === cartItem.weight &&
            c.flavor === cartItem.flavor &&
            c.eggOption === cartItem.eggOption
        );

        if (existingItemIndex > -1) {
          cart[existingItemIndex].quantity += 1;
        } else {
          cartItem.quantity = 1; // Initialize quantity
          cart.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "cart.html"; // Replace with the actual URL of your cart page
      }

      function buyNow() {
        const selectedWeight =
          document.getElementById("modalProductWeight").value;
        const selectedFlavor =
          document.getElementById("modalProductFlavor").value;
        const selectedEggOption =
          document.getElementById("modalProductEgg").value;
        const selectedPrice =
          document.getElementById("modalProductPrice").value;

        const cartItem = {
          ...selectedCake,
          weight: selectedWeight + " Kg", // Store only the numeric value
          flavor: selectedFlavor,
          eggOption: selectedEggOption,
          price: parseFloat(selectedPrice), // Store only the numeric value
        };

        addToCart(cartItem);
      }

      // Add a new cake
      function addCake(cake) {
        cakes.push(cake);
        localStorage.setItem("cakes", JSON.stringify(cakes));
        displayCakes();
      }

      // Initial display of cakes
      displayCakes();