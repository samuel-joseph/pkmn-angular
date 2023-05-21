export const region = {
  kanto: {
    firstPokemon: 1,
    lastPokemon: 151
  },
  johto: {
    firstPokemon: 152,
    lastPokemon: 251
  },
  hoenn: {
    firstPokemon: 252,
    lastPokemon: 386
  }
}

export const regionPokemonsImage = (id: string) => {
  return {
    id: id,
    url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
  }
}