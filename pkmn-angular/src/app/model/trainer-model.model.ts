import { PokemonModel } from "./pokemon-model.model";

export interface TrainerModel {
  _id?: string;
  name: string;
  avatar: string;
  pokemons: Array<PokemonModel>;
  badges: number;
}