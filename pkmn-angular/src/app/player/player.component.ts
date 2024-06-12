import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokemonModel } from '../model/pokemon-model.model';
import { PokemonService } from '../_services/pokemon/pokemon.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{
  constructor(private http: PokemonService ) { }
  @Input() myPokemons: PokemonModel[] = []
  @Output() pokemonSubmit = new EventEmitter();
  movesAllReady = false
  overviewMove: any[] = []

  battleReady(response: any) {
    this.movesAllReady = response
    if (response) {
      this.pokemonSubmit.emit({ pokemon: this.myPokemons, next:'pre-battle'})
    }
  }

  closeOverView() {
    this.overviewMove = []
  }

  openOverView(idMove: number, idPokemon: number) {
    let indexPokemon = this.myPokemons.findIndex(pokemon => pokemon.id === idPokemon)
    let myPokemon = this.myPokemons[indexPokemon]
    let indexMove

    indexMove = this.myPokemons[indexPokemon].dbMoves.findIndex(move => move.id === idMove)
    this.overviewMove.push(myPokemon.dbMoves[indexMove])
  }

  modifyMove(idMove: number, idPokemon: number, str: string) {
    let indexPokemon = this.myPokemons.findIndex(pokemon => pokemon.id === idPokemon)
    let myPokemon = this.myPokemons[indexPokemon]
    let indexMove

    if (str === 'add') {
      indexMove = this.myPokemons[indexPokemon].dbMoves.findIndex(move => move.id === idMove)
      this.overviewMove.push(myPokemon.dbMoves[indexMove])
      myPokemon.moves.push(myPokemon.dbMoves[indexMove])
      myPokemon.dbMoves.splice(indexMove, 1)
    } else if (str === 'subtract') {
      indexMove = this.myPokemons[indexPokemon].moves.findIndex(move => move.id === idMove)
      myPokemon.dbMoves.push(myPokemon.moves[indexMove])
      myPokemon.moves.splice(indexMove, 1)
    }

    if (myPokemon.moves.length == 4||myPokemon.dbMoves.length==0) {
      const firstPokemon = this.myPokemons.shift()
      if(firstPokemon){
        this.myPokemons.push(firstPokemon)
      }
      this.gotoTop()
    }

    this.closeOverView()
    this.allMovesReady()
  }

  allMovesReady(){
    let checker = this.myPokemons.filter(pokemon => pokemon.moves.length == 4||pokemon.dbMoves.length==0)
    if (checker.length == 6) {
      this.movesAllReady = true
      this.http.addUser(this.myPokemons).subscribe(response => {
        console.log(response)
      })
    }
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  ngOnInit(): void {
    this.allMovesReady()
  }
}