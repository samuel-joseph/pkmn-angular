import { MoveModel } from "./move-model.model"

export interface PokemonModel {
  id: number,
  name: string,
  stats: Array<StatsModel>,
  types: Type,
  moves: Array<MoveModel>, 
  dbMoves: Array<MoveModel>,
  front_image: string,
  back_image: string,
  maxHp: number,
  currentHp: number,
  others: Meta
}

export interface Meta {
  stats: Array<StatsModel>,
  condition: string
}

export interface RegionPokemon {
  id: string,
  url: string
}

export interface Type{
  typeOne: string,
  typeTwo?: string
}

export interface StatsModel{
  base_stat: number,
  name: string
}
