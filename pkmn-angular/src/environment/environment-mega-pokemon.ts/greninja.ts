import { MoveModel, StatModel } from "src/app/model/move-model.model";
import { PokemonModel, StatsModel } from "src/app/model/pokemon-model.model";

export const mega_greninja = {
  front_image: 'https://gbatemp.net/data/avatars/o/134/134415.jpg?1476051886',
  back_image: 'https://www.rebornevo.com/uploads/monthly_2020_03/658b_2.png.9ddbafaf8b8b5c755f58954226f0ccaa.png',
}

export const modifyWaterShuriken = (move: MoveModel): MoveModel => {
  move.power = 20
  if(move.hits)
    move.hits.min_hits = 3
  return move
}

export const stat_greninja: Array<StatsModel> = [
  {
    name: 'hp',
    base_stat: 72
  },
  {
    name: 'attack',
    base_stat: 145
  },
  {
    name: 'defense',
    base_stat: 67
  },
  {
    name: 'special-attack',
    base_stat: 153
  },
  {
    name: 'special-defense',
    base_stat: 71
  },
  {
    name: 'speed',
    base_stat: 132
  }
]