import { GymLeader } from "src/app/model/gym-leader-model.model";

export const grimsley: GymLeader = {
  name: 'Grimsley',
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/5.png',
  gymImage: 'https://samurai-gamers.com/wp-content/uploads/2016/12/Black_White_Grimsley.png',
  gymLose: false,
  gymPokemons: [
    {
      name: 'scrafty',
      moves: [
        'crunch',
        'brick-break',
        'poison-jab'
      ]
    },
    {
      name: 'liepard',
      moves: [
        'nigh-slash',
        'fake-out',
        'aerial-ace'
      ]
    },
    {
      name: 'krookodile',
      moves: [
        'crunch',
        'dragon-claw',
        'earthquake'
      ]
    },
    {
      name: 'bisharp',
      moves: [
        'night-slash',
        'x-scissor',
        'metal-claw',
        'aerial-ace'
      ]
    },
    {
      name: 'sharpedo',
      moves: [
        'aqua-jet',
        'swift',
        'horn-attack'
      ]
    },
    {
      name: 'drapion',
      moves: [
        'thunder-fang',
        'poison-fang',
        'fire-fang',
        'crunch'
      ]
    }
  ]
}