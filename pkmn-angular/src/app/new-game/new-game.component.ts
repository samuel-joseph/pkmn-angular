import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../_services/pokemon/pokemon.service';
import { PokemonModel, RegionPokemon } from '../model/pokemon-model.model';
import { getStats, getMove, getTypes, calculateHp } from '../helper/pokemon-helper';
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

        let moveFx
        let stat_changes, ailment, hits, crit_rate

        if (move.damage_class.name === 'special') {
          moveFx = 'https://i.gifer.com/origin/d7/d7ac4f38b77abe73165d85edf2cbdb9e_w200.gif'
        } else {
          moveFx = 'https://www.freeiconspng.com/thumbs/x-png/x-png-18.png'
        }

        if (move.meta) {
          ailment = {
            name: move.meta.ailment['name'],
            category: move.meta.category['name'],
            chance: move.meta.ailment_chance
          }
          hits = {
            min_hits: move.meta.min_hits != null ? move.meta.min_hits : undefined,
            max_hits: move.meta.max_hits != null ? move.meta.max_hits : undefined
          }
          crit_rate = move.meta.crit_rate
          
        }

        // bubble   https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3162952/bubbles-clipart-md.png
        this.dbMoves.push({
          id: move.id,
          name: move.name,
          power: move.power,
          pp: move.pp,
          type: move.type.name,
          accuracy: move.accuracy,
          damageClass: {
            name: move.damage_class.name,
            ailment
          },
          effect_chance: move.effect_chance,
          stat_changes: move.stat_changes,
          priority: move.priority,
          hits,
          crit_rate,
          moveFx,
          target: move.target.name,
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
        this.myPokemons.push(data)
        if (this.myPokemons.length == 6) {
          this.toStore()
        }
      })
    }
    this.gotoTop()
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
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
      let tempDbMoves: MoveModel[] = []
      let temp4Moves: MoveModel[] = []
      for (const move of myPokemon.moves) {
        let url = move.move.url
        let learnMethod = move.version_group_details[0].move_learn_method.name
        url = url.substring(0, url.length - 1);
        let index = url.indexOf('2')
        const id = url.substring(index + "2/move/".length)

        if (this.moveListArr.includes(parseInt(id))) {
          let index = this.dbMoves.findIndex(val => val.id == id)
          console.log(index)
          tempDbMoves.push(this.dbMoves[index])
        } 
      }

      const maxHp = calculateHp(myPokemon.stats[0].base_stat)
      const stats = getStats(myPokemon.stats)

      let pokemon = {
        id: myPokemon.id,
        name: myPokemon.name,
        stats,
        types: getTypes(myPokemon.types),
        moves: temp4Moves,
        dbMoves: tempDbMoves,
        front_image: myPokemon.sprites.front_default,
        back_image: myPokemon.sprites.back_default,
        maxHp,
        currentHp: maxHp,
        others: {
          stats,
          condition: ''
        }
      }
      tempArr.push(pokemon)
      if (tempArr.length == 6) {
        this.pokemonSubmit.emit({ pokemon: tempArr, next:'player', dbMoves: this.dbMoves});
      }
    }
  }
}
