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
  myPokemon: PokemonModel


  ngOnInit(): void {
  }
}
