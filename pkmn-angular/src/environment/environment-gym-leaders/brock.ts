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
      ],
      isMain: false
    },
    {
      name: 'ninetales',
      moves: [
        'tackle',
        'flamethrower',
        'extrasensory'
      ],
      isMain: false
    },
    {
      name: 'lumineon',
      moves: [
        'tackle',
        'water-gun',
        'water-pulse'
      ],
      isMain: false
    },
    {
      name: 'onix',
      moves: [
        'bulldoze',
        'tackle',
        'rock-blast'
      ],
      isMain: false
    },
    {
      name: 'crobat',
      moves: [
        'poison-fang',
        'air-cutter',
        'cross-poison',
        'toxic'
      ],
      isMain: false
    },
    {
      name: 'steelix',
      moves: [
        'iron-tail',
        'stone-edge',
        'slam'
      ],
      isMain: true
    }
  ]
}