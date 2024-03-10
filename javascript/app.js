const pokemon = document.querySelector('[data-js="data-container"]') 
const pokemonNormais = document.querySelector('[data-js="pokemons-normais"]')
const pokemonMegass = document.querySelector('[data-js="poke-containerMegas"]')
const pokemonGMAX = document.querySelector('[data-js="poke-gmax"]')
const onePokemon = document.querySelector('[data-js="poke-container"]')
const pokeContaine = document.querySelector('[data-js="primary-container"]')
const prev = document.querySelector('.btn-prev')
const id = document.querySelector('[data-js="poke-id"]')
const caixaMestre = document.querySelector('[data-js="data-containeMaster"]')





const getPokeWeaknesses = async type => {
    const getWeaknesses = await fetch(`https://pokeapi.co/api/v2/type/${type[0]}`)
    const weaknesses = await getWeaknesses.json()
    const defineWeaknesses = weaknesses['damage_relations']['double_damage_from']
    return defineWeaknesses.map(weaknesse =>`<span class="btn btn-${weaknesse.name} btn-lg"></span>`)
}

const getPokemons = async ids => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ids}`)
    const {name, height, id, weight, stats, types, abilities, sprites} = await response.json()

    const stat = stats.map(stat => stat['base_stat'])
    const statTotal = stat.reduce((acc, stat) => acc += stat, 0)
    const statMedia = Math.floor(statTotal / 6) 
    const weightKilo = weight / 10
    const heightMeter = height / 10
    const type = types.map(type => type.type.name)
    const abilite = abilities.map(abilite => abilite.ability.name)
    const weaknesses = await getPokeWeaknesses(type)

    pokemonNormais.setAttribute('class', `d-none`)
    pokemonMegass.setAttribute('class', `d-none`)
    pokeContainerMegas.setAttribute('class', `d-none`)
    onePokemon.classList.add(`d-block`)


    
    const renderOnePokemon = `
    <div class="row ">
    <div class="col-6">
        <button id="${id}" class=" btn-prev ml-5">
        <i class="fas fa-arrow-alt-circle-left "></i></button>

    </div>
    <div class="col-6">
        <button id="${id}" class=" btn-next mr-5">
        <i class="fas fa-arrow-alt-circle-right"></i>
        </button>
    </div>
    <div class="clearfix"></div>
   </div>



            <div data-js="poke-id" class="container cont1 ${id}">
            <!-- container -->
            
            <div class="row">
                <!-- row -->
    
                <div class="col-md-6  ">
                <div class="col-md-12  data-js="poke-img" ">
                <img src="${sprites['other']['official-artwork']['front_default']}"  class="img-fluid">
                </div>
                </div>

                <div class="col-md-6  ">
                <div class="row">
                    <div data-js="poke-descricao" class="col-md-12 descricao">
                    <h3>movimentos assinatura</h3>
                    <h4 class="ability">${abilite[0]}</h4>
                    <h4 class="ability">${abilite[1]}</h4>
                    </div>

                    <div class="col-12  caixa-info">
                    <div class="row">
                        <div data-js="poke-medidas" class="col-md-6">
                        <h5>Peso</h5>
                        <h6>${weightKilo}kg</h6>
            
                        <h5>Altura</h5>
                        <h6> ${heightMeter}m </h6>
            
                        
                        </div>
            
                        <div data-js="poke-nome" class="col-md-6">
                        <h5>Nome</h5>
                        <h6 id="${name}" class="name">${name}</h6>
            
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <!-- /row -->
            
            <div class="row ">
                <div class="col-md-6 status">
                <div data-js="poke-status1" id="status" class="status">
                    <h2>Status Base</h2>
                    <div class="row">
                    <div class="col-lg-6 ">
                        <h6>HP</h6>
                        <p>${stat[0]}</p>
            
                        <h6>Defesa</h6>
                        <p>${stat[2]}</p>
            
                        <h6>Ataque</h6>
                        <p>${stat[1]}</p>
            
                        <h6>Ataque Especial</h6>
                        <p>${stat[3]}</p>
                    </div>
            
                    <div data-js="poke-status2" class="col-md-6  ">
                        <h6> Defesa Especial </h6>
                        <p>${stat[4]}</p>
            
                        <h6>Velocidade</h6>
                        <p>${stat[5]}</p>
            
                        <h6>Total</h6>
                        <p>${statTotal}</p>
            
                        <h6>Média</h6>
                        <p>${statMedia}</p>
                </div>
            </div>
            
            </div>
            </div>
                <div class="col-md-6 tipo ">
                <div class="row">
                <div data-js="poke-tipos" class="col-md-12">
                    <h2>Tipo</h2>
                    <span class="btn btn-${type[0]} btn-lg">  </span>
                    <span class="btn btn-${type[1]} btn-lg">  </span>
                </div>
                <div data-js="poke-fraqueza" class="col-md-12 fraqueza">
                    <h2>Fraqueza</h2>
                    ${weaknesses}
                </div>
                </div>
                </div>
            </div>
            </div>
    `
    onePokemon.innerHTML = renderOnePokemon

}



pokeContaine.addEventListener('click', async event => {
const ids = event.target.id
console.log(ids)
const newId = Number(ids)
await getPokemons(newId)
console.log(typeof newId )


})


caixaMestre.addEventListener('click', async event => {
    const value = event.target.id
    const newValue = Number(value)
if(Array.from(event.target.classList).includes('btn-prev')){
    getPokemons(newValue - 1)
}
if(Array.from(event.target.classList).includes('btn-next')){
    getPokemons(newValue + 1)
}})

