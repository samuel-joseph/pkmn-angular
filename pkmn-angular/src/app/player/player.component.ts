import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokemonModel } from '../model/pokemon-model.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{
  constructor( ) { }
  @Input() myPokemons: PokemonModel[] = []
  @Output() pokemonSubmit = new EventEmitter();
  movesAllReady = false

  battleReady(response: any) {
    this.movesAllReady = response
    console.log("Checking response ", response)
    if (response) {
      this.pokemonSubmit.emit({ pokemon: this.myPokemons, next:'pre-battle'})
    }
  }

  modifyMove(idMove: number, idPokemon: number, str: string) {
    console.log(idMove, idPokemon, str)
    let indexPokemon = this.myPokemons.findIndex(pokemon => pokemon.id === idPokemon)
    let myPokemon = this.myPokemons[indexPokemon]
    let indexMove

    if (str === 'add') {
      indexMove = this.myPokemons[indexPokemon].dbMoves.findIndex(move => move.id === idMove)
      myPokemon.moves.push(myPokemon.dbMoves[indexMove])
      myPokemon.dbMoves.splice(indexMove, 1)
    } else if (str === 'subtract') {
      indexMove = this.myPokemons[indexPokemon].moves.findIndex(move => move.id === idMove)
      myPokemon.dbMoves.push(myPokemon.moves[indexMove])
      myPokemon.moves.splice(indexMove, 1)
    }

    if (myPokemon.moves.length == 4) {
      const firstPokemon = this.myPokemons.shift()
      if(firstPokemon){
        this.myPokemons.push(firstPokemon)
      }
    }

    this.allMovesReady()
  }

  allMovesReady(){
    let checker = this.myPokemons.filter(pokemon => pokemon.moves.length < 4||pokemon.dbMoves.length==0)
    if (checker.length == 0) {
      this.movesAllReady = true
    }
  }

  ngOnInit(): void {}
}

