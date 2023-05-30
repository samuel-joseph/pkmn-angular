import { Component, OnInit, Input } from '@angular/core';
import { PokemonModel } from '../model/pokemon-model.model';
import { MoveModel } from '../model/move-model.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{
  constructor(
  ) { }
  @Input() myPokemons: PokemonModel[] = []
  newMoves: MoveModel[] = []

  ngOnInit(): void {}
}

