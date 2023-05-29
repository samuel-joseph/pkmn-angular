export const regionPokemonsImage = (id: string) => {
  return {
    id: id,
    url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  }
}