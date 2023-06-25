import { GymLeader } from "src/app/model/gym-leader-model.model";

export const clay: GymLeader = {
  name: 'Clay',
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/3.png',
  gymImage: 'https://gamepress.gg/pokemonmasters/sites/pokemonmasters/files/2019-08/ch0033_00_yakon_256_battle.ktx.png',
  gymLose: false,
  gymPokemons: [
    {
      name: 'excadrill',
      moves: [
        'bulldoze',
        'metal-claw',
        'slash'
      ]
    },
    {
      name: 'claydol',
      moves: [
        'bulldoze',
        'psybeam',
        'rock-tomb'
      ]
    },
    {
      name: 'golurk',
      moves: [
        'shadow-punch',
        'earthquake',
        'focus-punch'
      ]
    },
    {
      name: 'palpitoad',
      moves: [
        'bubble-beam',
        'mud-shot',
        'aqua-ring'
      ]
    },
    {
      name: 'krokorok',
      moves: [
        'bulldoze',
        'crunch',
        'torment'
      ]
    },
    {
      name: 'sandslash',
      moves: [
        'bulldoze',
        'crush-claw',
        'mud-shot'
      ]
    }
  ]
}