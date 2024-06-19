import { GymLeader } from "src/app/model/gym-leader-model.model";

export const chuck: GymLeader = {
  name: 'Chuck',
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/4.png',
  gymImage: 'https://assets.mycast.io/actor_images/actor-chuck-pokemon-599085_large.jpg?1668914836',
  gymLose: false,
  gymPokemons: [
    {
      name: 'machoke',
      moves: [
        'karate-chop',
        'submission',
        'cross-chop'
      ],
      isMain: false
    },
    {
      name: 'poliwrath',
      moves: [
        'double-slap',
        'water-gun',
        'poison-jab'
      ],
      isMain: false
    },
    {
      name: 'primeape',
      moves: [
        'dynamic-punch',
        'submission'
      ],
      isMain: false
    },
    {
      name: 'machamp',
      moves: [
        'vital-throw',
        'strength',
      ],
      isMain: true
    },
    {
      name: 'hitmonlee',
      moves: [
        'mega-kick',
        'double-kick',
        'triple-kick'
      ],
      isMain: false
    },
    {
      name: 'hitmontop',
      moves: [
        'mega-kick',
        'double-kick',
        'triple-kick'
      ],
      isMain: false
    }
  ]
}