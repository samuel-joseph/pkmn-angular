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
      ],
      isMain: false
    },
    {
      name: 'luxray',
      moves: [
        'thunder-fang',
        'iron-tail',
        'snarl'
      ],
      isMain: false
    },
    {
      name: 'jolteon',
      moves: [
        'thunderbolt',
        'shadow-ball',
        'thunder-wave'
      ],
      isMain: false
    },
    {
      name: 'lanturn',
      moves: [
        'thunder',
        'surf',
        'ice-beam'
      ],
      isMain: false
    },
    {
      name: 'rotom',
      moves: [
        'thunder-wave',
        'air-slash',
        'hex'
      ],
      isMain: false
    },
    {
      name: 'electivire',
      moves: [
        'fire-punch',
        'ice-punch',
        'iron-tail',
        'thunder-punch'
      ],
      isMain: true
    }
  ]
}