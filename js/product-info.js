const pantalla = document.getElementById('pantalla')
const comentario = document.getElementById('coment')
const ingresarTexto = document.getElementById('textocomentario')
const botonTexto = document.getElementById('botonTexto')
const productos = document.getElementById('productos')

//Funcion para mostrar tanto las imagenes del producto, como la informacion del mismo
function getProductsInfo(valor) {
  const { id, name, description, cost, currency, soldCount, category, images } = valor

  pantalla.innerHTML += `
    <div class='container'>
      <div class='d-flex flex-row bd-highlight mb-3'>
        <div class='container'>
          <div class='d-flex'>
            <h2> Informacion adicional de <strong> ${name} </strong> </h2>
            <button class='btn btn-success ms-5' id='comprar' >Comprar</button>
              <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                <div id="liveToast" class="toast hide bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                  <div class="toast-header">
                    <strong class="me-auto">Articulo agregado al carrito con exito!</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                  </div>
                </div>
              </div>
            </div>
            <hr>
            <div class='d-flex flex-row bd-highlight'>
              <div class='mt-3 ms-3' style='width: 50%' >
                <p> <strong>Id:</strong> ${id}</p>
                <p> <strong>Nombre:</strong> ${name}</p>
                <p> <strong>Descripcion:</strong> ${description}</p>
                <p> <strong>Precio:</strong> ${currency} ${cost}</p>
                <p> <strong>Vendidos:</strong> ${soldCount}</p>
                <p> <strong>Categoria:</strong> ${category}</p>
              </div>
              <div id="carouselExampleIndicators" class="carousel slide w-50" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img class='img-fluid border border-dark rounded' src="${images[0]}" class="d-block w-100" >
                  </div>
                  <div class="carousel-item">
                    <img class='img-fluid border border-dark rounded' src="${images[1]}" class="d-block w-100" >
                  </div>
                  <div class="carousel-item">
                    <img class='img-fluid border border-dark rounded' src="${images[2]}" class="d-block w-100" >
                  </div>
                  <div class="carousel-item">
                    <img class='img-fluid border border-dark rounded' src="${images[3]}" class="d-block w-100" >
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <hr>
          </div>
      </div>
    </div>
    `

  //Las siguientes lineas tienen la funcion de guardar en el localstorage el producto al darle 'comprar', de esta manera se envia al carrito
  document.querySelector('#comprar').addEventListener('click', () => {
    // let data = JSON.parse(localStorage.getItem('data'))
    let array = []
    let localValueTotal = JSON.parse(localStorage.getItem('cantidad'))
    
    if (localValueTotal === null) {
      localStorage.setItem('cantidad', JSON.stringify(array))
    }

    let numero = valor
    let local = JSON.parse(localStorage.getItem('cantidad'))
    array = local

    let mapArray = array.map((array) => {
      return array.id
    })

    if (!mapArray.includes(numero.id)) {
      array.push(numero)
    }

    localStorage.setItem('cantidad', JSON.stringify(local))

    const toast = () => {
      let option = {
        animation: true,
        delay: 5000
      }
      let liveToast = document.querySelector('#liveToast')
      let bootToast = new bootstrap.Toast(liveToast, option)
      bootToast.show()
    }
    toast()
  })
}

//Funcion para mostrar los comentarios
function comments(data) {
  for (let i = 0; i < data.length; i++) {
    let element = data[i];
    const { score, description, user, dateTime } = element

    comentario.innerHTML += `
        <div class='w-75'>
          <div class='container shadow rounded p-2 m-2 bg-light border' >
            <div class='container'>
              <div class='d-flex'>
                <strong>${user}</strong> - ${dateTime} - 
                <div class='setStars'>
                </div>
              </div>
              <div>
                ${description}
              </div>
            </div>
          </div>
        </div>
        `

        const setStars = document.querySelectorAll('.setStars')
        
        for (let x = 0; x < score; x++) {
          setStars[i].innerHTML += '<span class="fa fa-star checked"></span>'
        }
    
        for (let z = 5 - score; z > 0; z--) {
          setStars[i].innerHTML += '<span class="fa fa-star"></span>'
        }

  }
}

//Funcion para insertar un nuevo comentario
const enviarMensaje = () => {
  let hora = new Date()

  comentario.innerHTML += `
        <div class='w-75'>
          <div class='container shadow rounded p-2 m-2 bg-light border' >
            <div class='container'>
              <div>
                <strong>${localStorage.getItem('email')}</strong> - ${hora.toLocaleDateString()} a las ${hora.toLocaleTimeString()} - <strong>Estrellas: </strong>
              </div>
              <div>
                ${ingresarTexto.value}
              </div>
            </div>
          </div>
        </div>
        `
}

//Funcion que toma el id del producto seleccionado (en la seccion productos relacionados) para luego recargar la pagina
const cambiarLink = (link) => {
  localStorage.setItem('numeroId', link)
  location.reload()
}

//Funcion para mostrar los productos relacionados
function productosRelacionados(info) {
  let producto = info.relatedProducts

  producto.forEach(e => {
    productos.innerHTML += `
        <div class='p-4' >
            <p> ${e.name} </p>
            <div onclick="cambiarLink(${e.id})" >
            <img src='${e.image}' class='img-fluid img-thumbnail' style='width: 20rem; cursor: pointer;'/>            
            </div>
            </div>
        </div>
        `
  });
}

//Fetch para mostrar la informacion del producto
async function fetchProducts() {
  try {
    const res = await fetch(`https://japceibal.github.io/emercado-api/products/${localStorage.getItem('numeroId')}.json`)
    data = await res.json()
  } catch (error) {
    console.log(error)
  }
  getProductsInfo(data)
  productosRelacionados(data)
}
fetchProducts()

//Fetch para mostrar los comentarios
async function fetchComments() {
  try {
    const res = await fetch(`https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem('numeroId')}.json`)
    data = await res.json()
  } catch (error) {
    console.log(error)
  }
  comments(data)
}
fetchComments()
//180 lineas