import { Component, Input, OnInit } from '@angular/core';
import { PokemonModel } from 'src/app/model/pokemon-model.model';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit{
  @Input() player1: PokemonModel[] = []
  @Input() player2: PokemonModel[] = []

  ngOnInit(): void {
    console.log(this.player1)
    console.log(this.player2)
  }
}
