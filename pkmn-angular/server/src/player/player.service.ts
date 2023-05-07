import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerService {
  private player = {
    name: 'Mel',
    money: 1000,
    pokemons: []
  }

  getPlayer() {
    return this.player
  }
}
