import { moves, pokeball, regions } from "./environment-constants";
import { ash } from "./environment-gym-leaders/ash";
import { brock } from "./environment-gym-leaders/brock";
import { misty } from "./environment-gym-leaders/misty";

export const environment = {
  pokeballImg: pokeball,
  gymLeaders: [
    brock,
    misty,
    ash
  ],
  region: regions,
  moveDb: moves
}