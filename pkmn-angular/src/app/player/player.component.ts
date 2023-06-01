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

  modifyMove(idMove: number, idPokemon: number, str: string) {
    console.log(idMove, idPokemon, str)
    let indexPokemon = this.myPokemons.findIndex(pokemon => pokemon.id === idPokemon)
    let indexMove = this.myPokemons[indexPokemon].dbMoves.findIndex(move => move.id === idMove)
    let myPokemon = this.myPokemons[indexPokemon]
    if (str === 'add') {
    myPokemon.moves.push(myPokemon.dbMoves[indexMove])
    myPokemon.dbMoves.splice(indexMove, 1)
    } else {
    myPokemon.dbMoves.push(myPokemon.moves[indexMove])
    myPokemon.moves.splice(indexMove, 1)
    }
    console.log(myPokemon)
  }

  ngOnInit(): void {}
}

