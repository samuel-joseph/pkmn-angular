import { GymLeader } from "src/app/model/gym-leader-model.model";

export const misty: GymLeader = {
  name: 'Misty',
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/2.png',
  gymImage: 'https://4.bp.blogspot.com/_eQ5BBnWj_T8/SV2-CHmkTMI/AAAAAAAAFuY/eSF40l5MGhk/s280/misty219-01.jpg',
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