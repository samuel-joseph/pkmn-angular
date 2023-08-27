import { GymLeader } from "src/app/model/gym-leader-model.model";

export const cynthia: GymLeader = {
  name: 'Cynthia',
  gymBadge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/6.png',
  gymImage: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ceca9bb7-d2c7-45f3-8f79-b8dd137839d2/ddtnqzy-d42831be-fb0e-4819-b667-5ffee4d18bd3.png/v1/fill/w_510,h_415/cynthia_pokemon_render_png_by_sispros_ddtnqzy-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDE1IiwicGF0aCI6IlwvZlwvY2VjYTliYjctZDJjNy00NWYzLThmNzktYjhkZDEzNzgzOWQyXC9kZHRucXp5LWQ0MjgzMWJlLWZiMGUtNDgxOS1iNjY3LTVmZmVlNGQxOGJkMy5wbmciLCJ3aWR0aCI6Ijw9NTEwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.G6xVU_mvjXzjy0R3KHKRvd_W5cd94uKHB847vcy4NcY',
  gymLose: false,
  gymPokemons: [
    {
      name: 'spiritomb',
      moves: [
        'sucker-punch',
        'shadow-ball'
      ],
      isMain: false
    },
    {
      name: 'eelektross',
      moves: [
        'crunch',
        'wild-charge',
        'dragon-claw',
        'flamethrower'
      ],
      isMain: false
    },
    {
      name: 'milotic',
      moves: [
        'hydro-pump',
        'blizzard',
        'bulldoze',
        'dragon-tail'
      ],
      isMain: false
    },
    {
      name: 'braviary',
      moves: [
        'brave-bird',
        'crush-claw',
        'shadow-claw'
      ],
      isMain: false
    },
    {
      name: 'lucario',
      moves: [
        'extremespeed',
        'dragon-pulse',
        'close-combat',
        'aura-sphere'
      ],
      isMain: false
    },
    {
      name: 'garchomp',
      moves: [
        'dragon-rush',
        'swords-dance',
        'earthquake',
        'stone-edge'
      ],
      isMain: true
    }
  ]
}