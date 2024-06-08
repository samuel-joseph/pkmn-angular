import { PokemonModel } from "./pokemon-model.model";

export interface UserModel {
  _id?: string;
  username: string;
  email: string;
  pokemons: Array<PokemonModel>;
  victory: number;
  chance: number;
  password: string;
}