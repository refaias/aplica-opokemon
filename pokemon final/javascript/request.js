const pokeContainer = document.querySelector('[data-js="data-container"]')

const pokeMegas = document.querySelector('[data-js="poke-megas"]')
const pokeG = document.querySelector('[data-js="poke-GMax"]')
const pokeContainerMegas = document.querySelector('[data-js="poke-containerMegas"]')
const megasbutton = document.querySelector('[data-js="megas-button"]')
const gmaxButton = document.querySelector('[data-js="gmax-button"]')
let megasId = 10033
let gMaxId = 10195

const megasUrl = `https://pokeapi.co/api/v2/pokemon/${megasId}`

const paginationInfo =(() =>{
    const limit = 15
    let offset = 0

    const getLimit = () => limit
    const getOffset = () => offset
    const incrementOffset = () => offset += 15

    return {getLimit, getOffset, incrementOffset }
})()



const getPokemon = async () =>{
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${paginationInfo.getLimit()}&offset=${paginationInfo.getOffset()}`)
        if(!response.ok){
            throw new Error('não deu certo a requisição')
        }
        
    
    const {results: pokeApiResults} = await response.json() 
    await renderPokemons(pokeApiResults)
    return
    }
    catch({name, messege}){
    Error
    }
}



const getPokeInfo = async pokeApiResults =>{
    const promises = pokeApiResults.map(result => fetch(result.url))   
    const responses = await Promise.allSettled(promises)
    const fulfilled = responses.filter(promise => promise.status === 'fulfilled')
    const pokePromises = fulfilled.map(url => url.value.json())
    const pokemon = await Promise.all(pokePromises)
    paginationInfo.incrementOffset()
    return pokemon
}

const renderPokemons = async pokeApiResults =>{
    const infos = await getPokeInfo(pokeApiResults)
    const selectInfos = infos.map(({id,name, sprites, types}, index) => 
    ({id, name, types, sprites}))
let fragment = document.createDocumentFragment()

const renderPokemon = selectInfos.forEach(({id,name, sprites, types}) => {
    const typess = types.map(({type})=> type.name)
    const li = document.createElement('li') 
    const img = document.createElement('img')
    const h6 = document.createElement('h6')
    const h4 = document.createElement('h4')
    const span = document.createElement('span')
    const span2 = document.createElement('span')

    li.setAttribute('class', 'col-md-3 caixa-p')
    img.setAttribute('id', id)
    img.setAttribute('src', `${sprites['other']['official-artwork']['front_default']}`)
    img.setAttribute('class', `img-fluid bg-white`)
    h6.setAttribute('class', `numero`)
    h6.innerText = `N° ${id}`
    h4.setAttribute('class', `mr-6`)
    h4.innerText = `${name}`
    span.setAttribute('class', `btn btn-${typess[0]} btn-sm`)
    span2.setAttribute('class', `btn btn-${typess[1]} btn-sm`)

li.append(img, h6, h4, span, span2)
fragment.append(li)
return id
})

pokeContainer.append(fragment)
}

const observerNextPokemon = () =>{ 
    const pokemonObserver = new IntersectionObserver(async ([lastPokemon],observer) => {
        if(!lastPokemon.isIntersecting){
            return
        }
    
        const pokemons = await fetchPokemon()
        observer.unobserve(lastPokemon.target)
    })
    
    const lastChild = document.querySelector('[data-js="data-container"]').lastChild
    pokemonObserver.observe(lastChild)
    
    }

const variantes = async (id, limit, pokemonBlock, pokeinner, pokemonNone) =>{
    for(let i = id; i <= limit; i++){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const {id, name, sprites, types} = await response.json()

        const arrayInfo = [{id, name, sprites, types}]

    
    const renderPokemon = arrayInfo.forEach(({id, name, sprites, types}) => {
        const typess = types.map(({type})=>`<span class="btn btn-${type.name} btn-sm"></span>`)
        const lis = `
        <li class="col-md-3 caixa-p">
        <img id="${id}" src="${sprites['other']['official-artwork']['front_default']}" class="img-fluid bg-white">
        <h6 class="numero">N° ${id}</h6>
        <h4 class="mr-6">${name}</h4>
        ${typess}
        </li>`

        // const li = document.createElement('li') 
        // const img = document.createElement('img')
        // const h6 = document.createElement('h6')
        // const h4 = document.createElement('h4')
        // const span = document.createElement('span')
        // const span2 = document.createElement('span')
    
        // li.setAttribute('class', 'col-md-3 caixa-p')
        // img.setAttribute('id', id)
        // img.setAttribute('src', `${sprites['other']['official-artwork']['front_default']}`)
        // img.setAttribute('class', `img-fluid bg-white`)
        // h6.setAttribute('class', `numero`)
        // h6.innerText = `N° ${id}`
        // h4.setAttribute('class', `mr-6`)
        // h4.innerText = `${name}`
        // span.setAttribute('class', `btn btn-${typess[0]} btn-sm`)
        // span2.setAttribute('class', `btn btn-${typess[1]} btn-sm`)

        pokemon.setAttribute('class', `d-none`)
        pokemonNone.setAttribute('class', `d-none`)
        pokemonBlock.setAttribute('class', `d-block`)
        // li.append(img, h6, h4, span, span2)
        //  console.log(li)
        pokeinner.innerHTML += lis
    })

    }
}

megasbutton.addEventListener('click', async ()=>{
    variantes(megasId, 10090, pokemonMegass, pokeMegas, pokemonGMAX)
})

gmaxButton.addEventListener('click', async ()=>{
    variantes(gMaxId, 10228, pokemonGMAX, pokeG, pokemonMegass )
})

const fetchPokemon = async () =>{
    await getPokemon()
    observerNextPokemon()
}


fetchPokemon()

// `<li class="col-md-3 caixa-p">
// <img id="10086" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10086.png" class="img-fluid bg-white">
// <h6 class="numero">N° 10086</h6>
// <h4 class="mr-6">hoopa-unbound</h4>
// <span class="btn btn-psychic btn-sm"></span>
// <span class="btn btn-dark btn-sm"></span>
// </li>`