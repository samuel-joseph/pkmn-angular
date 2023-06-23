import { moves, pokeball, regions } from "./environment-constants";
import { ash } from "./environment-gym-leaders/ash";
import { brock } from "./environment-gym-leaders/brock";
import { chuck } from "./environment-gym-leaders/chuck";
import { clay } from "./environment-gym-leaders/clay";
import { misty } from "./environment-gym-leaders/misty";

export const environment = {
  pokeballImg: pokeball,
  gymLeaders: [
    brock,
    misty,
    clay,
    chuck,
    ash
  ],
  region: regions,
  moveDb: moves
}