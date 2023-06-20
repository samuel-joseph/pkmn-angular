import { GymLeader } from "src/app/model/gym-leader-model.model";

export const brock: GymLeader = {
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/1.png',
  gymLose: false,
  gymPokemons: [
    {
      name: 'golem',
      moves: [
        'bulldoze',
        'tackle',
        'rock-blast'
      ]
    },
    {
      name: 'ninetales',
      moves: [
        'tackle',
        'flamethrower',
        'extrasensory'
      ]
    },
    {
      name: 'lumineon',
      moves: [
        'tackle',
        'water-gun',
        'water-pulse'
      ]
    },
    {
      name: 'onix',
      moves: [
        'bulldoze',
        'tackle',
        'rock-blast'
      ]
    },
    {
      name: 'crobat',
      moves: [
        'poison-fang',
        'air-cutter',
        'cross-poison'
      ]
    },
    {
      name: 'steelix',
      moves: [
        'iron-tail',
        'stone-edge',
        'slam'
      ]
    }
  ]
}