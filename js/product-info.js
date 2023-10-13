

// Url que llama al JSON de los comentarios de cada producto
const URLCOM =
  "https://japceibal.github.io/emercado-api/products_comments/" +
  localStorage.getItem("idProd") +
  ".json";

// Url que llama al JSON de las categorias
const URL =
  "https://japceibal.github.io/emercado-api/cats_products/" +
  localStorage.getItem("catID") +
  ".json";

//Url de info de productos
const URLPROD =
  "https://japceibal.github.io/emercado-api/products/" +
  localStorage.getItem("idProd") +
  ".json";

const products = document.getElementById("productInfo");

// Funcion que muestra la informacion del producto en el div de productos
function productsInfo(item) {
  products.innerHTML += `
      <div>
        <h2 class="text-center pt-5">${item.name}</h2>
        <hr />
        <div class="row">   
          <div class="col-md-8">
            <div
              class="ecommerce-gallery"
              data-mdb-zoom-effect="true"
              data-mdb-auto-height="true"
            >
              <div class="row py-3 shadow-5">
                <div class="col-12 mb-1 position-relative">
                  <div class="lightbox">
                    <button
                      class="btn-block heartbtn position-absolute top-0 end-0 me-3 mt-1"
                      id="heartbtn"
                      onclick="favorite()"
                    >
                      <i class="fas fa-heart" id="heart"></i>
                    </button>
                    <img id="img-lg"
                      src= ${item.images[0]}
                      alt="Gallery image 1"
                      class="ecommerce-gallery-main-img active w-100"
                    />
                  </div>
                </div>
                ${generateImages(item)}
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <strong>Precio</strong>
            <p>${item.currency} ${item.cost}</p>
            <strong>Descripcion</strong>
            <p>${item.description}</p>
            <strong>Categoria</strong>
            <p>${item.category}</p>
            <strong>Cantidad de Vendidos</strong>
            <p>${item.soldCount}</p>
            <button class="btn btn-primary">Comprar<i></i></button>
            <button class="btn btn-dark" id = "cartBtn">
              Agregar
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
        <hr />
      </div>
    `;
}

// Función que muestra la alerta cuando el comentario no cumple los requisitos
function showAlertWarning() {
  document.getElementById("alert-warning").classList.add("show");
  setTimeout(() => {
    document.getElementById("alert-warning").classList.remove("show");
  }, 1000);
}

// Genera las imágenes de la galería del producto
function generateImages(item) {
  let images = "";

  for (let i = 0; i < item.images.length; i++) {
    images += `
      <div class="col-3 mt-1">
        <a href = "#">
          <img onclick="newImg(${item.id}, ${i + 1})"
            src="${item.images[i]}"
            alt="Gallery image ${i + 1}"
            class="w-100"
          />
        </a>
      </div>
    `;
  }

  return images;
}

// Funcion que cambia la imagen, segun la que toques
function newImg(id, num) {
  document.getElementById("img-lg").src = "img/prod" + id + "_" + num + ".jpg";
}

let stars = "";

// Funcion que toma la calificacion y devuelve el html para que se muestre en iconos de estrellas
function starCalif(n) {
  stars = "";
  for (let i = 1; i <= n; i++) {
    stars += `<span class="fa fa-star checked"></span>`;
  }
  for (let j = n; j < 5; j++) {
    stars += `<span class="fa fa-star"></span>`;
  }
  return stars;
}

const commentBtn = document.getElementById("commentbtn");

// Event Listener que agregar el comentario ingresado
commentBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let selectElement = document.getElementById("calificacion");
  let selectedValue = selectElement.value;
  let comment = document.getElementById("textComment");
  let comments = document.getElementById("comText");

  // Creacion de la fecha en el formato solicitado
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hour = ("0" + date.getHours()).slice(-2);
  let minute = ("0" + date.getMinutes()).slice(-2);
  let second = ("0" + date.getSeconds()).slice(-2);
  let dateFormat =
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;

  const storedData = JSON.parse(localStorage.datos);
  if (selectedValue != "Calificación" && comment.value != "") {
    comments.innerHTML += `
      <div class="comentado">
        <div>
          <p><strong>${storedData.email.split("@")[0]}</strong></p>
        </div>  
        <div class="text-muted">
          <small> &nbsp; - ${dateFormat} - &nbsp; </small>
        </div>
        <div class="stars">${starCalif(selectedValue)}</div>
      </div>
      <div>${comment.value}</div> 
      <hr>
    `;
    comment.value = "";
    selectElement.value = "Calificación";
  } else {
    showAlertWarning();
  }
});

// Guarda el id del producto en el localStorage
function setProdId(id) {
  localStorage.setItem("idProd", id);
  window.location = "product-info.html";
}

const productsRelated = document.getElementById("related-products");

// Agrega la información de los productos relacionados
function showRelatedProducts(array) {
  let relatedProductsHTML = "";
  for (let i = 0; i < array.relatedProducts.length; i++) {
    relatedProductsHTML += `
      <div class="col-md-2 img-thumbnail m-1" onclick="setProdId(${array.relatedProducts[i].id})">
        <a class="link-dark" href = "#">
          <img src= ${array.relatedProducts[i].image} class="img-fluid">
          <h6 class="pt-2">${array.relatedProducts[i].name}</h6>
        </a> 
      </div>
    `;
  }

  productsRelated.innerHTML = relatedProductsHTML;
}
function showAlertWarning() {
  document.getElementById("alert-warning").classList.add("show");
  document.getElementById("alert-warning").classList.remove("d-none");
  setTimeout(function () {
    document.getElementById("alert-warning").classList.add("d-none");
  }, 1500);
}

// Funcion que cambia el color del icono de favoritos, cuando le damos click
function favorite() {
  document.getElementById("heartbtn").classList.toggle("heartbtnok");
}

const idProducto = localStorage.getItem("idProd");

async function getJsonData(url) {
  const response = await fetch(url);
  const data = await response.json();
  productsInfo(data);
  showRelatedProducts(data);

  const btnCart = document.getElementById("cartBtn");

  let listCart = JSON.parse(localStorage.getItem("list")) || [];

  btnCart.addEventListener("click", function () {
    const objetoEncontrado = listCart.find((item) => item.id === data.id);
    showAlertWarning();
    if (objetoEncontrado) {
      // El objeto existe en listCart, incrementa count para que no se repita el producto
      objetoEncontrado.count++;
    } else {
      const obj = {
        id: data.id,
        name: data.name,
        count: 1,
        unitCost: data.cost,
        currency: data.currency,
        image: `img/prod${data.id}_1.jpg`,
      };
      listCart.push(obj);
    }

    // Guarda el arreglo en el almacenamiento
    sessionStorage.setItem("list", JSON.stringify(listCart));
    localStorage.setItem("list", JSON.stringify(listCart));
  });
}

getJsonData(URLPROD);

// Funcion que muestra los comentarios que vienen del JSON
function nuevoCom(comments) {
  for (let comment of comments) {
    comText.innerHTML += `
      <div class="comentado">
        <div>
          <p><strong>${comment.user}</strong></p>
        </div>  
        <div class="text-muted">
          <small> &nbsp; - ${comment.dateTime} - &nbsp; </small>
        </div>
        <div>${starCalif(comment.score)}</div>
      </div>
      <div>${comment.description}</div> 
      <hr>
  `;
  }
}

// Funcion que trae el JSON de los comentarios y ejecuta la funcion que los muestra
async function cargarComments(url) {
  const response = await fetch(url);
  const data = await response.json();
  nuevoCom(data);
}

cargarComments(URLCOM);
