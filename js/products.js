let min = document.getElementById('rangeFilterCountMin')
let max = document.getElementById('rangeFilterCountMax')
let displayDiv = document.getElementById('displayDiv')
let lessToMore = document.getElementById('less')
let moreToLess = document.getElementById('more')
let relevance = document.getElementById('relevance')
let categoryName = document.getElementById('categoryName')

function myGreatCode(theValue) {
    let setHowMuch = undefined

    let getFilter = theValue.filter((refilter) => {
        return refilter.cost >= min.value && refilter.cost <= max.value
    })
    
    let displayScreen = () => {
        for (let i = 0; i < setHowMuch.length; i++) {
            displayDiv.innerHTML += `
            <div class='list-group-item list-group-item-action'> 
            <div class='row'> 
            <div class='col-3'> 
            <img src="${theValue[i].image}" class='img-thumbnail'/> 
            </div>  
            <div class='col'>   
            <div class='d-flex w-100 justify-content-between'> 
            <div class='mb-1 mt-1'> 
            <p> ${theValue[i].name} - ${theValue[i].currency} ${theValue[i].cost} 
            </div> 
            </div>
            ${theValue[i].description} 
            </div>${theValue[i].soldCount}  Vendidos </p>
            </div> 
            </div> 
            </div> 
            </div>`;
        }
    }
    
    if (getFilter.length === 0) {
        setHowMuch = theValue
        displayScreen()

    } else if (min.value.length !== 0) {
        setHowMuch = theValue
        theValue = getFilter
        displayScreen()
    }
    
    lessToMore.addEventListener('click', () => {
        for (let a = 0; a < theValue.length; a++) {
            theValue.sort((a, b) => a.cost > b.cost ? -1 : 1)
        }
        setOrganize()
    })
    moreToLess.addEventListener('click', () => {
        for (let a = 0; a < theValue.length; a++) {
            theValue.sort((a, b) => a.cost > b.cost ? 1 : -1)
        }
        setOrganize()
    })
    relevance.addEventListener('click', () => {
        theValue.sort((a, b) => a.soldCount > b.soldCount ? -1 : 1)
        setOrganize()
    })
}

function setOrganize() {
    displayDiv.innerHTML = ''
    myGreatCode(data.products)
}

async function getFetch() {
    let setFetchLink = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem('catID')}.json`
    try {
        const res = await fetch(setFetchLink)
        data = await res.json();
    } catch (error) {
        console.log(error)
    }

    if (data) {
        categoryName.innerHTML += `<p> Veras aqui todos los productos de la categoria <strong>${data.catName}</strong></p>`
        myGreatCode(data.products)
    } else {
        displayDiv.innerHTML += `<div class='d-flex justify-content-center text-danger fw-bold'> <p> Parece que hubo un Error :C </p> </div>`
    }
}
getFetch();