document.addEventListener("DOMContentLoaded", function () {
  const urlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
  const products = document.getElementById("cartProduct");

  function agregarTotal(val, arr) {
    const tot = document.getElementById(`total-${arr.id}`);
    const newTotal = val * arr.unitCost;
    tot.innerHTML = `${arr.currency}-${newTotal}`;
    // Actualiza el valor en el Local Storage
    const sessionList = JSON.parse(localStorage.getItem("list"));
    const updatedList = sessionList.map(item => {
      if (item.id === arr.id) {
        item.count = val;
      }
      return item;
    });
    localStorage.setItem("list", JSON.stringify(updatedList));
  }
  

  function addProducts(arr) {
    const productContainer = document.createElement("div");
    productContainer.classList.add("row", "row-cols-5");
    productContainer.innerHTML = `
      <div class="col"><img src="${arr.image}" class="img-fluid" alt="${arr.name}" width = 60px></div>
      <div class="col">${arr.name}</div>
      <div class="col d-none d-lg-block d-md-block d-xl-block">${arr.currency} ${arr.unitCost}</div>
      <div class="col ms-auto"><input type="number" class="form-control form-control-sm m-auto contador" min="1" max="100" value="${arr.count}"> <br></div>
      <div class="col ms-auto" id="total-${arr.id}">${arr.currency}-${arr.unitCost*arr.count}</div>
    
    `;
    products.appendChild(productContainer);

    const contadorInput = productContainer.querySelector(".contador");
    contadorInput.addEventListener("input", function () {
      agregarTotal(contadorInput.value, arr);
    });
  }

  async function getJsonData(url) {
    const response = await fetch(url);
    const data = await response.json();
  
    let listCart = JSON.parse(localStorage.getItem("list")) || [];
    const productIdToAdd = data.articles[0].id;
    const isProductInCart = listCart.some(item => item.id === productIdToAdd); 
    if (!isProductInCart) {
      listCart.push(data.articles[0]);
      localStorage.setItem("list", JSON.stringify(listCart));
    } 
    for (let i = 0; i < listCart.length; i++) {
      addProducts(listCart[i]);
    }
  }
  getJsonData(urlCart); 
});
