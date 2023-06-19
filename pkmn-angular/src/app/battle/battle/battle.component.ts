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

  playerOption: string

  ngOnInit(): void {
    this.playerOption = 'default'
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
    this.currentPlayer1 = []
    if (this.player1.length === 0) {
      this.battleEnd('lose')
    } else{
      this.playerOption = 'swap'
    }
  }

  currentPlayer2Fainted() {
    this.currentPlayer2 = []
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
        newType = typeAdvantage(move.type,typeArr.typeOne)*typeAdvantage(move.type,typeArr.typeTwo)
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
    console.log("battle ends in child")
    this.outcomeSubmit.emit(outcome)
  }
}
