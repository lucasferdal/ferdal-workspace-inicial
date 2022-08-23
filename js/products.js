async function elFecth() {
    let data = undefined;
    let pantalla = document.getElementById('pantalla');

    try {
        const res = await fetch('https://japceibal.gitub.io/emercado-api/cats_products/101.json')
        data = await res.json();
    } catch (error) {
        console.log(error)
    }

    if (data) {
        for (let valor of data.products) {
            pantalla.innerHTML += `
                 <div class='list-group-item list-group-item-action'> 
                    <div class='row'> 
                        <div class='col-3'> 
                            <img src="${valor.image}" class='img-thumbnail'/> 
                        </div>  
                        <div class='col'> 
                            <div class='d-flex w-100 justify-content-between'> 
                                <div class='mb-1 mt-1'>` +
                '<p>' + valor.name + ' - ' + valor.currency + valor.cost + `</div> </div>` + valor.description + '</div>' + valor.soldCount + ' Vendidos' + '</p>' +
                '</div> </div> </div> </div>';
        }
    } else {
        pantalla.innerHTML += `<div class='d-flex justify-content-center text-danger fw-bold'> <p> Parece que hubo un Error :C </p> </div>`
    }
}
elFecth();