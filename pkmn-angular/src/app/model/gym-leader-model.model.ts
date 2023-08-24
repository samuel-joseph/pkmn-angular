export interface GymLeader {
  gymBadge: string,
  gymLose?: boolean,
  gymImage: string,
  name: string,
  gymPokemons: Array<GymPokemon>
}

export interface GymPokemon {
  name: string,
  moves: Array<string>,
  isMain: boolean
}

