import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../_services/pokemon/pokemon.service';
import { PokemonModel, RegionPokemon } from '../model/pokemon-model.model';
import { getStats, getMove, getTypes } from '../helper/pokemon-helper';
import { Pokemon } from '../helper/pokemon.class';
import { MoveModel } from '../model/move-model.model';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit{
  constructor(
    private http: PokemonService,
    private pokemonService: Pokemon
  ) { }
    @Output() pokemonSubmit = new EventEmitter();
    moveListArr = environment.moveDb
    regionArr = environment.region
    myPokemons: any[] = []
    regionPokemons: RegionPokemon[] = []
    dbMoves: MoveModel[] = []
    FinalArrMove: MoveModel[] = []
    pokemon: any

  ngOnInit(): void {
    for (let pokemon of this.moveListArr) {
      this.http.getPokemonMove(`${pokemon}`).subscribe((move) => {
        this.dbMoves.push({
          id: move.id,
          name: move.name,
          power: move.power,
          pp: move.pp,
          type: move.type.name,
          accuracy: move.accuracy,
          damageClass: move.damage_class.name,
          priority: move.priority,
          hits: {
            min_hits: move.meta.min_hits != null ? move.meta.min_hits : undefined,
            max_hits: move.meta.max_hits != null ? move.meta.max_hits : undefined
          },
          crit_rate: move.meta.crit_rate
        })
      })
    }
  }

  getRegion(region: string) {
    let copyRegionPokemons = this.pokemonService.getPokemonRegion(region)
    this.regionPokemons = copyRegionPokemons
  }

  chosenPokemon(id: string) {
    let isUnique;
    isUnique = this.myPokemons.filter(pokemon => pokemon.id == id)
    if(isUnique.length<1 || isUnique == undefined){
      this.pokemon = this.http.getPokemon(id).subscribe((data) => {
        this.pokemon = data
        console.log(data)
        this.myPokemons.push(data)
        if (this.myPokemons.length == 6) {
          this.toStore()
        }
      })
    }
  }

  removePokemon(id:any) {
    let copyMyPokemons = this.myPokemons.filter(pokemon => {
      return pokemon.id != id
    })
    this.myPokemons = copyMyPokemons
  }



  toStore() {
    let tempArr = []
    for (const myPokemon of this.myPokemons) {
      console.log(myPokemon)
      let tempDbMoves: MoveModel[] = []
      let temp4Moves: MoveModel[] = []
      for (const move of myPokemon.moves) {
        let url = move.move.url
        let learnMethod = move.version_group_details[0].move_learn_method.name
        url = url.substring(0, url.length - 1);
        let index = url.indexOf('2')
        const id = url.substring(index + "2/move/".length)

        if (this.moveListArr.includes(parseInt(id)) &&
          learnMethod === 'level-up') {
          let objMove = this.dbMoves.filter(data => data.id === parseInt(id))
          tempDbMoves.push(...objMove)
        } 
      }

      let pokemon = {
        id: myPokemon.id,
        name: myPokemon.name,
        stats: getStats(myPokemon.stats),
        types: getTypes(myPokemon.types),
        moves: temp4Moves,
        dbMoves: tempDbMoves,
        front_image: myPokemon.sprites.front_default,
        back_image: myPokemon.sprites.back_default
      }
      tempArr.push(pokemon)

      if (tempArr.length == 6) {
        this.pokemonSubmit.emit({ pokemon: tempArr, next:'player'});
      }
    }
  }
}
