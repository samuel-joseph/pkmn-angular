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

  currentPlayer1: PokemonModel[] = []
  currentPlayer2: PokemonModel[] = []

  playerOption: string

  ngOnInit(): void {
    this.playerOption = 'default'
    this.currentPlayer1 = this.player1.splice(0,1)
    this.currentPlayer2 = this.player2.splice(0,1)
  }

  decisionOption(response: string) {
    console.log("CHECKING")
    this.playerOption = response
  }

  swapOption(pokemon: PokemonModel) {
    console.log("CHECKING")
    if (this.currentPlayer1) {
      this.player1.push(...this.currentPlayer1)
      
      const index = this.player1.findIndex(val => val == pokemon)
      
      this.currentPlayer1.pop()
      this.player1.splice(index, 1)
      
      this.currentPlayer1.push(pokemon)
      this.playerOption = 'default'
    }
  }
}
