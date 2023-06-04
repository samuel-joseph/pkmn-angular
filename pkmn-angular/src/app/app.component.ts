import { Component, OnInit } from '@angular/core';
import { PokemonService } from './_services/pokemon/pokemon.service';

import { PokemonModel } from './model/pokemon-model.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'pkmn-angular';
  constructor(private http: PokemonService) { }
  myPokemon: PokemonModel[] = []
  page: string

  public transition(child: any): void {
    console.log(child)
    this.myPokemon.push(...child.pokemon)
    this.page = child.next
  }
  
  ngOnInit(): void {
    if (this.myPokemon.length < 1) {
      this.page = 'newGame'
    }
  }
}
