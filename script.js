let totalPrice = 0;
let cart = [];

const totalPriceElement = document.getElementById("totalPriceText");
const listElementParent = document.getElementById("list");


class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

const totalPriceStorage = localStorage.getItem("totalPrice");
if (totalPriceStorage !== null) {
  totalPrice = parseInt(totalPriceStorage);
}

const cartStorage = localStorage.getItem("cart");
if (cartStorage !== null) {

  cart = JSON.parse(cartStorage).map((item) => {
    return new Item(item.name, item.price);

  });
}

refreshUI();

function updateStorage() {
  localStorage.setItem("totalPrice", totalPrice);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addItem(form) {
  const itemName = form.itemName.value;
  const itemPrice = form.itemPrice.value;

  const newItem = new Item(itemName, parseInt(itemPrice));
  totalPrice += parseInt(itemPrice);
  cart.push(newItem);

  localStorage.setItem("totalPrice", totalPrice);
  localStorage.setItem("cart", JSON.stringify(cart));

  refreshUI();

  return false;
}

function refreshUI() {


  totalPriceElement.innerText = `Total Price: $${totalPrice} | Items: ${cart.length}`;
  listElementParent.innerHTML = "";

  cart.forEach((item, index) => {
    const listElement = document.createElement("li");
    const textNode = document.createTextNode(`${item.name} - ${item.price}`);
    const removeButton = document.createElement("button");
    const removeText = document.createTextNode("Remove");

    listElement.appendChild(textNode);
    listElementParent.appendChild(listElement);
    listElement.classList.add("list-group-item", "d-flex", "justify-content-between");

    removeButton.appendChild(removeText);
    removeButton.classList.add("btn", "btn-danger");
    listElement.appendChild(removeButton);

    removeButton.addEventListener("click", () => {
      cart.splice(index, 1);
      totalPrice -= item.price;
      updateStorage();
      refreshUI();
    });
  })


}