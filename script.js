$(document).ready(function () {
  $("#showLoginForm").on("click", function () {
    $("#signupForm").hide();
    $("#loginForm").show();
    $("#authModalLabel").text("Login");
  });

  $("#showSignupForm").on("click", function () {
    $("#loginForm").hide();
    $("#signupForm").show();
    $("#authModalLabel").text("Sign Up");
  });

  $("#profileIcon").on("click", function () {
    $("#authModal").modal("show");
  });

  $("#signupBtn").on("click", function (e) {
    e.preventDefault();
    handleSignup();
  });

  $("#loginBtn").on("click", function (e) {
    e.preventDefault();
    handleLogin();
  });

  function handleSignup() {
    const fullName = $("#signupFullName").val();
    const email = $("#signupEmail").val();
    const password = $("#signupPassword").val();

    // Perform signup logic (store in localStorage or backend)
    // For simplicity, let's store in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      alert("User already exists with this email or mobile number.");
      return;
    }

    users.push({ fullName, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Clear any existing user session
    localStorage.removeItem("loggedInUser");

    // Update UI after signup
    handleLoginSuccess({ fullName, email });
  }

  function handleLogin() {
    const email = $("#loginEmail").val();
    const password = $("#loginPassword").val();

    // Perform login logic (validate with localStorage or backend)
    // For simplicity, let's use localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      handleLoginSuccess(user);
    } else {
      $("#loginErrorMessage").show();
    }
  }

  function handleLoginSuccess(user) {
    $("#authModal").modal("hide");
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    updateProfileDisplay(user);
  }

  function updateProfileDisplay(user) {
    const profileDropdown = $("#profileDropdown");

    if (user) {
      const dropdownContent = `
            <a class="dropdown-toggle" href="#" role="button" id="profileDropdownLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ${user.fullName}
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdownLink">
                <a class="dropdown-item" href="../Profile Page/profile.html">Profile</a>
                <a class="dropdown-item logout-btn" href="#">Logout</a>
            </div>
        `;
      profileDropdown.html(dropdownContent);
    } else {
      const iconContent = `<i class="fa fa-user profile-icon" id="profileIcon"></i>`;
      profileDropdown.html(iconContent);

      // Re-attach the click event for the profile icon
      $("#profileIcon").on("click", function () {
        $("#authModal").modal("show");
      });
    }
  }

  $(document).on("click", ".logout-btn", function (e) {
    e.preventDefault();
    handleLogout();
  });

  function handleLogout() {
    // Clear user session
    localStorage.removeItem("loggedInUser");
    updateProfileDisplay(null);
  }

  // Initial check on page load to show profile dropdown if user logged in
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  updateProfileDisplay(loggedInUser);
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

$(document).ready(function () {
  $(".story").on("click", function () {
    var videoSrc = $(this).data("video");
    $("#shortModal iframe").attr("src", videoSrc);
  });

  $("#shortModal").on("hidden.bs.modal", function () {
    $("#shortModal iframe").attr("src", "");
  });
});

const slides = document.querySelector(".slidess");
const radioButtons = document.querySelectorAll('input[name="radio-button"]');
let currentIndex = 0;
const slideInterval = 5000; // 5 seconds

function showsSlide(index) {
  slides.style.transform = `translateX(-${index * 100}%)`;
  radioButtons[index].checked = true;
}

function nextsSlide() {
  currentIndex = (currentIndex + 1) % radioButtons.length;
  showsSlide(currentIndex);
}

let autoSlideInterval = setInterval(nextsSlide, slideInterval);

radioButtons.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    clearInterval(autoSlideInterval);
    currentIndex = index;
    showsSlide(index);
    autoSlideInterval = setInterval(nextSlide, slideInterval);
  });
});

let carousels = {};

document.querySelectorAll(".carousel-container").forEach((container, index) => {
  const id = container.id;
  carousels[id] = {
    currentIndex: 0,
    items: container.querySelectorAll(".carousel .item"),
    totalItems: container.querySelectorAll(".carousel .item").length,
    visibleItems: 4,
  };
});

function updateCarousel(id) {
  const carousel = carousels[id];
  const offset = carousel.currentIndex * -25; // 25% for each item since we show 4 items
  document.querySelector(
    `#${id} .carousel`
  ).style.transform = `translateX(${offset}%)`;
}

function nextSlide(id) {
  const carousel = carousels[id];
  carousel.currentIndex = (carousel.currentIndex + 1) % carousel.totalItems;
  if (
    carousel.currentIndex >=
    carousel.totalItems - carousel.visibleItems + 1
  ) {
    carousel.currentIndex = 0;
  }
  updateCarousel(id);
}

function prevSlide(id) {
  const carousel = carousels[id];
  carousel.currentIndex =
    (carousel.currentIndex - 1 + carousel.totalItems) % carousel.totalItems;
  if (carousel.currentIndex < 0) {
    carousel.currentIndex = carousel.totalItems - carousel.visibleItems;
  }
  updateCarousel(id);
}

// Optional: Automatic sliding for all carousels
setInterval(() => {
  Object.keys(carousels).forEach((id) => nextSlide(id));
}, 5000);

Object.keys(carousels).forEach((id) => updateCarousel(id));

let customSliders = {
  "custom-slider-reviews": {
    currentIndex: 0,
    visibleItems: 3,
  },
};

document.querySelectorAll(".custom-slider-container").forEach((container) => {
  const id = container.id;
  customSliders[id].items = container.querySelectorAll(
    ".custom-slider .custom-slide"
  );
  customSliders[id].totalItems = container.querySelectorAll(
    ".custom-slider .custom-slide"
  ).length;
});

function updateCustomSlider(id) {
  const slider = customSliders[id];
  const offset = (slider.currentIndex * -100) / slider.visibleItems;
  document.querySelector(
    `#${id} .custom-slider`
  ).style.transform = `translateX(${offset}%)`;
}

function nextSlides(id) {
  const slider = customSliders[id];
  slider.currentIndex = (slider.currentIndex + 1) % slider.totalItems;
  if (slider.currentIndex >= slider.totalItems - slider.visibleItems + 1) {
    slider.currentIndex = 0;
  }
  updateCustomSlider(id);
}

function prevSlides(id) {
  const slider = customSliders[id];
  slider.currentIndex =
    (slider.currentIndex - 1 + slider.totalItems) % slider.totalItems;
  if (slider.currentIndex < 0) {
    slider.currentIndex = slider.totalItems - slider.visibleItems;
  }
  updateCustomSlider(id);
}

// Optional: Automatic sliding for the reviews slider
setInterval(() => {
  nextSlides("custom-slider-reviews");
}, 5000);

Object.keys(customSliders).forEach((id) => updateCustomSlider(id));
