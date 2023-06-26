export interface GymLeader {
  gymBadge: string,
  gymLose?: boolean,
  gymImage: string,
  name: string,
  gymPokemons?: any
}

export interface GymPokemon {
  name: string,
  moves: Array<string>
}

