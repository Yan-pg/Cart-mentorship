const buttonStartAnimation = document.querySelector(".start_animation");
const divContainer = document.querySelector(".container_cart");
const contentCart = document.querySelector(".content_cart");
const finalPrice = document.querySelector(".final_price");
const inputCoupon = document.querySelector('.input-coupon')
let isOpen = false;
let itemsString = "";
let countFinalPrice = 0;


let cartItems = [
  {
    id: '77ebf90c-364d-11ee-be56-0242ac120002',
    name: "Jordan",
    price: "400",
    quantity: 2
  },
  {
    id: '816cdf78-364d-11ee-be56-0242ac120002',
    name: "Yeezy",
    price: "2000",
    quantity: 1
  },
  {
    id: '8e6721d4-364d-11ee-be56-0242ac120002',
    name: "Pulma disk",
    price: "400",
    quantity: 1
  },
  {
    id: '96b6c362-364d-11ee-be56-0242ac120002',
    name: "Nike shocks",
    price: "600",
    quantity: 1
  },
];

function resetOnScreen() {
  itemsString = "";
  countFinalPrice = 0;
}

function removeItem(id) {
  cartItems = cartItems.filter((item) => {
    return item.id !== id;
  });
  resetOnScreen();
  onShowOnScreenElements();
}

function lessItem(id) {
  for (let index = 0; index < cartItems.length; index++) {
    if (id === cartItems[index].id) {
      const newQuantity = cartItems[index].quantity -1
      
   
      if (newQuantity < 1) {
        removeItem(cartItems[index].id)
        return
      }

      cartItems[index].quantity = newQuantity
      
      resetOnScreen()
      onShowOnScreenElements()
    }
  }
}

function addItem(id) {
  for (let index = 0; index < cartItems.length; index++) {
    if (id === cartItems[index].id) {
      const newQuantity = cartItems[index].quantity + 1
      
      cartItems[index].quantity = newQuantity

      resetOnScreen()
      onShowOnScreenElements()
    }
  }
}

function showItem(item) {
  itemsString =
    itemsString +
    `
      <div>${item.name}</div>
      <div>${Number(item.price) * item.quantity}</div>
      <div>${item.quantity}</div>
      <div class="container_button">
        <button onclick="lessItem('${item.id}')">-</button>
        <button onclick="addItem('${item.id}')">+</button>
      </div>
      <button onclick="removeItem('${item.id}')">remove item</button>
      <br />
  `;

  countFinalPrice = (Number(item.price) * item.quantity) + countFinalPrice;
}

function onShowOnScreenElements() {
  cartItems.forEach(showItem);
  contentCart.innerHTML = itemsString;
  finalPrice.innerHTML = `total: ${countFinalPrice}`;
}

const openOrCloseCart = () => {
  if (!isOpen) {
    divContainer.classList.remove("container_cart_start_close_animation");
    divContainer.classList.add("container_cart_start_open_animation");
    divContainer.style.right = 0;
    onShowOnScreenElements();

    isOpen = true;

    return;
  }

  
  divContainer.classList.remove("container_cart_start_open_animation");
  divContainer.classList.add("container_cart_start_close_animation");
  divContainer.style.right = "-42rem";
  isOpen = false;
  resetOnScreen()
};
