let pokeForm = document.getElementById('searchPokemon');
let pokemonList = [];
let pokemonsListHtml = [];

const htmlListaPokemons = document.querySelector(`[data-js="pokedex"]`);
const numeroDePokemons = 52;
const getPokemonListURL = `https://pokeapi.co/api/v2/pokemon?limit=${numeroDePokemons}`;

async function getPokemonList() {
    await fetch(getPokemonListURL)
        .then(response => response.json())
        .then(responseJson => {
            pokemonList = responseJson.results;
        });
}

async function mostraPokemonNaPagina(urlPokemonApi) {
    await fetch(urlPokemonApi)
        .then(response => response.json())
        .then(pokemon => {
            const types = pokemon.types.map(typeinfo => typeinfo.type.name);

            htmlPokemon = `
              <li style="order:${pokemon.id}" class="card ${types[0]}">
                <a href="pokemon.html?nome=${pokemon.name}">
                  <img class="card-image" alt="${pokemon.name}" src="${
                pokemon.sprites.other['dream_world'].front_default
            }"/>
                </a>
                <p class="card-subtitle black"><span>Nº </span>${pokemon.id
                    .toString()
                    .padStart(3, '0')}</p>
                <h2 class="card-title">${pokemon.name}</h2>
                <h3 class="card-subtitle black">${types.join(` | `)}</h3>
              </li>`;

            htmlListaPokemons.innerHTML += htmlPokemon;
        });
}

async function mostraTodosOsPokemons() {
    await getPokemonList();

    pokemonList.forEach(pokemon => {
        mostraPokemonNaPagina(pokemon.url);
    });
}

function limpaListaDePokemons() {
    htmlListaPokemons.innerHTML = '';
}

function searchPokemon() {
    limpaListaDePokemons();

    const valorPesquisado = document.getElementById('pokemon').value;

    if (valorPesquisado == '') {
        mostraTodosOsPokemons();
    }

    const listaPokemonsEncontrados = pokemonList.filter(pokemon => {
        return pokemon.name == valorPesquisado;
    });

    const pokemonEncontrado = listaPokemonsEncontrados[0];

    mostraPokemonNaPagina(pokemonEncontrado.url);
}

mostraTodosOsPokemons();

pokeForm.addEventListener('submit', e => {
    e.preventDefault();
    searchPokemon();
});
