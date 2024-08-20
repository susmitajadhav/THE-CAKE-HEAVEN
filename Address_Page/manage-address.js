<<<<<<< HEAD
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

  function showAddressForm() {
document.getElementById("addressForm").style.display = "block";
document.getElementById("savedAddressesList").style.display = "none";
document.getElementById("noSavedAddressMessage").style.display = "none";
}

function saveAddress() {
const address = {
  fullName: document.getElementById("fullNameInput").value,
  mobileNumber: document.getElementById("mobileNumberInput").value,
  address: document.getElementById("addressInput").value,
  city: document.getElementById("cityInput").value,
  state: document.getElementById("stateInput").value,
  zip: document.getElementById("zipInput").value,
  country: document.getElementById("countryInput").value,
  saveAddress: document.getElementById("saveAddressCheckbox").checked,
};

let addresses =
  JSON.parse(localStorage.getItem("savedAddresses")) || [];
addresses.push(address);
localStorage.setItem("savedAddresses", JSON.stringify(addresses));

displaySavedAddresses();
}

function deleteAddress(index) {
let addresses = JSON.parse(localStorage.getItem("savedAddresses"));
addresses.splice(index, 1);
localStorage.setItem("savedAddresses", JSON.stringify(addresses));
displaySavedAddresses();
}

function displaySavedAddresses() {
const addresses =
  JSON.parse(localStorage.getItem("savedAddresses")) || [];
const savedAddresses = document.getElementById("savedAddresses");
savedAddresses.innerHTML = "";

if (addresses.length > 0) {
  addresses.forEach((address, index) => {
    const addressCard = document.createElement("div");
    addressCard.className = "address-card col-lg-3 mx-2";
    addressCard.innerHTML = `
    <p>${address.fullName}</p>
    <p>${address.mobileNumber}</p>
    <p>${address.address}</p>
    <p>${address.city}, ${address.state}, ${address.zip}</p>
    <p>${address.country}</p>
    <button class="btn btn-secondary btn-sm" onclick="editAddress(${index})">Edit</button>
    <button class="btn btn-danger btn-sm" onclick="deleteAddress(${index})">Delete</button>
  `;
    savedAddresses.appendChild(addressCard);
  });

  document.getElementById("savedAddressesList").style.display = "block";
  document.getElementById("addressForm").style.display = "none";
  document.getElementById("noSavedAddressMessage").style.display =
    "none";
} else {
  document.getElementById("noSavedAddressMessage").style.display =
    "block";
}
}

function editAddress(index) {
const addresses = JSON.parse(localStorage.getItem("savedAddresses"));
const address = addresses[index];
document.getElementById("fullNameInput").value = address.fullName;
document.getElementById("mobileNumberInput").value = address.mobileNumber;
document.getElementById("addressInput").value = address.address;
document.getElementById("cityInput").value = address.city;
document.getElementById("stateInput").value = address.state;
document.getElementById("zipInput").value = address.zip;
document.getElementById("countryInput").value = address.country;
document.getElementById("saveAddressCheckbox").checked =
  address.saveAddress;

showAddressForm();

addresses.splice(index, 1); // Remove the address being edited
localStorage.setItem("savedAddresses", JSON.stringify(addresses)); // Update the saved addresses
}


function reviewOrder() {
const selectedAddress = localStorage.getItem("selectedShippingAddress");
if (selectedAddress) {
  window.location.href = "review.html";
} else {
  alert("Please select a shipping address.");
}
}

document.addEventListener("DOMContentLoaded", () => {
displaySavedAddresses();
=======
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

  function showAddressForm() {
document.getElementById("addressForm").style.display = "block";
document.getElementById("savedAddressesList").style.display = "none";
document.getElementById("noSavedAddressMessage").style.display = "none";
}

function saveAddress() {
const address = {
  fullName: document.getElementById("fullNameInput").value,
  mobileNumber: document.getElementById("mobileNumberInput").value,
  address: document.getElementById("addressInput").value,
  city: document.getElementById("cityInput").value,
  state: document.getElementById("stateInput").value,
  zip: document.getElementById("zipInput").value,
  country: document.getElementById("countryInput").value,
  saveAddress: document.getElementById("saveAddressCheckbox").checked,
};

let addresses =
  JSON.parse(localStorage.getItem("savedAddresses")) || [];
addresses.push(address);
localStorage.setItem("savedAddresses", JSON.stringify(addresses));

displaySavedAddresses();
}

function deleteAddress(index) {
let addresses = JSON.parse(localStorage.getItem("savedAddresses"));
addresses.splice(index, 1);
localStorage.setItem("savedAddresses", JSON.stringify(addresses));
displaySavedAddresses();
}

function displaySavedAddresses() {
const addresses =
  JSON.parse(localStorage.getItem("savedAddresses")) || [];
const savedAddresses = document.getElementById("savedAddresses");
savedAddresses.innerHTML = "";

if (addresses.length > 0) {
  addresses.forEach((address, index) => {
    const addressCard = document.createElement("div");
    addressCard.className = "address-card col-lg-3 mx-2";
    addressCard.innerHTML = `
    <p>${address.fullName}</p>
    <p>${address.mobileNumber}</p>
    <p>${address.address}</p>
    <p>${address.city}, ${address.state}, ${address.zip}</p>
    <p>${address.country}</p>
    <button class="btn btn-secondary btn-sm" onclick="editAddress(${index})">Edit</button>
    <button class="btn btn-danger btn-sm" onclick="deleteAddress(${index})">Delete</button>
  `;
    savedAddresses.appendChild(addressCard);
  });

  document.getElementById("savedAddressesList").style.display = "block";
  document.getElementById("addressForm").style.display = "none";
  document.getElementById("noSavedAddressMessage").style.display =
    "none";
} else {
  document.getElementById("noSavedAddressMessage").style.display =
    "block";
}
}

function editAddress(index) {
const addresses = JSON.parse(localStorage.getItem("savedAddresses"));
const address = addresses[index];
document.getElementById("fullNameInput").value = address.fullName;
document.getElementById("mobileNumberInput").value = address.mobileNumber;
document.getElementById("addressInput").value = address.address;
document.getElementById("cityInput").value = address.city;
document.getElementById("stateInput").value = address.state;
document.getElementById("zipInput").value = address.zip;
document.getElementById("countryInput").value = address.country;
document.getElementById("saveAddressCheckbox").checked =
  address.saveAddress;

showAddressForm();

addresses.splice(index, 1); // Remove the address being edited
localStorage.setItem("savedAddresses", JSON.stringify(addresses)); // Update the saved addresses
}


function reviewOrder() {
const selectedAddress = localStorage.getItem("selectedShippingAddress");
if (selectedAddress) {
  window.location.href = "review.html";
} else {
  alert("Please select a shipping address.");
}
}

document.addEventListener("DOMContentLoaded", () => {
displaySavedAddresses();
>>>>>>> 2ce412a5931f38caa696b5619616d0dc25a47f83
});