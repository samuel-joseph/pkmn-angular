import { GymLeader } from "src/app/model/gym-leader-model.model";

export const leon: GymLeader = {
  name: 'Leon',
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/7.png',
  gymImage: 'https://64.media.tumblr.com/1f7e622558ac3f1885a3ac33b1246b80/41dd7972859ea73c-ba/s1280x1920/69ad3a7c4a83368737adfb4d60f84afe6ac2dfb8.png',
  gymLose: false,
  gymPokemons: [
    {
      name: 'seismitoad',
      moves: [
        'weather-ball',
        'mud-shot',
        'gastro-acid'
      ],
      isMain: false
    },
    {
      name: 'dragapult',
      moves: [
        'shadow-ball',
        'flamethrower',
        'thunderbolt',
        'dragon-breath'
      ],
      isMain: false
    },
    {
      name: 'haxorus',
      moves: [
        'poison-jab',
        'iron-tail',
        'earthquake'
      ],
      isMain: false
    },
    {
      name: 'rhyperior',
      moves: [
        'earthquake',
        'stone-edge',
        'mega-horn'
      ],
      isMain: false
    },
    {
      name: 'rillaboom',
      moves: [
        'drum-beating',
        'high-horsepower',
        'endeavor'
      ],
      isMain: false
    },
    {
      name: 'charizard',
      moves: [
        'fire-blast',
        'air-slash',
        'solar-beam'
      ],
      isMain: true
    }
  ]
}