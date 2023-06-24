import { GymLeader } from "src/app/model/gym-leader-model.model";

export const leon: GymLeader = {
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/7.png',
  gymLose: false,
  gymPokemons: [
    {
      name: 'aegislash',
      moves: [
        'sacred-sword',
        'shadow-ball',
        'flash-cannon'
      ]
    },
    {
      name: 'dragapult',
      moves: [
        'shadow-ball',
        'flamethrower',
        'thunderbolt',
        'dragon-breath'
      ]
    },
    {
      name: 'haxorus',
      moves: [
        'poison-jab',
        'iron-tail',
        'earthquake'
      ]
    },
    {
      name: 'rhyperior',
      moves: [
        'earthquake',
        'stone-edge',
        'mega-horn'
      ]
    },
    {
      name: 'rillaboom',
      moves: [
        'drum-beating',
        'high-horsepower',
        'endeavor'
      ]
    },
    {
      name: 'charizard',
      moves: [
        'fire-blast',
        'air-slash',
        'solar-beam'
      ]
    }
  ]
}