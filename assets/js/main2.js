const htmlPaginaPokemon = document.querySelector(`[data-js="pokedex"]`);
const parametrosURL = new URLSearchParams(window.location.search);
const nomeDoPokemon = parametrosURL.get('nome');
const getPokemonURL = `https://pokeapi.co/api/v2/pokemon/${nomeDoPokemon}`;

async function mostraPokemonNaPagina(urlPokemonApi) {
    await fetch(urlPokemonApi)
        .then(response => response.json())
        .then(pokemon => {
            const types = pokemon.types.map(typeinfo => typeinfo.type.name);

            htmlPokemon = `
              <li style="order:${pokemon.id}" class="card ${types[0]}">
                <img class="card-image" alt="${pokemon.name}" src="${
                pokemon.sprites.other['dream_world'].front_default
            }"/>
                <p class="card-subtitle black"><span>Nº </span>${pokemon.id
                    .toString()
                    .padStart(3, '0')}</p>
                <h2 class="card-title">${pokemon.name}</h2>
                ${pokemon.stats.map(pokemon => {
                    return `<h3 class="card-subtitle black"><span>${pokemon.stat.name}: </span>${pokemon.base_stat}</h3>`;
                })}
              </li>`;

            htmlPaginaPokemon.innerHTML += htmlPokemon.replaceAll(',', '');
        });
}

mostraPokemonNaPagina(getPokemonURL);
