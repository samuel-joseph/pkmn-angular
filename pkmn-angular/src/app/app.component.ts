import { Component, OnInit } from '@angular/core';
import { PokemonService } from './_services/pokemon/pokemon.service';

import { PokemonModel } from './model/pokemon-model.model';
import { MoveModel } from './model/move-model.model';
import { environment } from 'src/environment/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'pkmn-angular';
  constructor(private http: PokemonService) { }
  myPokemon: PokemonModel[] = []
  dbMove: MoveModel[] = []
  page: string
  gymLeaders: any[] = []
  pokemonObj = {}

  public transition(child: any): void {
    console.log(child)
    switch (child.next) {
      case "player":
        this.myPokemon.push(...child.pokemon)
        this.dbMove.push(...child.dbMoves)
        break
      case "pre-batlle":
        this.myPokemon.push(...child.pokemon)
        break
    }
    this.page = child.next
    this.pokemonObj = {
      pokemon: this.myPokemon,
      gymLeaders: this.gymLeaders,
      dbMove: this.dbMove
    }
  }
  
  ngOnInit(): void {
    if (this.myPokemon.length < 1) {
      this.page = 'newGame'
    }
    this.gymLeaders = environment.gymLeaders
  }
}
