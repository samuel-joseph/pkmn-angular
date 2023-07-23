import { GymLeader } from "src/app/model/gym-leader-model.model";

export const iris: GymLeader = {
  name: 'Iris',
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/9.png',
  gymImage: 'https://archives.bulbagarden.net/media/upload/d/d0/Black_2_White_2_Iris.png',
  gymLose: false,
  gymPokemons: [
    {
      name: 'lapras',
      moves: [
        'surf',
        'ice-beam',
        'thunderbolt',
        'sing'
      ]
    },
    {
      name: 'archeops',
      moves: [
        'acrobatics',
        'dragon-claw',
        'rock-slide'
      ]
    },
    {
      name: 'aggron',
      moves: [
        'earthquake',
        'double-edge',
        'rock-slide'
      ]
    },
    {
      name: 'druddigon',
      moves: [
        'rock-slide',
        'flamethrower',
        'dragon-tail',
        'focus-blast'
      ]
    },
    {
      name: 'hydreigon',
      moves: [
        'flamethrower',
        'dragon-pulse',
        'surf'
      ]
    },
    {
      name: 'haxorus',
      moves: [
        'earthquake',
        'x-scissor',
        'dual-chop',
        'dragon-dance'
      ]
    }
  ]
}