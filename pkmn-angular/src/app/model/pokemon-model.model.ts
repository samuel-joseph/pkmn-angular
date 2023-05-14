import { MoveModel } from "./move-model.model"

export interface PokemonModel {
  id: number,
  name: string,
  stats: Array<StatsModel>,
  types: Type,
  moves: Array<MoveModel>, 
  front_image: string,
  back_image: string
}

export interface Type{
  typeOne: string,
  typeTwo?: string
}

export interface StatsModel{
  base_stat: number,
  name: string
}
