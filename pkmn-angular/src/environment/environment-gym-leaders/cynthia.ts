import { GymLeader } from "src/app/model/gym-leader-model.model";

export const cynthia: GymLeader = {
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/6.png',
  gymLose: false,
  gymPokemons: [
    {
      name: 'spiritomb',
      moves: [
        'sucker-punch',
        'shadow-ball'
      ]
    },
    {
      name: 'eelektross',
      moves: [
        'crunch',
        'wild-charge',
        'dragon-claw',
        'flamethrower'
      ]
    },
    {
      name: 'milotic',
      moves: [
        'hydro-pump',
        'blizzard',
        'bulldoze',
        'dragon-tail'
      ]
    },
    {
      name: 'braviary',
      moves: [
        'brave-bird',
        'crush-claw',
        'shadow-claw'
      ]
    },
    {
      name: 'lucario',
      moves: [
        'extremespeed',
        'dragon-pulse',
        'close-combat',
        'aura-sphere'
      ]
    },
    {
      name: 'garchomp',
      moves: [
        'dragon-rush',
        'crunch',
        'earthquake',
        'stone-edge'
      ]
    }
  ]
}