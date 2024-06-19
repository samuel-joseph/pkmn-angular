import { MoveModel } from "./move-model.model";
import { PokemonModel } from "./pokemon-model.model";

export interface UserModel {
  _id?: string;
  username: string;
  email: string;
  pokemons: Array<PokemonModel>;
  victory: number;
  perfectVictory: number
  lose: number;
  totalGames: number;
  password?: string;
  moves?: Array<MoveModel>;
}