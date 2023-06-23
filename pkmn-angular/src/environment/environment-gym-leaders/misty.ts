import { GymLeader } from "src/app/model/gym-leader-model.model";

export const misty: GymLeader = {
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/1.png',
  gymLose: false,
  gymPokemons: [
    {
      name: 'starmie',
      moves: [
        'swift',
        'thunder',
        'bubblebeam'
      ]
    },
    {
      name: 'togetic',
      moves: [
        'wing-attack',
        'fairy-wind',
        'extrasensory'
      ]
    },
    {
      name: 'gyarados',
      moves: [
        'hyper-beam',
        'crunch',
        'hydro-pump'
      ]
    },
    {
      name: 'psyduck',
      moves: [
        'confusion',
        'water-gun',
        'scratch'
      ]
    },
    {
      name: 'seaking',
      moves: [
        'water-fall',
        'swift',
        'horn-attack'
      ]
    },
    {
      name: 'horsea',
      moves: [
        'water-gun',
        'quick-attack',
        'swift'
      ]
    }
  ]
}