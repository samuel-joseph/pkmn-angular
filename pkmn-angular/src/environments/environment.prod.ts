import { moves, pokeball, regions } from "./environment-constants";
import { ash } from "./environment-gym-leaders/ash";
import { brock } from "./environment-gym-leaders/brock";
import { chuck } from "./environment-gym-leaders/chuck";
import { clay } from "./environment-gym-leaders/clay";
import { cynthia } from "./environment-gym-leaders/cynthia";
import { volkner } from "./environment-gym-leaders/volkner";
import { iris } from "./environment-gym-leaders/iris";
import { leon } from "./environment-gym-leaders/leon";
import { misty } from "./environment-gym-leaders/misty";

export const environment = {
  production: true,
  USER_API: 'https://pkmn-expressjs.onrender.com/api/user/',
  AUTH_API: 'https://pkmn-expressjs.onrender.com/api/auth/',
  MOVES_API: 'https://pkmn-expressjs.onrender.com/api/moves/',
  pokeballImg: pokeball,
  gymLeaders: [
    brock,
    misty,
    clay,
    chuck,
    volkner,
    leon,
    iris,
    cynthia,
    ash
  ],
  region: regions,
  moveDb: moves
}