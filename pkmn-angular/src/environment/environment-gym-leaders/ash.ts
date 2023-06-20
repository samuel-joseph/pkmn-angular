import { GymLeader } from "src/app/model/gym-leader-model.model";

export const ash: GymLeader = {
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/3.png',
  gymLose: false,
  gymPokemons: [
    {
      name: 'charizard',
      moves: [
        'thunder-claw',
        'flame-thrower',
        'air-slash'
      ]
    },
    {
      name: 'greninja',
      moves: [
        'water-shuriken',
        'cut',
        'hydro-pump'
      ]
    },
    {
      name: 'pikachu',
      moves: [
        'thunder',
        'quick-attack',
        'iron-tail'
      ]
    },
    {
      name: 'infernape',
      moves: [
        'thunder-punch',
        'fire-punch',
        'flamethrower'
      ]
    },
    {
      name: 'dragonite',
      moves: [
        'dragon-claw',
        'thunder',
        'wing-attack'
      ]
    },
    {
      name: 'gengar',
      moves: [
        'shadow-ball',
        'psychic',
        'thunder-punch'
      ]
    }
  ]
}