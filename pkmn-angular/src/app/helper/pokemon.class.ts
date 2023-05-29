import { Injectable } from "@angular/core"
import { PokemonService } from "../_services/pokemon/pokemon.service"
import { RegionPokemon } from "../model/pokemon-model.model"
import { regionPokemonsImage } from "./region-helper"
 

 @Injectable({ providedIn: 'root' })
 export class Pokemon {
   pokemon: any;
  regionPokemons: RegionPokemon[] = [];
   constructor(private restApi: PokemonService) { }

   getPokemonRegion(request: string): any{
     this.regionPokemons = []
     let firstPokemon = 0
     let lastPokemon = 0
     switch (request) {
       case 'kanto':
         firstPokemon = 1
         lastPokemon = 151
         break
       case 'johto':
        firstPokemon = 152
        lastPokemon = 251
         break
       case 'hoenn':
        firstPokemon = 252
        lastPokemon = 386
         break
       case "sinnoh":
         firstPokemon = 387
         lastPokemon = 493
         break
       case 'unova':
         firstPokemon = 494
         lastPokemon = 649
         break
       case 'kalos':
         firstPokemon = 650
         lastPokemon = 719
         break
     }
     for (let i = firstPokemon; i <= lastPokemon; i++){
       this.regionPokemons.push(regionPokemonsImage(`${i}`))
     }
     console.log(this.regionPokemons)
     return this.regionPokemons
   }
   
   getPokemonDetails(id: string) {
     this.restApi.getPokemonMove(id).subscribe((res) => {
       this.pokemon = res
     })
  }
}
