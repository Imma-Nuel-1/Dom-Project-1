document.addEventListener("DOMContentLoaded", function () {
  // this is a store to track previous state of the quantity so we don't get negative values when decreasing
  let previousQuantities = {
      1: 0,
      2: 0,
      3: 0
  };

  // Function to adjust quantity of items
  function adjustQuantity(item, operation) {
    const quantityElement = item.querySelector(".quantity");
    let quantity = parseInt(quantityElement.innerText);

    if (operation === "increase") {
      quantity++;
    } else if (operation === "decrease" && quantity > 0) {
      quantity--;
    }

    quantityElement.innerText = quantity;
    updateTotalPrice(item, operation);
  }

  // Function to delete item from the cart
  function deleteItem(item) {
    updateTotalPrice(item, "delete")
    item.remove();
  }

  // Function to update total price
  // pass the item to the update total price so that you dont need to update all items everytime you change one item
  function updateTotalPrice(item, operation) {
    // You should fetch the current total price, this way it doesnt always reset to 0
    let totalPrice = parseFloat(document.querySelector(".total").innerText);
    
    const unitPrice = parseFloat(item.querySelector(".unit-price").innerText);
    const quantity = parseInt(item.querySelector(".quantity").innerText);
    const id = item.dataset.id;
    
    if (operation === 'increase') {
      totalPrice += unitPrice;
    } else if (operation === "decrease" && previousQuantities[id] > 0) {
      totalPrice -= unitPrice;
    } else if (operation === "delete") {
      totalPrice -= unitPrice * quantity
    }
    
    previousQuantities[id] = quantity
    document.querySelector(".total").innerText = totalPrice.toFixed(2) + " $";
  }

  // Function to toggle like status
  function toggleLike(button) {
    button.classList.toggle("liked");
  }

  // Add event listeners for quantity adjustment buttons
  const quantityAdjustButtons = document.querySelectorAll(
    ".fa-plus-circle, .fa-minus-circle"
  );
  quantityAdjustButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const item = button.closest(".card-body[data-id]");
      const operation = button.classList.contains("fa-plus-circle")
        ? "increase"
        : "decrease";
      adjustQuantity(item, operation);
    });
  });

  // Add event listener for delete buttons
  const deleteButtons = document.querySelectorAll(".fa-trash-alt");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const item = button.closest(".card-body");
      deleteItem(item);
    });
  });

  // Add event listener for like buttons
  const likeButtons = document.querySelectorAll(".fa-heart");
  likeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      toggleLike(button);
    });
  });
});
