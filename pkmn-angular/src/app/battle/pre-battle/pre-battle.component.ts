import { Component, Input, OnInit } from '@angular/core';
import { calculateHp, getRandNum, getStats, getTypes } from 'src/app/helper/pokemon-helper';
import { PokemonModel } from 'src/app/model/pokemon-model.model';

import { PokemonService } from 'src/app/_services/pokemon/pokemon.service';
import { environment } from 'src/environment/environment';
import { MoveModel } from 'src/app/model/move-model.model';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-pre-battle',
  templateUrl: './pre-battle.component.html',
  styleUrls: ['./pre-battle.component.scss']
})
export class PreBattleComponent implements OnInit {
  @Input() dbMoves: MoveModel[] = []
  @Input() gymLeaders: any[] = []

  @Input() myPokemons: PokemonModel[] = []
  copyMyPokemons: PokemonModel[] = []

  gymPokemonsTemp: any[]=[]
  gymPokemons: any
  copyGymPokemons: any

  currentGymLeader: any[] = []
  currentGymBadge: string
  pokeball = environment.pokeballImg

  player1: PokemonModel[] = []
  player2: PokemonModel[] = []

  battlePhase: string
  
  constructor(private http: PokemonService){}

  ngOnInit() {
    this.battlePhase = 'pre-battle'
    this.currentGymLeader = this.checkLeaders()
    this.copyMyPokemons = this.myPokemons
    this.getPokemon()
  }

  getPokemon() {
    for (const data of this.currentGymLeader) {
      this.http.getPokemon(data.name).subscribe(data => {
        this.gymPokemonsTemp.push(data)
        if (this.gymPokemonsTemp.length == 6) {
          this.getMove()
        }
      })
    }
  }

  player2Chosen(pokemon: PokemonModel): void {
    this.player2.push(pokemon)
  }


  gymChoose() {
    while (this.player2.length<3) {
      let randIndex = getRandNum(0, this.currentGymLeader.length - 1)
      let chosen = this.gymPokemons[randIndex]
      this.gymPokemons.splice(randIndex, 1)
      this.player2Chosen(chosen)
    }
  }

  battleReady(response: boolean) {
    if (response) {
      this.battlePhase = 'in-battle'
    } else {
      let i = 0
      while (this.player1.length!=0) {
        this.remove(this.player1[i])
        i++
      }
    }
  }

  getMove() {
    let tempArr = []
    let tempArrCopy = []
    for (let i = 0; i < this.gymPokemonsTemp.length; i++) {
      let tempMoves: MoveModel[] = []
      const filtered = this.currentGymLeader.filter(tempData => tempData.name == this.gymPokemonsTemp[i].name)
      let moveSet = filtered[0].moves
      for (let j = 0; j < moveSet.length; j++){
        let move = this.dbMoves.filter(data => data.id == moveSet[j])
        tempMoves.push(...move)
      }

      const maxHp = calculateHp(this.gymPokemonsTemp[i].stats[0].base_stat)

      let pokemon = {
        id: this.gymPokemonsTemp[i].id,
        name: this.gymPokemonsTemp[i].name,
        stats: getStats(this.gymPokemonsTemp[i].stats),
        types: getTypes(this.gymPokemonsTemp[i].types),
        moves: tempMoves,
        dbMoves: tempMoves,
        front_image: this.gymPokemonsTemp[i].sprites.front_default,
        back_image: this.gymPokemonsTemp[i].sprites.back_default,
        maxHp,
        currentHp: maxHp,
      }
      let copyGymPokemons = {
        front_image: this.gymPokemonsTemp[i].sprites.front_default
      }
      tempArr.push(pokemon)
      tempArrCopy.push(copyGymPokemons)
    }
    this.gymPokemons = tempArr
    this.copyGymPokemons = tempArrCopy
    this.gymChoose()
  }

  remove(pokemon: PokemonModel) {
    const index = this.player1.findIndex(val => val == pokemon)
    const removed = this.player1.splice(index,1)
    this.copyMyPokemons.push(...removed)
  }

  
  player1Chosen(pokemon: PokemonModel) {
    if(this.player1.length<3){
      this.player1.push(pokemon)
      const index = this.copyMyPokemons.findIndex(val => val == pokemon)
      this.copyMyPokemons.splice(index, 1)
    }
  }


  checkLeaders() {
    for (const gymLeader of this.gymLeaders) {
      if (!gymLeader.gymLose) {
        this.currentGymBadge = gymLeader.gymBadge
        console.log(gymLeader.gymPokemons)
        return gymLeader.gymPokemons
      } 
    }
    return []
  }

  async outcomeBattle(event: string) {
    if(event==="win"){
      for (let gymLeader of this.gymLeaders) {
        if (!gymLeader.gymLose) {
          this.resetBattle()
          gymLeader.gymLose = true
          this.battlePhase = 'pre-battle'
          this.currentGymLeader = await this.checkLeaders()
          await this.getPokemon()
          break
        }
      }
    }
  }

  resetBattle() {
    console.log("What is myPokemons ",this)
    this.copyMyPokemons = this.myPokemons
    this.copyGymPokemons = []
    this.player1 = []
    this.player2 = []
    this.gymPokemonsTemp = []
    this.currentGymLeader = []
  }
}