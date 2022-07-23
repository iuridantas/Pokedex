let pokeForm = document.getElementById('searchPokemon');

const getpokemonurl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const fetchpokemon = () => {

  const pokemonpromises = []

  for (let i = 1; i <= 150; i++){
    pokemonpromises.push(fetch(getpokemonurl(i)).then(response => response.json()))
  }

  Promise.all(pokemonpromises)
    .then(pokemons => {
      const lispokemons = pokemons.reduce((accumulator, pokemon) =>{
        const types = pokemon.types.map(typeinfo => typeinfo.type.name)

        console.log(pokemon)

        accumulator += `
        <li class="card ${types[0]}">
        <img class = "card-image" alt="${pokemon.name}" src="${pokemon.sprites.other["dream_world"].front_default}"/>
          <p class = "card-subtitle"><span>Nº </span>${pokemon.id.toString().padStart(3, '0')}</p>
          <h2 class = "card-title">${pokemon.name}</h2>
          <h3 class = "card-subtitle">${types.join(` | `)}</h3>
        </li>`
        return accumulator
      },``)

      const  ul = document.querySelector(`[data-js = "pokedex"]`)

      ul.innerHTML = lispokemons 
    })
}

fetchpokemon()

pokeForm.addEventListener('submit', e =>{
  e.preventDefault();
  let searchPokemon = document.getElementById('pokemon').value;
  pokemonpromises(searchPokemon, true);
})

function exitModal(){
  const modalPokemon = document.getElementById('modalPokemon');
  modalPokemon.style.display ='none'
  fetchpokemon()
}