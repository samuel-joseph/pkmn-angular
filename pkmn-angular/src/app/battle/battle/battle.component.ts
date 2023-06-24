import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { calculateDamage, typeAdvantage } from 'src/app/helper/pokemon-helper';
import { MoveModel } from 'src/app/model/move-model.model';
import { PokemonModel } from 'src/app/model/pokemon-model.model';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit{
  @Input() player1: PokemonModel[] = []
  @Input() player2: PokemonModel[] = []

  @Output() outcomeSubmit = new EventEmitter();
  
  currentPlayer1: PokemonModel[] = []
  currentPlayer2: PokemonModel[] = []

  tempPokemonContainer1: PokemonModel[]=[]
  tempPokemonContainer2: PokemonModel[]=[]

  faintedPokemonPlayer1: PokemonModel[] = []
  faintedPokemonPlayer2: PokemonModel[] = []

  playerOption: string
  battlePhase: string
  outcome: string

  cross = 'https://static.vecteezy.com/system/resources/previews/017/178/056/original/red-cross-mark-on-transparent-background-free-png.png'

  ngOnInit(): void {
    this.playerOption = 'default'
    this.battlePhase = 'on-going'
    this.currentPlayer1 = this.player1.splice(0,1)
    this.currentPlayer2 = this.player2.splice(0,1)
  }

  decisionOption(response: string) {
    this.playerOption = response
  }

  attackSequence(attacker: PokemonModel, defender: PokemonModel, move: MoveModel) {
    let damage = 0
      if (move.type === 'attack') {
        damage = calculateDamage(
          move.power,
          attacker.stats[1].base_stat,
          defender.stats[2].base_stat,
          attacker.types,
          move.type,
          defender.types
        )
      } else {
        damage = calculateDamage(
          move.power,
          attacker.stats[3].base_stat,
          defender.stats[4].base_stat,
          attacker.types,
          move.type,
          defender.types
        )
      }
    console.log(`${move.name} damage of ${damage} to ${defender.name}`)
    defender.currentHp = defender.currentHp - damage
  }

  chosenMove(move: MoveModel) {
    let player = this.currentPlayer1[0]
    let npc = this.currentPlayer2[0]
    let playerMove = move
    let npcMove = this.npcMove()

    if (
      playerMove.priority > npcMove[0].priority ||
      player.stats[5].base_stat > npc.stats[5].base_stat ||
      player.stats[5].base_stat == npc.stats[5].base_stat
    ) {
      this.attackSequence(player, npc, playerMove)
      if (this.currentPlayer2[0].currentHp <= 0) {
        this.currentPlayer2Fainted()
      } else {
        this.attackSequence(npc, player, npcMove[0])
        if (this.currentPlayer1[0].currentHp <= 0) {
          this.currentPlayer1Fainted()
        } else {
          this.playerOption = 'default'
        }
      }
    } else {
      this.attackSequence(npc, player, npcMove[0])
      if (this.currentPlayer1[0].currentHp <= 0) {
        this.currentPlayer1Fainted()
        this.playerOption = 'swap'
      }else{
        this.attackSequence(player, npc, playerMove)
        if (this.currentPlayer2[0].currentHp <= 0) {
          this.currentPlayer2Fainted()
        } else {
          this.playerOption = 'default'
        }
      }
    }
  }

  currentPlayer1Fainted() {
    const faintedPokemon = this.currentPlayer1.pop()
    if (faintedPokemon) {
      // faintedPokemon.currentHp = faintedPokemon.maxHp
      this.faintedPokemonPlayer1.push(faintedPokemon)
    }
    if (this.player1.length === 0) {
      this.battleEnd('lose')
    } else{
      this.playerOption = 'swap'
    }
  }

  currentPlayer2Fainted() {
    const faintedPokemon = this.currentPlayer2.pop()
    if (faintedPokemon) { 
      // faintedPokemon.currentHp = faintedPokemon.maxHp
      this.faintedPokemonPlayer2.push(faintedPokemon)
    }
    if (this.player2.length === 0) {
      this.battleEnd('win')
    } else {
      this.currentPlayer2 = this.player2.splice(0, 1)
      this.playerOption = 'default'
    }
  }

  npcMove() {
    let TYPE = 0;
    let typeArr = this.currentPlayer1[0].types
    let chosenNpcMove: MoveModel[] = []
    for (let move of this.currentPlayer2[0].moves) {
      let newType
      if (typeArr.typeTwo) {
        newType = typeAdvantage(move.type, typeArr.typeOne) * typeAdvantage(move.type, typeArr.typeTwo)
        if (TYPE < newType) {
          TYPE = newType
          chosenNpcMove = []
          chosenNpcMove.push(move)
        }
      } else {
        newType = typeAdvantage(move.type, typeArr.typeOne)
        if (TYPE < newType) {
          TYPE = newType
          chosenNpcMove = []
          chosenNpcMove.push(move)
        }
      }
    }
    return chosenNpcMove
  }

  swapOption(pokemon: PokemonModel) {
    if (this.currentPlayer1.length > 0) {
      let npc = this.currentPlayer2[0]
      let npcMove = this.npcMove()
      this.player1.push(...this.currentPlayer1)
      this.currentPlayer1.pop()
      this.attackSequence(npc, pokemon, npcMove[0])
    }
    
    const index = this.player1.findIndex(val => val == pokemon)
    this.player1.splice(index, 1)
    
    this.currentPlayer1.push(pokemon)

    let player = this.currentPlayer1[0]
    if (player.currentHp <= 0) {
      this.currentPlayer1Fainted()
    } else{
      this.playerOption = 'default'
    }
  }

  battleEnd(outcome: string) {
    const returnPokemonPlayer1: PokemonModel [] = []
    const returnPokemonPlayer2: PokemonModel[] = []
    if(outcome === 'win'){
      this.currentPlayer1[0].currentHp = this.currentPlayer1[0].maxHp
    }
    returnPokemonPlayer1.push(
      ...this.faintedPokemonPlayer1,
      ...this.currentPlayer1
    )

    returnPokemonPlayer2.push(
      ...this.faintedPokemonPlayer2,
      ...this.currentPlayer2
    )

    this.tempPokemonContainer1.push(...returnPokemonPlayer1,...this.player1)
    this.tempPokemonContainer2.push(...returnPokemonPlayer2,...this.player2)

    this.outcome = outcome

    setTimeout(() => {
      if(outcome == 'win'){
        this.tempPokemonContainer2 = []
      } else {
        this.tempPokemonContainer1 = []
      }

      let i = 0;

      while (i != 3) {
        returnPokemonPlayer1[i].currentHp = returnPokemonPlayer1[i].maxHp
        returnPokemonPlayer2[i].currentHp = returnPokemonPlayer2[i].maxHp
        i++
      }

    },1500)

    setTimeout(() => {
      this.outcomeSubmit.emit({
      outcome,
      returnPokemonPlayer1,
      returnPokemonPlayer2
      })
    }, 5000)
    this.battlePhase = 'battle-done'
    console.log(this)
  }
}
