import { Component, Input, OnInit } from '@angular/core';
import { getRandNum, getStats, getTypes } from 'src/app/helper/pokemon-helper';
import { PokemonModel } from 'src/app/model/pokemon-model.model';

import { PokemonService } from 'src/app/_services/pokemon/pokemon.service';
import { environment } from 'src/environment/environment';
import { MoveModel } from 'src/app/model/move-model.model';

@Component({
  selector: 'app-pre-battle',
  templateUrl: './pre-battle.component.html',
  styleUrls: ['./pre-battle.component.scss']
})
export class PreBattleComponent implements OnInit {
  @Input() myPokemons: PokemonModel[] = []
  @Input() dbMoves: MoveModel[] = []
  gymLeaders = environment.gymLeaders
  gymPokemons: PokemonModel[] = []
  gymPokemonsTemp: any[]=[]
  pokemon: any
  currentGymLeader: any[] = []
  currentGymBadge: string
  
  constructor(private http: PokemonService){}

  ngOnInit() {
    console.log(this.myPokemons)
    this.currentGymLeader = this.checkLeaders()
    this.getPokemon()
  }

  getPokemon() {
    for (const data of this.currentGymLeader) {
      this.http.getPokemon(data.pokemonId).subscribe(data => {
        this.gymPokemonsTemp.push(data)
        if (this.gymPokemonsTemp.length == 6) {
          this.getMove()
        }
      })
    }
  }

  getMove() {
    let tempArr = []
    for (let i = 0; i < this.gymPokemonsTemp.length; i++) {
      let tempMoves: MoveModel[] = []
      const filtered = this.currentGymLeader.filter(tempData => tempData.pokemonId == this.gymPokemonsTemp[i].id)
      let moveSet = filtered[0].moves
      for (let j = 0; j < moveSet.length; j++){
        let move = this.dbMoves.filter(data => data.id == moveSet[j])
        tempMoves.push(...move)
      }
      let pokemon = {
        id: this.gymPokemonsTemp[i].id,
        name: this.gymPokemonsTemp[i].name,
        stats: getStats(this.gymPokemonsTemp[i].stats),
        types: getTypes(this.gymPokemonsTemp[i].types),
        moves: tempMoves,
        dbMoves: tempMoves,
        front_image: this.gymPokemonsTemp[i].sprites.front_default,
        back_image: this.gymPokemonsTemp[i].sprites.back_default
      }
      tempArr.push(pokemon)
    }
    console.log(...tempArr)
    this.pokemon = tempArr
  }



  checkLeaders() {
    for (const gymLeader of this.gymLeaders) {
      if (!gymLeader.gymLose) {
        this.currentGymBadge = gymLeader.gymBadge
        return gymLeader.gymPokemons
      } 
    }
    return []
  }
}
