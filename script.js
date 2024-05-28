document.addEventListener("DOMContentLoaded", function () {
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
    updateTotalPrice();
  }

  // Function to delete item from the cart
  function deleteItem(item) {
    item.remove();
    updateTotalPrice();
  }

  // Function to update total price
  function updateTotalPrice() {
    const items = document.querySelectorAll(".card-body");
    let totalPrice = 0; // Reset totalPrice to 0

    items.forEach(function (item) {
      const unitPrice = parseFloat(
        item.querySelector(".unit-price").innerText.replace("$", "")
      );
      const quantity = parseInt(item.querySelector(".quantity").innerText);
      totalPrice += unitPrice * quantity;
    });

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
      const item = button.closest(".card-body");
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

  // Initial update of total price
  updateTotalPrice();
});
