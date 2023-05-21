import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../_services/pokemon/pokemon.service';
import { PokemonModel, RegionPokemon } from '../model/pokemon-model.model';
import { getStats, getMove, getTypes } from '../helper/pokemon-helper';
import { Pokemon } from '../helper/pokemon.class';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{
  constructor(
    private http: PokemonService,
    private pokemonService: Pokemon
  ) { }
  // myPokemons: PokemonModel[] = []
  myPokemons: any[] = []
  regionPokemons: RegionPokemon[] = []
  pokemon: any
  count: number = 0


  ngOnInit(): void {
    this.regionPokemons = this.pokemonService.getPokemonRegion()
  }

  chosenPokemon(id: string){
    this.count++
    this.pokemon = this.http.getPokemon(id).subscribe((data) => {
      this.pokemon = data
      this.myPokemons.push(data)
    })
  }
}
