import { moves, pokeball, regions } from "./environment-constants";
import { ash } from "./environment-gym-leaders/ash";
import { brock } from "./environment-gym-leaders/brock";
import { chuck } from "./environment-gym-leaders/chuck";
import { clay } from "./environment-gym-leaders/clay";
import { cynthia } from "./environment-gym-leaders/cynthia";
import { grimsley } from "./environment-gym-leaders/grimsley";
import { iris } from "./environment-gym-leaders/iris";
import { leon } from "./environment-gym-leaders/leon";
import { misty } from "./environment-gym-leaders/misty";

export const environment = {
  pokeballImg: pokeball,
  gymLeaders: [
    brock,
    misty,
    clay,
    chuck,
    grimsley,
    leon,
    iris,
    cynthia,
    ash
  ],
  region: regions,
  moveDb: moves
}