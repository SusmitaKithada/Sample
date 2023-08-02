// Get the cart overlay, close icon, and cart icon elements
// var cartOverlay = document.querySelector(".cart-overlay");
// var closeIcon = document.querySelector(".close-icon");
// var cartIcon = document.querySelector(".cart-icon");

// // Add click event listener to close icon
// closeIcon.addEventListener("click", function() {
//   cartOverlay.style.display = "none";
// });

// // Add click event listener to cart icon
// cartIcon.addEventListener("click", function() {
//   // cartOverlay.style.visibility = "visible";
//   cartOverlay.style.display = "block";
// });
const showCart = () => {
    document.getElementById('cart-container').style.display = "block";
  }
  const hiddenCart = () => {
    document.getElementById('cart-container').style.display = "none";
  }
  // Add click event listener to each "Add to Cart" button
  var addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      var productName = this.parentNode.querySelector("h4").textContent;
      var productPrice = this.parentNode.querySelector("p").textContent;
  
      if (!isItemInCart(productName)) {
        addToCart(productName, parseFloat(productPrice.slice(1)));
      }
    });
  });
  
  // Function to check if the item is already in the cart
  function isItemInCart(name) {
    var cartItems = document.querySelectorAll("#cart-list li");
    for (var i = 0; i < cartItems.length; i++) {
      var itemName = cartItems[i].querySelector("span:nth-of-type(1)").textContent;
      if (itemName === name) {
        return true;
      }
    }
    return false;
  }
  
  
  // Function to add item to the cart
  function addToCart(name, price) {
    var cartList = document.getElementById("cart-list");
    
    // Create new list item element
    var listItem = document.createElement("li");
    
    // Create span elements for name, price, and delete icon
    var nameSpan = document.createElement("span");
    nameSpan.textContent = name;
    var priceSpan = document.createElement("span");
    priceSpan.textContent ="₹" + price.toFixed(2);
    var deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash delete-icon";
    
    // Add click event listener to delete icon
    deleteIcon.addEventListener("click", function() {
      listItem.remove();
      updateCartCookie();
    });
    
    // Append name, price, and delete icon to list item
    listItem.appendChild(nameSpan);
    listItem.appendChild(priceSpan);
    listItem.appendChild(deleteIcon);
    
    // Append list item to cart list
    cartList.appendChild(listItem);
    
    // Update cart cookie
    updateCartCookie();
  }
  
  // Function to update the cart cookie
  function updateCartCookie() {
    var cartItems = document.querySelectorAll("#cart-list li");
    var cartData = [];
    
    cartItems.forEach(function(item) {
      var name = item.querySelector("span:nth-of-type(1)").textContent;
      var price = item.querySelector("span:nth-of-type(2)").textContent;
      cartData.push({ name: name, price: price });
    });
    
    // Store the cart data in the cookie
    document.cookie = "cart=" + JSON.stringify(cartData) + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  }
  
  // Function to retrieve the cart data from the cookie
  function getCartDataFromCookie() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.startsWith("cart=")) {
        var cartData = cookie.substring(5);
        return JSON.parse(cartData);
      }
    }
    return [];
  }
  
  // Function to initialize the cart with the data from the cookie
  function initializeCart() {
    var cartData = getCartDataFromCookie();
    var cartList = document.getElementById("cart-list");
    
    cartData.forEach(function(item) {
      var listItem = document.createElement("li");
      
      var nameSpan = document.createElement("span");
      nameSpan.textContent = item.name;
      var priceSpan = document.createElement("span");
      priceSpan.textContent = item.price;
      var deleteIcon = document.createElement("i");
      deleteIcon.className = "fas fa-trash delete-icon";
      
      deleteIcon.addEventListener("click", function() {
        listItem.remove();
        updateCartCookie();
      });
      
      listItem.appendChild(nameSpan);
      listItem.appendChild(priceSpan);
      listItem.appendChild(deleteIcon);
      
      cartList.appendChild(listItem);
    });
  }
  
  // Call the initializeCart function when the page loads
  window.addEventListener("load", initializeCart);
  