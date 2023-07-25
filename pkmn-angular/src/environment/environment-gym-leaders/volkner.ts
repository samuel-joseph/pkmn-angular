import { GymLeader } from "src/app/model/gym-leader-model.model";

export const volkner: GymLeader = {
  name: 'Volkner',
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/5.png',
  gymImage: 'https://www.serebii.net/pokemonmasters/syncpairs/volkner.png',
  gymLose: false,
  gymPokemons: [
    {
      name: 'raichu',
      moves: [
        'iron-tail',
        'volt-tackle',
        'thunder',
        'thunder-wave'
      ]
    },
    {
      name: 'luxray',
      moves: [
        'thunder-fang',
        'iron-tail',
        'snarl'
      ]
    },
    {
      name: 'jolteon',
      moves: [
        'shadow-ball',
        'thunderbolt',
        'thunder-wave'
      ]
    },
    {
      name: 'lanturn',
      moves: [
        'thunder',
        'surf',
        'ice-beam'
      ]
    },
    {
      name: 'rotom',
      moves: [
        'thunder-wave',
        'air-slash',
        'hex'
      ]
    },
    {
      name: 'electivire',
      moves: [
        'fire-punch',
        'ice-punch',
        'iron-tail',
        'thunder-punch'
      ]
    }
  ]
}