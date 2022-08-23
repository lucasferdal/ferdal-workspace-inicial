function enviar() {
    let validar1 = document.getElementById('validarEmail');
    let validar2 = document.getElementById('validarPassword');

    if (!(validar1.value == '') && !(validar2.value == '')) {
        window.location.assign('main.html')
    } else {
        document.querySelector('#warning').innerHTML = 'Necesitas llenar los campos vacios'
    }
}