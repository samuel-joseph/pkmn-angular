import { GymLeader } from "src/app/model/gym-leader-model.model";

export const iris: GymLeader = {
  name: 'Iris',
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/9.png',
  gymImage: 'https://samurai-gamers.com/wp-content/uploads/2016/12/Black_White_Grimsley.png',
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