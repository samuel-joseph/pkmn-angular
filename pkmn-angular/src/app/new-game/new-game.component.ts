import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PokemonService } from '../_services/pokemon/pokemon.service';
import { PokemonModel, RegionPokemon } from '../model/pokemon-model.model';
import { getStats, getTypes, calculateHp, getRandNum } from '../helper/pokemon-helper';
import { Pokemon } from '../helper/pokemon.class';
import { MoveModel } from '../model/move-model.model';
import { environment } from 'src/environments/environment';
import { StateService } from '../_services/state/state.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';
import { MoveService } from '../_services/move/move.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit{
  constructor(
    private moveService: MoveService,
    private http: PokemonService,
    private pokemonService: Pokemon,
    private stateService: StateService,
    private authService: AuthService,
    private router: Router
  ) { }
    dbMoves: MoveModel[] = []
    @Output() pokemonSubmit = new EventEmitter();
    moveListArr = environment.moveDb
    regionArr = environment.region
    regionPokemons: RegionPokemon[] = []
    // dbMoves: MoveModel[] = []
    FinalArrMove: MoveModel[] = []
    pokemon: PokemonModel
    toDisplayPokemon: any[] = []
  
  gameLoading = true
  clickedPokemon = false
    
    myPokemons: PokemonModel[] = []


  async ngOnInit():Promise<void> {
    await this.moveService.getAllMoves().subscribe(response => {
      this.dbMoves = response
    })
  }

  getRegion(region: string) {
    let copyRegionPokemons = this.pokemonService.getPokemonRegion(region)
    this.regionPokemons = copyRegionPokemons
  }

  displayPokemon(id: string) {
    this.clickedPokemon = true
    const isUnique = this.myPokemons.filter(pokemon => pokemon.id == parseInt(id))  
    if(isUnique.length == 0){
      this.http.getPokemon(id).subscribe((data) => {
        let temp: any = []
        temp.push(data)
        for (let pokemon of temp) {
          const stats = getStats(pokemon.stats)
          const types = getTypes(pokemon.types)
          let tempDbMoves: MoveModel[] = []
          let moveSet: MoveModel [] = []
          for (const move of pokemon.moves) {
            let url = move.move.url
            let learnMethod = move.version_group_details[0].move_learn_method.name
            url = url.substring(0, url.length - 1);
            let index = url.indexOf('2')
            const id = url.substring(index + "2/move/".length)
    
            if (this.moveListArr.includes(parseInt(id))&&(learnMethod=='level-up'||learnMethod=='tutor')) {
              let index = this.dbMoves.findIndex(val => val.id == id)
              tempDbMoves.push(this.dbMoves[index])

            } 
          }

          let i = 0
          while (i < 4) {
            let index: number
            index = getRandNum(0, tempDbMoves.length - 1);
            moveSet.push(tempDbMoves[index])
            tempDbMoves.splice(index,1)
            i++
          }
          let front_image
          let back_image
          if (pokemon.sprites.versions['generation-v']['black-white'].animated.back_default !== null) {
            front_image = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default
            back_image = pokemon.sprites.versions['generation-v']['black-white'].animated.back_default
          } else {
            front_image = pokemon.sprites.front_default
            back_image = pokemon.sprites.back_default
          }
          const maxHp = calculateHp(pokemon.stats[0].base_stat)

    
          let pokemonObj: PokemonModel = {
            id: pokemon.id,
            name: pokemon.name,
            stats,
            types: getTypes(pokemon.types),
            moves: moveSet,
            dbMoves: tempDbMoves,
            front_image,
            back_image,
            maxHp,
            currentHp: maxHp,
            others: {
              stats,
              condition: '',
              originalValues: {
                front_image: pokemon.sprites.front_default,
                back_image: pokemon.sprites.back_default,
              }
            }
          }


          let objPokemon = {
            id: pokemon.id,
            name: pokemon.name,
            types,
            stats,
            front_image: pokemon.sprites.front_default,
            back_image: pokemon.sprites.back_default,
            moves: moveSet
          }

          this.toDisplayPokemon.push(objPokemon)
          this.pokemon = pokemonObj
        }
        
      })
    }
  }

  emptyDisplay() {
    this.toDisplayPokemon = []
    this.clickedPokemon = false
  }

  chosenPokemon(chosen: PokemonModel) {
    this.clickedPokemon = false
    let isUnique;
    this.emptyDisplay()
    isUnique = this.myPokemons.filter(pokemon => pokemon.id == chosen.id)
    if (isUnique.length < 1 || isUnique == undefined) {
      this.myPokemons.push(chosen)
      if (this.myPokemons.length == 6) {
        this.stateService.setPokemon(this.myPokemons)
        this.pokemonSubmit.emit({ pokemon: this.myPokemons, next: 'pre-battle'})
        // this.router.navigate(['/profile'])
      }
    }
  }

  removePokemon(id:any) {
    let copyMyPokemons: PokemonModel[] = this.myPokemons.filter(pokemon => {
      return pokemon.id != id
    })
    this.myPokemons = copyMyPokemons
  }
}