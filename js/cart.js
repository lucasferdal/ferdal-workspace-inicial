const cart              = document.getElementById('cart')
const productCost       = document.querySelector('#productCostText')
const percentage        = document.querySelector('#comissionText')
const totalCostProduct  = document.querySelector('#totalCostText')
let localValue          = JSON.parse(localStorage.getItem('cantidad'))
let checkboxValue       = undefined
let productsValue       = []

function getFetch(info) {
    //Codigo para mostrar en pantalla el producto precargado, trayendolo desde el link que se nos proporciono en la Entrega 5
    const { name, count, unitCost, currency, image, id } = info.articles[0]
    cart.innerHTML += `
    <table class="table">
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Nombre</th>
                <th scope="col">Costo</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody id='ingresar'>
            <tr class='productoSection'>
                <td><img src='${image}' style='height: 2rem' /></td>
                <td><p>${name}</p></td>
                <td><p>${currency} ${unitCost}</p></td>
                <td><input class='text-center' type='number' style='width: 5rem' oninput='firstProduct(value, ${unitCost})' value='${count}' id='peuValue' min='1' e.preventDefault()/></td>
                <td id='totalCost'><p>${currency} ${unitCost}</p></td>
                <td><button class="fa fa-trash" value='${id}' onclick='borrarArticulo(value)'></button></td>
            </tr>
        </tbody>
    </table>
    `
    //Se envia el producto a productsValue en el puesto 0, para que el array se mantenga mas ordenado (debido a que este producto siempre se mostrara arriba del todo)
    productsValue.unshift({ id: 0, newId: id, currency, total: unitCost })
    console.log(localValue)
    //Bucle for que recorre todos los elementos almacenados en el Localstorage y los muestra en pantalla
    for (let i = 0; i < localValue.length; i++) {
        let element = localValue[i];
        let { name, cost, images, currency, id} = element

        document.querySelector('#ingresar').innerHTML += `
        <tr class='productoSection'>
            <td><img src='${images[0]}' style='height: 2rem' /></td>
            <td><p>${name}</p></td>
            <td><p>${currency} ${cost}</p></td>
            <td><input class='text-center granArray' type='number' style='width: 5rem' value='1' id='units' min='1' oninput='setArray(${i}, ${cost})'/></td>
            <td class='totalCostArray'><p>${currency} ${cost}</p></td>
            <td><button class="fa fa-trash" value='${id}' onclick='borrarArticulo(value)'></button></td>
        </tr>
        `

        //Nuevamente, se guarda cada elemento en productsValue(su id, moneda y precio), igualando su id con 'i'
        newId = id
        id = i + 1
        total = cost
        productsValue.push({ id, newId, currency, total })
    }
    setProductValue()
}

//Addeventlistener para cada checkbox con el tipo de envio
document.querySelector('#radioOne').addEventListener('change', () => {
    checkboxValue = 15
    setProductValue()
})
document.querySelector('#radioTwo').addEventListener('change', () => {
    checkboxValue = 7
    setProductValue()
})
document.querySelector('#radioThree').addEventListener('change', () => {
    checkboxValue = 5
    setProductValue()
})

//Funcion para eliminar el articulo seleccionado
const borrarArticulo = (productId) => {
    let borrar = document.getElementsByClassName('fa-trash')

    let encontrarLocal = localValue.splice(localValue.indexOf(localValue.find(e => e.id == productId)), 1)
    localStorage.setItem('cantidad', JSON.stringify(localValue))

    let encontrarProducts = productsValue.find(e => e.newId == productId)
    location.reload()
    console.log(encontrarProducts)

}

function firstProduct(count, unitCost) {
    //Codigo para calcular el precio del elemento precargado del carrito (entrega 5) multiplicando su precio por el unitCost
    const totalCost = document.querySelector('#totalCost')
    const peuValue  = document.querySelector('#peuValue')
    let max = count * unitCost

    //Condicional para que el usuario no pueda disminuir a 0 o menos la cantidad del producto a comprar
    if (peuValue.value <= 0) {
        peuValue.value = 1
        max = 15200
    }

    totalCost.innerHTML = `
    <p>USD ${max}</p>
    `
    //Se llama a la siguiente funcion, pasandole como parametro '0' como id y 'max' como costo final
    filterProductValue(0, max)
}

const setArray = (id, cost) => {
    //Al igual que mas arriba, con las siguientes lineas se calcula el precio unitario de cada producto multiplicado por la cantidad del producto (de todos los productos excepto el precargado en el carrito)
    let granArray = document.getElementsByClassName('granArray')[id]
    let totalCostArray = document.getElementsByClassName('totalCostArray')[id]
    id++

    if (granArray.value <= 0) {
        granArray.value = 1
    }

    id--
    let currency = JSON.parse(localStorage.getItem('cantidad'))[id].currency
    console.log(currency)

    let total = granArray.value * cost

    totalCostArray.innerHTML = `
    <p>${currency} ${total}</p>
    `

    filterProductValue(id, total)
    console.log(productsValue)
}

function filterProductValue(id, total) {
    let mapProducts = productsValue.map(e => {
        return e.id
    })

    let searchValue = productsValue.find(e => {
        return e.id === id
    })

    !mapProducts.includes(id) ? productsValue.push({ id, total }) : searchValue.total = total
    setProductValue()
}

function setProductValue() {

    let productMap = productsValue.map(e => {
        if (e.currency === 'UYU') {
            return Math.round(e.total / 40)
        } else {
            return e.total
        }
    })

    let reduceTotal = productMap.reduce((a, b) => {
        return a = a + b
    })

    let division        = Math.round(reduceTotal * (checkboxValue / 100))
    let percentageTotal = 'USD ' + division
    let totalValue      = 'USD ' + reduceTotal

    !division ? percentageTotal = 'USD ' + Math.round(reduceTotal * (5 / 100)) : totalValue = 'USD ' + (division + reduceTotal)

    productCost.innerHTML       = 'USD ' + reduceTotal
    percentage.innerHTML        = percentageTotal
    totalCostProduct.innerHTML  = totalValue
}

const numero        = document.querySelector('#numero')
const calle         = document.querySelector('#calle')
const esquina       = document.querySelector('#esquina')
const classRadioUno = document.querySelectorAll('.classRadioUno')
const classRadioDos = document.querySelector('.classRadioDos')
const radioUno      = document.querySelector('#radioUno')
const radioDos      = document.querySelector('#radioDos')

//Funcion para validar input
function valid(e) {
    e.classList.remove('is-invalid')
    e.classList.add('is-valid')
}
//Funcion para invalidar input
function invalid(e) {
    e.classList.remove('is-valid')
    e.classList.add('is-invalid')
}

function validGran() {
    numero.value    === '' ? invalid(numero) : valid(numero)
    calle.value     === '' ? invalid(calle) : valid(calle)
    esquina.value   === '' ? invalid(esquina) : valid(esquina)
}

function checkDisabled() {
    classRadioDos.disabled = true

    radioUno.addEventListener('change', () => {
        classRadioUno.forEach(e => {
            e.disabled = false

        })
        classRadioDos.disabled = true
    })
    radioDos.addEventListener('change', () => {
        classRadioUno.forEach(e => {
            e.disabled = true

        })
        classRadioDos.disabled = false
    })
}

(() => {
    'use strict'

    let forms       = document.querySelectorAll('.needs-validate')
    let modalState  = document.querySelector('.modalState')

    Array.prototype.slice.call(forms)
        .forEach(form => {
            form.addEventListener('submit', event => {

                if (!form.checkValidity()) {
                    form.addEventListener('input', validGran)
                    event.stopPropagation()
                    modalState.innerHTML = `
                    <p>Debes llenar los campos vacios!</p>
                    `
                } else {
                    modalState.innerHTML = ''
                    alert('Compra realizada con exito!')
                    location.reload()
                }

                form.classList.add('was-validated')
                event.preventDefault()

            }, false)
        })
})()
checkDisabled()

async function carFetch() {
    try {
        const res = await fetch(`https://japceibal.github.io/emercado-api/user_cart/25801.json`)
        data = await res.json()
    } catch (error) {
        console.log(error)
    }
    getFetch(data)
    // localStorage.setItem('data', JSON.stringify(data.articles[0]))
}
carFetch()
//224