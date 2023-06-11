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

  public transition(child: any): void {
    if (this.myPokemon.length > 0) {
      this.myPokemon = []
    }
    this.myPokemon.push(...child.pokemon)
    if(child.dbMoves){
      this.dbMove.push(...child.dbMoves)
    }
    this.page = child.next
  }
  
  ngOnInit(): void {
    if (this.myPokemon.length < 1) {
      this.page = 'newGame'
    }
    this.gymLeaders = environment.gymLeaders
  }
}
