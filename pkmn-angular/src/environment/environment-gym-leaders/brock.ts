import { GymLeader } from "src/app/model/gym-leader-model.model";

export const brock: GymLeader = {
  name: 'Brock',
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/1.png',
  gymImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjf-vRz9ryAGNJhTb_-3vdOHjT7EhaZubQZQ&usqp=CAU',
  gymLose: false,
  gymPokemons: [
    {
      name: 'golem',
      moves: [
        'bulldoze',
        'tackle',
        'rock-blast'
      ]
    },
    {
      name: 'ninetales',
      moves: [
        'tackle',
        'flamethrower',
        'extrasensory'
      ]
    },
    {
      name: 'lumineon',
      moves: [
        'tackle',
        'water-gun',
        'water-pulse'
      ]
    },
    {
      name: 'onix',
      moves: [
        'bulldoze',
        'tackle',
        'rock-blast'
      ]
    },
    {
      name: 'crobat',
      moves: [
        'poison-fang',
        'air-cutter',
        'cross-poison',
        'toxic'
      ]
    },
    {
      name: 'steelix',
      moves: [
        'iron-tail',
        'stone-edge',
        'slam'
      ]
    }
  ]
}