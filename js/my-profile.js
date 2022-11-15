const cambiarImagen = document.querySelector('#cambiarImagen')
const divFotoPerfil = document.querySelector('#divFotoPerfil')
const cambiarPerfil = document.querySelector('#cambiarPerfil')
const imagenPerfil = document.querySelector('#imagenPerfil')

const primerNombre = document.querySelector('#primerNombre')
const segundoNombre = document.querySelector('#segundoNombre')
const primeroApellido = document.querySelector('#primerApellido')
const segundoApellido = document.querySelector('#segundoApellido')
const email = document.querySelector('#email')
const numero = document.querySelector('#numero')

if (!localStorage.getItem('email')) {
    location.replace('main.html')
}

//Codigo para guardar los valores de los inputs en el localStorage
const guardarLocal = () => {
    if ((primerNombre.value && primeroApellido.value && email.value) !== '') {
        localStorage.setItem('email', email.value)

        let valores = [{
            primerNombre: primerNombre.value,
            segundoNombre: segundoNombre.value,
            primeroApellido: primeroApellido.value,
            segundoApellido: segundoApellido.value,
            email: email.value,
            numero: numero.value,
        }]
        localStorage.setItem('perfil', JSON.stringify(valores))
        alert('Campos guardados con exito!')

    } else {
        alert('Necesitas llenar los campos Nombre, Apellido y Email')
    }
}

//Funcion para setear los valores del localStorage
const setInputValue = () => {
    console.log(localStorage.getItem('email'))
    if (!email.value) {
        email.setAttribute('value', localStorage.getItem('email'))
    }

    let local = JSON.parse(localStorage.getItem('perfil'))[0]

    primerNombre.setAttribute('value', local.primerNombre)
    segundoNombre.setAttribute('value', local.segundoNombre)
    primeroApellido.setAttribute('value', local.primeroApellido)
    segundoApellido.setAttribute('value', local.segundoApellido)
    numero.setAttribute('value', local.numero)
}
setInputValue()

//Eventos para aparecer y desaparecer label de la imagen de perfil con el texto 'cambiar imagen'
divFotoPerfil.addEventListener('mouseenter', () => {
    cambiarImagen.style.display = 'block'
})
divFotoPerfil.addEventListener('mouseleave', () => {
    cambiarImagen.style.display = 'none'
})

//Funcion para cambiar imagen de perfil
cambiarPerfil.addEventListener('change', function () {
    const imagenSeleccionada = this.files[0]

    if (imagenSeleccionada) {
        const reader = new FileReader()

        reader.addEventListener('load', function () {
            imagenPerfil.setAttribute('src', reader.result)
            localStorage.setItem('imagenPerfil', reader.result)
        })

        reader.readAsDataURL(imagenSeleccionada)
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const imagenLocal = localStorage.getItem('imagenPerfil')
    if (imagenLocal) {
        imagenPerfil.setAttribute('src', imagenLocal)
    }
})