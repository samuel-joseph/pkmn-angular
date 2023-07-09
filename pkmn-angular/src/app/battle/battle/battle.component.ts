import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { calculateDamage, getRandNum, isSuperEffective, multiplier, typeAdvantage } from 'src/app/helper/pokemon-helper';
import { GymLeader } from 'src/app/model/gym-leader-model.model';
import { MoveModel, StatModel } from 'src/app/model/move-model.model';
import { PokemonModel } from 'src/app/model/pokemon-model.model';
import { powerup } from 'src/environment/environment-constants';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit{
  @Input() player1: PokemonModel[] = []
  @Input() player2: PokemonModel[] = []
  @Input() leaderInfo: GymLeader

  @Output() outcomeSubmit = new EventEmitter();
  
  currentPlayer1: PokemonModel[] = []
  currentPlayer2: PokemonModel[] = []


  currentPlayer1Stat = [
    {
      base_stat: 0,
      name: 'hp'
    },
    {
      base_stat: 0,
      name: 'attack'
    },
    {
      base_stat: 0,
      name: 'defense'
    },
    {
      base_stat: 0,
      name: 'special-attack'
    },
    {
      base_stat: 0,
      name: 'special-defense'
    },
    {
      base_stat: 0,
      name: 'speed'
    },
    {
      base_stat: 0,
      name: 'evasion'
    },
    {
      base_stat: 0,
      name: 'accuracy'
    },
  ]

  currentPlayer2Stat = [
    {
      base_stat: 0,
      name: 'hp'
    },
    {
      base_stat: 0,
      name: 'attack'
    },
    {
      base_stat: 0,
      name: 'defense'
    },
    {
      base_stat: 0,
      name: 'special-attack'
    },
    {
      base_stat: 0,
      name: 'special-defense'
    },
    {
      base_stat: 0,
      name: 'speed'
    },
    {
      base_stat: 0,
      name: 'evasion'
    },
    {
      base_stat: 0,
      name: 'accuracy'
    },
  ]

  tempPokemonContainer1: PokemonModel[]=[]
  tempPokemonContainer2: PokemonModel[]=[]

  faintedPokemonPlayer1: PokemonModel[] = []
  faintedPokemonPlayer2: PokemonModel[] = []

  playerOption: string
  battlePhase: string
  outcome: string
  npcAttackMotion = false
  playerAttackMotion = false

  npcAttackClass: string
  playerAttackClass: string
  npcDamage: number
  playerDamage: number
  //to be removed
  npcCurrentMoveFx: string
  playerCurrentMoveFx: string

  npcHpPercentage: string
  playerHpPercentage: string

  changeBackground = false

  powerup = powerup

  npcbuff: string[] = []
  npcbuffOn = false

  ongoingBattle = false

  playerbuff: string[] = []
  playerbuffOn = false

  npcDamageReceive = 0
  playerDamageReceive = 0

  ngOnInit(): void {
    this.playerOption = 'default'
    this.battlePhase = 'on-going'
    this.currentPlayer1 = this.player1.splice(0, 1)
    this.currentPlayer2 = this.player2.splice(0, 1)

    this.settingUpInitialStat('player')
    this.settingUpInitialStat('npc')
    this.calculatePercentHp()
  }

  pushEvasionAccuracy(trainer:string) {
    const pokemonStat = trainer == 'player' ? this.currentPlayer1 : this.currentPlayer2
    pokemonStat[0].stats.push({
      base_stat: 0,
      name: 'evasion'
    }, {
      base_stat: 100,
      name: 'accuracy'
    })
  }

  revertOriginPokemonStat(trainer: string) {
    const pokemonStatCurrent = trainer == 'player' ? this.currentPlayer1[0].stats : this.currentPlayer2[0].stats
    for (let stat of pokemonStatCurrent) {
      stat.base_stat = this.statValue(stat.name, trainer, 'origin')
    }
    const indexEvasion = pokemonStatCurrent.findIndex(val=>val.name == 'evasion')
    const indexAccuracy = pokemonStatCurrent.findIndex(val => val.name == 'accuracy')
    
    pokemonStatCurrent.splice(indexAccuracy, 1)
    pokemonStatCurrent.splice(indexEvasion, 1)
    this.resetCurrentPlayerStat(trainer)
  }

  settingUpInitialStat(trainer: string) {
    const pokemonStat = trainer == 'player' ? this.currentPlayer1Stat : this.currentPlayer2Stat
    this.pushEvasionAccuracy(trainer)
    for (let stat of pokemonStat) {
      stat.base_stat+=this.statValue(stat.name, trainer, 'current')
    }
    console.log(pokemonStat)
  }

  statValue(stat: string, trainer: string, current_origin: string) {
    let index
    let state
    if (trainer == 'player') {
      state = current_origin == 'current' ? this.currentPlayer1[0].stats : this.currentPlayer1Stat
      index = state.findIndex(val => val.name == stat)
      return state[index].base_stat
    } else{
      state = current_origin == 'current' ? this.currentPlayer2[0].stats : this.currentPlayer2Stat
      index = state.findIndex(val => val.name == stat)
      return state[index].base_stat
    }
  }

  calculatePercentHp() {
    this.npcHpPercentage = this.getPercentageHp(this.currentPlayer2[0]).toString()+"%"
    this.playerHpPercentage = this.getPercentageHp(this.currentPlayer1[0]).toString()+"%"
  }

  getPercentageHp(currentPlayer: PokemonModel) {
    let response = Math.floor((currentPlayer.currentHp / currentPlayer.maxHp) * 100)
    return response<0? 0:response
  }

  decisionOption(response: string) {
    this.playerOption = response
  }

  attackSequence(attacker: PokemonModel, defender: PokemonModel, move: MoveModel, receiver: string){
    let isAccurate = this.moveAccurateOrMiss(move.accuracy)
    let multiplier = 1;
    let damage = 0
    let indexAttackerStat
    let indexDefenderStat
    if(isAccurate){
      if (move.damageClass.name === 'physical') {
        indexAttackerStat = attacker.others.stats.findIndex(val => val.name == 'attack')
        indexDefenderStat = defender.others.stats.findIndex(val => val.name == 'defense')
        damage = calculateDamage(
          move.power,
          attacker.others.stats[indexAttackerStat].base_stat,
          defender.others.stats[indexDefenderStat].base_stat,
          attacker.types,
          move.type,
          defender.types
        )
      } else {
        indexAttackerStat = attacker.others.stats.findIndex(val => val.name == 'special-attack')
        indexDefenderStat = defender.others.stats.findIndex(val => val.name == 'special-defense')
        damage = calculateDamage(
          move.power,
          attacker.others.stats[indexAttackerStat].base_stat,
          defender.others.stats[indexDefenderStat].base_stat,
          attacker.types,
          move.type,
          defender.types
        )
      }
    }
    
    if (move.hits?.min_hits!==undefined) {
      multiplier = getRandNum(move.hits.min_hits, move.hits.max_hits)
    }
    damage = damage * multiplier
    if (receiver == 'npc') {
      this.npcDamageReceive = damage
    } else {
      this.playerDamageReceive = damage
    }

    defender.currentHp = defender.currentHp - damage
    this.calculatePercentHp()
  }

  animationAttack(player: string, moveType: string) {
    if (player == 'player') {
      setTimeout(()=>{
        this.playerAttackMotion = true
        this.playerAttackClass = moveType
      },500)
      setTimeout(() => {
      this.playerAttackMotion = false
      },4000)
    } else if (player == 'npc') {
      setTimeout(()=>{
        this.npcAttackMotion = true
        this.npcAttackClass = moveType
      },500)
      setTimeout(() => {
        this.npcAttackMotion = false
      },4000)
    }
  }

  moveAccurateOrMiss = (accuracy: number):boolean => {
    return getRandNum(1, accuracy)<=accuracy? true : false
  }

  //battle sequence
  chosenMove(move: MoveModel) {
    this.ongoingBattle = true
    let player = this.currentPlayer1[0]
    let npc = this.currentPlayer2[0]
    let playerMove = move
    let npcMove = this.npcMove()

    this.npcCurrentMoveFx = npcMove[0].moveFx
    this.playerCurrentMoveFx = playerMove.moveFx

    const playerSpeedIndex = player.stats.findIndex(val => val.name == 'speed')
    const npcSpeedIndex = npc.stats.findIndex(val=>val.name=='speed')

    if (
      playerMove.priority > npcMove[0].priority ||
      player.stats[playerSpeedIndex].base_stat > npc.stats[npcSpeedIndex].base_stat ||
      player.stats[playerSpeedIndex].base_stat == npc.stats[npcSpeedIndex].base_stat
    ) {
      if (playerMove.damageClass.name == 'status') {
        switch (playerMove.damageClass.ailment?.category) {
          case 'ailment':
            this.ailment(playerMove,'player-move')
            break
          case 'net-good-stats':
            switch (playerMove.target) {
              case 'user':
                this.buff(playerMove, 'player-move')
                break
              case 'all-opponents':
                this.debuff(playerMove,'player-move')
                break
              case 'selected-pokemon':
                this.debuff(playerMove,'player-move')
                break
            }
          break
        }
      }else{
        this.animationAttack('player', playerMove.damageClass.name)
        setTimeout(() => {
          this.attackSequence(player, npc, playerMove, 'npc')
          //reduce hp npc
        }, 2000)
      }
      setTimeout(() => {
        if (this.currentPlayer2[0].currentHp <= 0) {
          setTimeout(() => {
            this.currentPlayer2Fainted()
            //death timer npc
            },1500)
        } else {
          if (npcMove[0].damageClass.name == 'status') {
            switch (npcMove[0].damageClass.ailment?.category) {
              case 'ailment':
                this.ailment(npcMove[0],'npc-move')
                break
              case 'net-good-stats':
                switch (npcMove[0].target) {
                  case 'user':
                    this.buff(npcMove[0], 'npc-move')
                    break
                  case 'all-opponents':
                    this.debuff(npcMove[0],'npc-move')
                    break
                  case 'selected-pokemon':
                    this.debuff(npcMove[0],'npc-move')
                    break
                }
              break
            }
          }
          this.animationAttack('npc',npcMove[0].damageClass.name)
          setTimeout(()=>{
            this.attackSequence(npc, player, npcMove[0], 'player')
          },
          //reduce hp player
          2000)
          setTimeout(() => {
            if (this.currentPlayer1[0].currentHp <= 0) {
              setTimeout(() => {
                this.currentPlayer1Fainted()
                //death timer player
                },1500)
            } else {
              this.playerOption = 'default'
            }
            //pokemon fainted timer
          },2000)
        }
        //npc turn to attack
      }, 3000)
    } else {
      if (npcMove[0].damageClass.name == 'status') {
        switch (npcMove[0].damageClass.ailment?.category) {
          case 'ailment':
            this.ailment(npcMove[0],'npc-move')
            break
          case 'net-good-stats':
            switch (npcMove[0].target) {
              case 'user':
                this.buff(npcMove[0],'npc-move')
                break
              case 'all-opponents':
                this.debuff(npcMove[0],'npc-move')
                break
              case 'selected-pokemon':
                this.debuff(npcMove[0],'npc-move')
                break
            }
            break
        }   
      }else{ 
        this.animationAttack('npc', npcMove[0].damageClass.name)
        setTimeout(() => {
          this.attackSequence(npc, player, npcMove[0], 'player')
        },
        //reduce hp
        2000)
      }
      setTimeout(() => {
        if (this.currentPlayer1[0].currentHp <= 0) {
          setTimeout(() => {
            this.currentPlayer1Fainted()
          },
          //death timer player
          1500)
        } else {
          if (playerMove.damageClass.name == 'status') {
            switch (playerMove.damageClass.ailment?.category) {
              case 'ailment':
                this.ailment(playerMove, 'player-move')
                break
              case 'net-good-stats':
                switch (playerMove.target) {
                  case 'user':
                    this.buff(playerMove, 'player-move')
                    break
                  case 'all-opponents':
                    this.debuff(playerMove, 'player-move')
                    break
                  case 'selected-pokemon':
                    this.debuff(playerMove, 'player-move')
                    break
                }
                break
            }
          }else{
            this.animationAttack('player', playerMove.damageClass.name)
            setTimeout(() => {
              this.attackSequence(player, npc, playerMove, 'npc')
            },
            //reduce hp player
              2000)
          }
          setTimeout(() => {
            if (this.currentPlayer2[0].currentHp <= 0) {
              setTimeout(() => {
                this.currentPlayer2Fainted()
              },
              //death timer npc
              1500)
            } else {
              this.playerOption = 'default'
            }
            //pokemon fainted timer
          }, 2000)
        }
        //player turn to attack
      }, 3000)
    }

    setTimeout(() => {
      this.ongoingBattle = false
      this.npcDamageReceive = 0
      this.playerDamageReceive = 0
    }, 7000)
  }

  debuff(move: MoveModel, playermove: string) {
    let trainer: PokemonModel = playermove === 'player-move' ? this.currentPlayer1[0] : this.currentPlayer2[0]

    if(move.stat_changes){
      for (let stat_buff of move.stat_changes) {
        let indexStat = trainer.stats.findIndex(req => req.name == stat_buff.stat.name)
        console.log(trainer.others.stats[indexStat].name," ",trainer.others.stats[indexStat].base_stat)
        trainer.others.stats[indexStat].base_stat = trainer.others.stats[indexStat].base_stat - (trainer.others.stats[indexStat].base_stat * multiplier(stat_buff.change))
        console.log(trainer.others.stats[indexStat].name," ",trainer.others.stats[indexStat].base_stat)
      }
    }
  }

  ailment(move: MoveModel, playermove: string) {
    let trainer: PokemonModel = playermove === 'player-move' ? this.currentPlayer1[0] : this.currentPlayer2[0]
  }

  buff(move: MoveModel, playermove: string) {
    let trainer: PokemonModel = playermove === 'player-move' ? this.currentPlayer1[0] : this.currentPlayer2[0]
    let stat_changes = []
    if(move.stat_changes){
      for (let stat_buff of move.stat_changes) {
        stat_changes.push(stat_buff.stat.name)
        let indexStat = trainer.stats.findIndex(req => req.name == stat_buff.stat.name)
        trainer.others.stats[indexStat].base_stat = trainer.others.stats[indexStat].base_stat + (trainer.others.stats[indexStat].base_stat * multiplier(stat_buff.change))
      }
    }
    if (playermove == 'player-move') {
      if (stat_changes){
        this.playerbuff = stat_changes
        this.playerbuffOn = true
        setTimeout(() => {
          this.playerbuffOn = false
        }, 2000)
      }
    } else {
      if (stat_changes){
        this.npcbuff = stat_changes
        this.npcbuffOn = true
        setTimeout(() => {
          this.npcbuffOn = false
        }, 2000)
      }
    }
  }

  resetCurrentPlayerStat(trainer: string) {
    const pokemonStat = trainer == 'player' ? this.currentPlayer1Stat : this.currentPlayer2Stat
    for (const stat of pokemonStat) {
      stat.base_stat = 0
    }
  }

  currentPlayer1Fainted() {
    this.revertOriginPokemonStat('player')
    const faintedPokemon = this.currentPlayer1.pop()
    if (faintedPokemon) {
      this.faintedPokemonPlayer1.push(faintedPokemon)
    }
    if (this.player1.length === 0) {
        this.battleEnd('lose')
    } else{
      this.playerOption = 'swap'
    }
  }

  currentPlayer2Fainted() {
    this.revertOriginPokemonStat('npc')
    const faintedPokemon = this.currentPlayer2.pop()
    if (faintedPokemon) { 
      this.faintedPokemonPlayer2.push(faintedPokemon)
    }
    if (this.player2.length === 0) {
        this.revertOriginPokemonStat('player')
        this.battleEnd('win')
    } else {
      this.currentPlayer2 = this.player2.splice(0, 1)
      this.settingUpInitialStat('npc')
      this.calculatePercentHp()
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
      this.revertOriginPokemonStat('player')
      this.player1.push(...this.currentPlayer1)
      this.currentPlayer1.pop()
      this.npcAttackMotion = true
      setTimeout(() => {
        this.attackSequence(npc, pokemon, npcMove[0],'player')
        this.npcAttackMotion = false
        this.calculatePercentHp()
      },2000)
    }
    
    const index = this.player1.findIndex(val => val == pokemon)
    this.player1.splice(index, 1)
    this.currentPlayer1.push(pokemon)
    this.settingUpInitialStat('player')
    this.calculatePercentHp()
    let player = this.currentPlayer1[0]
    if (player.currentHp <= 0) {
    setTimeout(() => {
      this.currentPlayer1Fainted()
      },1000)
    } else{
      this.playerOption = 'default'
    }
  }

  battleEnd(outcome: string) {
    const returnPokemonPlayer1: PokemonModel [] = []
    const returnPokemonPlayer2: PokemonModel[] = []
    if (outcome === 'win') {
      this.currentPlayer1[0].currentHp = this.currentPlayer1[0].maxHp
    }

    returnPokemonPlayer1.push(
      ...this.faintedPokemonPlayer1,
      ...this.currentPlayer1,
      ...this.player1
    )

    returnPokemonPlayer2.push(
      ...this.faintedPokemonPlayer2,
      ...this.currentPlayer2,
      ...this.player2
    )

    this.tempPokemonContainer1.push(...returnPokemonPlayer1)
    this.tempPokemonContainer2.push(...returnPokemonPlayer2)

    this.outcome = outcome

    setTimeout(() => {
      let i = 0;

      while (i != 3) {
        returnPokemonPlayer1[i].currentHp = returnPokemonPlayer1[i].maxHp
        returnPokemonPlayer1[i].others.stats = returnPokemonPlayer1[i].stats
        returnPokemonPlayer2[i].currentHp = returnPokemonPlayer2[i].maxHp
        returnPokemonPlayer2[i].others.stats = returnPokemonPlayer2[i].stats
        i++
      }

      this.outcomeSubmit.emit({
      outcome,
      returnPokemonPlayer1,
      returnPokemonPlayer2
      })
    }, 10000)

    this.battlePhase = 'battle-done'
  }
}
