import { GymLeader } from "src/app/model/gym-leader-model.model";

export const clay: GymLeader = {
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/3.png',
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