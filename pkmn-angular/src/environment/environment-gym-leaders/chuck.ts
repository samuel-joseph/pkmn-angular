import { GymLeader } from "src/app/model/gym-leader-model.model";

export const chuck: GymLeader = {
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/1.png',
  gymLose: false,
  gymPokemons: [
    {
      name: 'machoke',
      moves: [
        'karate-chop',
        'submission',
        'cross-chop'
      ]
    },
    {
      name: 'poliwrath',
      moves: [
        'double-slap',
        'water-gun',
        'poison-jab'
      ]
    },
    {
      name: 'primeape',
      moves: [
        'dynamic-punch',
        'submission'
      ]
    },
    {
      name: 'machamp',
      moves: [
        'vital-throw',
        'strength',
      ]
    },
    {
      name: 'hitmonlee',
      moves: [
        'mega-kick',
        'double-kick',
        'triple-kick'
      ]
    },
    {
      name: 'hitmontop',
      moves: [
        'mega-kick',
        'double-kick',
        'triple-kick'
      ]
    }
  ]
}