import { Injectable } from "@angular/core"
import { PokemonService } from "../_services/pokemon/pokemon.service"
import { PokemonModel, RegionPokemon } from "../model/pokemon-model.model"
import { Observable, switchMap } from 'rxjs';
import { getMove, getStats, getTypes
} from "./pokemon-helper"
import { regionPokemonsImage, region } from "./region-helper"
 

 @Injectable({ providedIn: 'root' })
 export class Pokemon {
   pokemon: any;
  regionPokemons: RegionPokemon[] = [];
   constructor(private restApi: PokemonService) { }

   getPokemonRegion():any{
     const regionSpecific = 'kanto'
     const firstPokemon = region[regionSpecific].firstPokemon
     const lastPokemon = region[regionSpecific].lastPokemon
    console.log("in getPokemonRegion")
     for (let i = firstPokemon; i <= lastPokemon; i++){
       this.regionPokemons.push(regionPokemonsImage(`${i}`))
     }
     return this.regionPokemons
   }
   
   getPokemonDetails(id: string) {
     this.restApi.getPokemonMove(id).subscribe((res) => {
       this.pokemon = res
     })
    // console.log(this.http.getPokemon(id))
      // this.restApi.getPokemon(id).subscribe(data => {
      //   let tempMove: any[] = []
      //   let tempArr = []
    
      //   // move to a separate method
      //   for (const moveIndex of data.moves) {
      //     let moveDetails = moveIndex.version_group_details[0]
      //     if (moveDetails.move_learn_method.name === "level-up" &&
      //         moveDetails.level_learned_at>=15
      //     )
      //       this.restApi.getPokemonMove(`${moveIndex.move.url}`).subscribe(move => {
      //         let tempObj = getMove(move)
      //         if(tempObj.power){
      //           tempMove.push(tempObj)
      //         }
      //       })
      //   }

      //   for (let i = 0; i < 6; i++){
      //     let tempObj = getStats(data.stats[i])
      //     tempArr.push(tempObj)
      //   }
      //   //move to a separate method
      //   this.pokemon = {
      //     id: data.id,
      //     name: data.name,
      //     stats: tempArr,
      //     types: getTypes(data.types),
      //     moves: tempMove,
      //     front_image: data.sprites.front_default,
      //     back_image: data.sprites.back_default
      //   }
      //   console.log("AM I HERE" ,this.pokemon)
      //     return this.pokemon
      // })
  }
}
