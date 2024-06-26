import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { calculateDamage, getRandNum, isSuperEffective, multiplier, typeAdvantage } from 'src/app/helper/pokemon-helper';
import { GymLeader } from 'src/app/model/gym-leader-model.model';
import { MoveModel, StatModel } from 'src/app/model/move-model.model';
import { PokemonModel } from 'src/app/model/pokemon-model.model';
import { chargeMove, powerup, rechargeMove } from 'src/environments/environment-constants';



//  Did - Implemented debuff attack animation and stat debuff
//  To do - Implement debuff fx


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

  moveOverview: any[] = []


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

  megaFrontImageNpc:string
  megaFrontImagePlayer:string

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

  burnOrToxicNpc = ''
  paralyzedNpc = false
  burnOrToxicPlayer = ''
  paralyzedPlayer = false

  playerCondition = ''
  npcCondition = ''

  frozenConfusedAsleepCounterPlayer = 0
  frozenConfusedAsleepCounterNpc = 0


  playerLoseFirstTurn = false
  playerLoseSecondTurn = false

  npcLoseFirstTurn = false
  npcLoseSecondTurn = false

  npcMegaEvolve = false

  npcDamageReceive: number
  playerDamageReceive: number

  narrate: string

  constructor(private router: Router){}

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
    const pokemonStat = trainer == 'player' ?
      this.currentPlayer1
      : this.currentPlayer2
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
    const pokemonStat = trainer == 'player' ?
      this.currentPlayer1Stat
      : this.currentPlayer2Stat
    this.pushEvasionAccuracy(trainer)
    for (let stat of pokemonStat) {
      stat.base_stat+=this.statValue(stat.name, trainer, 'current')
    }
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

  attackSequence(attacker: PokemonModel, defender: PokemonModel, move: MoveModel, receiver: string) {
    let indexAccuracy = attacker.others.stats.findIndex(val => val.name == 'accuracy')
    let indexEvasion = defender.others.stats.findIndex(val=>val.name=='evasion')
    let accuracyAttacker = attacker.others.stats[indexAccuracy].base_stat
    let evasionDefender = defender.others.stats[indexEvasion].base_stat
    let isAccurate = this.moveAccurateOrMiss(move.accuracy,accuracyAttacker, evasionDefender)
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

          //critical
    if (move.crit_rate && move.crit_rate > 0) {
      const randomNumber = getRandNum(1, 100)
      switch (move.crit_rate) {
        case 1:
          if (randomNumber <= 50) {
            damage = Math.floor(damage + (damage/2))
          }
          break
        case 2:
          if (randomNumber <= 80) {
            damage = Math.floor(damage + (damage/2))
          }
          break
        case 3:
          damage = Math.floor(damage + (damage/2))
          break
      }
    }
    }

    if (move.damageClass.ailment) {
      let attacker = receiver == 'npc'? 'player-move' : 'npc-move'
      if (move.stat_changes && move.damageClass.ailment.category === 'damage+raise' && move.target === 'selected-pokemon') {
        this.powerUp(move, attacker)
      }
    }
    
    if (move.hits?.min_hits!==undefined) {
      multiplier = getRandNum(move.hits.min_hits, move.hits.max_hits)
    }
    damage = damage * multiplier
    if (receiver == 'npc') {
      this.npcDamageReceive = damage
      if (move.damageClass.ailment&&move.damageClass.ailment.name!='none') {
        this.ailment(move,'player-move',accuracyAttacker, evasionDefender)
      }
    } else {
      this.playerDamageReceive = damage
      if (move.damageClass.ailment&&move.damageClass.ailment.name!='none') {
        this.ailment(move,'npc-move',accuracyAttacker, evasionDefender)
      }
    }

    defender.currentHp =defender.currentHp - damage
    if (move.drain&&move.drain != 0) {
      attacker.currentHp = Math.floor(attacker.currentHp + (damage * ((move.drain) / 100)))
      if(attacker.currentHp>attacker.maxHp) attacker.currentHp = attacker.maxHp
    }
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

  moveAccurateOrMiss = (accuracy: number, pokemonAccuracy: number, defenderEvasion: number): boolean => {
    let accurate = false
    if (accuracy == null||getRandNum(1, pokemonAccuracy+defenderEvasion) <= accuracy) {
      accurate = true
    } 
    return accurate
  }

  checkingAilment(condition: string) {
    switch (condition) {
      case 'paralysis':
        if (getRandNum(1, 100) <= 25) return 'paralyzed'
        break
      case 'confusion':
        if (getRandNum(1, 100) <= 50) return 'confused'
        break
      case 'freeze':
        return 'frozen'
      case 'sleep':
        return 'asleep'
    }
    return ''
  }

  //battle sequence
  chosenMove(move: MoveModel) {
    this.ongoingBattle = true
    let player = this.currentPlayer1[0]
    let npc = this.currentPlayer2[0]

    if (player.others.stats.length !== 8) {
      player.others.stats.push({
        base_stat: 0,
        name: 'evasion'
      }, {
        base_stat: 100,
        name: 'accuracy'
      })
    }

    let indexEvasionPlayer = player.others.stats.findIndex(val=>val.name == 'evasion')
    let indexEvasionNpc = npc.others.stats.findIndex(val => val.name == 'evasion')
    
    let evasionPlayer = player.others.stats[indexEvasionPlayer].base_stat 
    let evasionNpc = npc.others.stats[indexEvasionNpc].base_stat


    //checking ailment
    if (this.frozenConfusedAsleepCounterPlayer > 0) {
      let randNum = getRandNum(1, this.frozenConfusedAsleepCounterPlayer)
      if(randNum !== 1){
        this.playerCondition = this.checkingAilment(player.others.condition)
      }
      if (player.others.condition != 'paralysis') { this.frozenConfusedAsleepCounterPlayer-- }
      if (this.frozenConfusedAsleepCounterPlayer == 0 && player.others.condition != 'paralysis') {
        player.others.condition = ''
      }
    }

    if (this.frozenConfusedAsleepCounterNpc > 0) {
      let randNum = getRandNum(1, this.frozenConfusedAsleepCounterNpc)
      if(randNum !== 1){
        this.npcCondition = this.checkingAilment(npc.others.condition)
      }
      if (npc.others.condition != 'paralysis') { this.frozenConfusedAsleepCounterNpc-- }
      if (this.frozenConfusedAsleepCounterNpc == 0 && npc.others.condition != 'paralysis') {
        npc.others.condition = ''
      }
    }

    let playerDisabled = this.playerCondition == 'paralyzed' || this.playerCondition == 'confused' || this.playerCondition == 'frozen' || this.playerCondition == 'asleep' ? true : false
    let npcDisabled = this.npcCondition == 'paralyzed' || this.npcCondition == 'confused' || this.npcCondition == 'frozen' || this.npcCondition == 'asleep' ? true : false

    let playerMove = move
    let npcMove = this.npcMove()
    let indexAccuracyPlayer = player.stats.findIndex(val=>val.name=='accuracy')
    let indexAccuracyNpc = npc.stats.findIndex(val=>val.name=='accuracy')
    let playerAccuracy = player.stats[indexAccuracyPlayer].base_stat
    let npcAccuracy = npc.stats[indexAccuracyNpc].base_stat

    //minus pp
    playerMove.pp = playerMove.pp - 1
    npcMove.pp = npcMove.pp - 1 

    if (this.playerLoseFirstTurn || this.playerLoseSecondTurn) {
      playerMove.pp++
    } else if (this.npcLoseFirstTurn || this.npcLoseSecondTurn) {
      npcMove.pp++
    }

    //checking charge move
    if (chargeMove.includes(playerMove.name)&&!this.playerLoseFirstTurn) {
      playerDisabled = true
      this.playerLoseFirstTurn = true
    } else if (chargeMove.includes(playerMove.name) && this.playerLoseFirstTurn) {
      this.playerLoseFirstTurn = false
    } 

    //checking recharge move
    if (rechargeMove.includes(playerMove.name) && !this.playerLoseSecondTurn) {
      this.playerLoseSecondTurn = true
    } else if (rechargeMove.includes(npcMove.name) && !this.npcLoseSecondTurn) {
      this.npcLoseSecondTurn = true
    } else if (this.playerLoseSecondTurn) {
      playerDisabled = true
      this.playerLoseSecondTurn = false
    } else if (this.npcLoseSecondTurn) {
      npcDisabled = true
      this.npcLoseSecondTurn = false
    }

    this.npcCurrentMoveFx = npcMove.moveFx
    this.playerCurrentMoveFx = playerMove.moveFx

    const playerSpeedIndex = player.stats.findIndex(val => val.name == 'speed')
    const npcSpeedIndex = npc.stats.findIndex(val => val.name == 'speed')
    

    this.closeOverview()

    if (
      playerMove.priority > npcMove.priority ||
      player.stats[playerSpeedIndex].base_stat > npc.stats[npcSpeedIndex].base_stat ||
      player.stats[playerSpeedIndex].base_stat == npc.stats[npcSpeedIndex].base_stat
    ) {
      if (!playerDisabled && playerMove.damageClass.name == 'status') {
        this.narrate = `${this.currentPlayer1[0].name.toLocaleUpperCase()} use ${playerMove.name.toLocaleUpperCase()}!`
        switch (playerMove.damageClass.ailment?.category) {
          case 'ailment':
            this.ailment(playerMove,'player-move',playerAccuracy, evasionNpc)
            break
          case 'net-good-stats':
            if (playerMove.target=='user'||playerMove.target=='all-opponents'||'selected-pokemon') {
              this.powerUp(playerMove, 'player-move')
            }
          break
        }
      }else if(!playerDisabled){
        this.animationAttack('player', playerMove.damageClass.name)
        this.narrate = `${this.currentPlayer1[0].name.toLocaleUpperCase()} use ${playerMove.name.toLocaleUpperCase()}!`
        setTimeout(() => {
          this.attackSequence(player, npc, playerMove, 'npc')
          //reduce hp npc
        }, 1500)
      } else {
        if (this.playerCondition == 'confused') {
          this.narrate = `${this.currentPlayer1[0].name.toLocaleUpperCase()} is confused!`
          this.animationAttack('player', 'special')
          setTimeout(() => {
            let indexAttackerStat = player.others.stats.findIndex(val => val.name == 'attack')
            let indexDefenderStat = player.others.stats.findIndex(val => val.name == 'defense')
            let damage = calculateDamage(
              40,
              player.others.stats[indexAttackerStat].base_stat,
              player.others.stats[indexDefenderStat].base_stat,
              player.types,
              'normal',
              player.types
            )
  
            player.currentHp -= damage
            this.calculatePercentHp()
            //reduce hp player
          }, 1500)
        }
      }
      setTimeout(() => {
        if (player.others.condition == 'poison' || player.others.condition == 'burn') {
          this.burnOrToxicPlayer = player.others.condition
          player.currentHp -= Math.floor(player.maxHp * .12)
        }
        if (this.currentPlayer1[0].currentHp <= 0) {
          setTimeout(() => {
            this.currentPlayer1Fainted()
            //death timer player
            },500)
        }
      }, 1300)
      setTimeout(() => {
        if (this.currentPlayer2[0].currentHp <= 0) {
          setTimeout(() => {
            this.currentPlayer2Fainted()
            //death timer npc
            },1500)
        } else {
          if (!npcDisabled && npcMove.damageClass.name == 'status') {
            this.narrate = `${this.currentPlayer2[0].name.toLocaleUpperCase()} use ${npcMove.name.toLocaleUpperCase()}!`
            switch (npcMove.damageClass.ailment?.category) {
              case 'ailment':
                this.ailment(npcMove, 'npc-move', npcAccuracy, evasionPlayer)
                break
              case 'net-good-stats':
                if (npcMove.target == "user" || npcMove.target == "all-opponents" || npcMove.target == "selected-pokemon") {
                  this.powerUp(npcMove, 'npc-move')
                }
                break
            }
          } else if (!npcDisabled) {
            this.animationAttack('npc', npcMove.damageClass.name)
            this.narrate = `${this.currentPlayer2[0].name.toLocaleUpperCase()} use ${npcMove.name.toLocaleUpperCase()}!`
            setTimeout(() => {
              this.attackSequence(npc, player, npcMove, 'player')
            },
              //reduce hp player
              1500)
          } else {
            {
              if (this.npcCondition == 'confused') {
                this.narrate = `${this.currentPlayer2[0].name} is confused!`
                this.animationAttack('npc', 'special')
                setTimeout(() => {
                  let indexAttackerStat = npc.others.stats.findIndex(val => val.name == 'attack')
                  let indexDefenderStat = npc.others.stats.findIndex(val => val.name == 'defense')
                  let damage = calculateDamage(
                    40,
                    npc.others.stats[indexAttackerStat].base_stat,
                    npc.others.stats[indexDefenderStat].base_stat,
                    npc.types,
                    'normal',
                    npc.types
                  )
        
                  npc.currentHp -= damage
                  this.calculatePercentHp()
                }, 1500)
              }
            }
          }
          setTimeout(() => {
            if (npc.others.condition == 'poison' || npc.others.condition == 'burn') {
              this.burnOrToxicNpc = npc.others.condition
              npc.currentHp -= Math.floor(npc.maxHp * .12)
              if (this.currentPlayer2[0].currentHp <= 0) {
                setTimeout(() => {
                  this.currentPlayer2Fainted()
                  //death timer npc
                }, 500)
              }
          }},1300)
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
      if (!npcDisabled && npcMove.damageClass.name == 'status') {
        this.narrate = `${this.currentPlayer2[0].name.toLocaleUpperCase()} use ${npcMove.name.toLocaleUpperCase()}!`
        switch (npcMove.damageClass.ailment?.category) {
          case 'ailment':
            this.ailment(npcMove,'npc-move', npcAccuracy, evasionPlayer)
            break
          case 'net-good-stats':
            if (npcMove.target == 'user' || npcMove.target == 'all-opponents' || npcMove.target == 'selected-pokemon') {
              this.powerUp(npcMove,'npc-move')
            }
            break
        }   
      }else if(!npcDisabled){ 
        this.animationAttack('npc', npcMove.damageClass.name)
        this.narrate = `${this.currentPlayer2[0].name.toLocaleUpperCase()} use ${npcMove.name.toLocaleUpperCase()}!`
        setTimeout(() => {
          this.attackSequence(npc, player, npcMove, 'player')
        },
        //reduce hp
        1500)
      } else {
        {
          if (this.npcCondition == 'confused') {
            this.narrate = `${this.currentPlayer2[0].name.toLocaleUpperCase()} is confused!`
            this.animationAttack('npc', 'special')
            setTimeout(() => {
              let indexAttackerStat = npc.others.stats.findIndex(val => val.name == 'attack')
              let indexDefenderStat = npc.others.stats.findIndex(val => val.name == 'defense')
              let damage = calculateDamage(
                40,
                npc.others.stats[indexAttackerStat].base_stat,
                npc.others.stats[indexDefenderStat].base_stat,
                npc.types,
                'normal',
                npc.types
              )
    
              npc.currentHp -= damage
              this.calculatePercentHp()
              //reduce hp player
            }, 1500)
          }
        }
      }
      setTimeout(() => {
        if (npc.others.condition == 'poison' || npc.others.condition == 'burn') {
          this.burnOrToxicNpc = npc.others.condition
          npc.currentHp -= Math.floor(npc.maxHp * .12)
          if (this.currentPlayer2[0].currentHp <= 0) {
            setTimeout(() => {
              this.currentPlayer2Fainted()
              //death timer npc
            }, 500)
          }
      }},1300)
      setTimeout(() => {
        if (this.currentPlayer1[0].currentHp <= 0) {
          setTimeout(() => {
            this.currentPlayer1Fainted()
          },
          //death timer player
          1500)
        } else {
          if (!playerDisabled && playerMove.damageClass.name == 'status') {
            this.narrate = `${this.currentPlayer1[0].name.toLocaleUpperCase()} use ${playerMove.name.toLocaleUpperCase()}!`
            switch (playerMove.damageClass.ailment?.category) {
              case 'ailment':
                this.ailment(playerMove, 'player-move',playerAccuracy, evasionNpc)
                break
              case 'net-good-stats':
                if (playerMove.target=='user'||playerMove.target=='all-opponents'||'selected-pokemon') {
                    this.powerUp(playerMove, 'player-move')
                }
                break
            }
          }else if(!playerDisabled){
            this.animationAttack('player', playerMove.damageClass.name)
            this.narrate = `${this.currentPlayer1[0].name.toLocaleUpperCase()} use ${playerMove.name.toLocaleUpperCase()}!`
            setTimeout(() => {
              this.attackSequence(player, npc, playerMove, 'npc')
            },
            //reduce hp player
              1500)
          } else {
            {
              if (this.playerCondition == 'confused') {
                this.narrate = `${this.currentPlayer1[0].name} is confused!`
                this.animationAttack('player', 'special')
                setTimeout(() => {
                  let indexAttackerStat = player.others.stats.findIndex(val => val.name == 'attack')
                  let indexDefenderStat = player.others.stats.findIndex(val => val.name == 'defense')
                  let damage = calculateDamage(
                    40,
                    player.others.stats[indexAttackerStat].base_stat,
                    player.others.stats[indexDefenderStat].base_stat,
                    player.types,
                    'normal',
                    player.types
                  )
        
                  player.currentHp -= damage
                  this.calculatePercentHp()
                  //reduce hp player
                }, 1500)
              }
            }
          }
          setTimeout(() => {
            if (player.others.condition == 'poison' || player.others.condition == 'burn') {
              this.burnOrToxicPlayer = player.others.condition
              player.currentHp -= Math.floor(player.maxHp * .12)
              if (this.currentPlayer1[0].currentHp <= 0) {
                setTimeout(() => {
                  this.currentPlayer1Fainted()
                  //death timer player
                }, 500)
              }
          }},1300)
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
      this.narrate = ''
      this.npcDamageReceive = -1
      this.playerDamageReceive = -1
      this.burnOrToxicNpc = ''
      this.burnOrToxicPlayer = ''
      this.paralyzedNpc = false
      this.paralyzedNpc = false
      this.playerCondition = ''
      this.npcCondition = ''
      playerDisabled = false
      npcDisabled = false

      if (this.playerLoseFirstTurn||this.playerLoseSecondTurn) {
        this.chosenMove(playerMove)
      } 
    }, 7000)
  }

  ailment(move: MoveModel, playermove: string, accuracyAttacker:number, evasionDefender: number) {
    let trainerOpponent: PokemonModel = playermove === 'player-move' ? this.currentPlayer2[0] : this.currentPlayer1[0]
    if (move.damageClass.ailment&&trainerOpponent.others.condition === '') {
      let ailment = move.damageClass.ailment.name
      if (move.damageClass.name == 'status' && this.moveAccurateOrMiss(move.accuracy,accuracyAttacker, evasionDefender)) {
        this.animationAttack(playermove === 'player-move' ? 'player' : 'npc', 'special')
        trainerOpponent.others.condition = ailment
      } else if(move.effect_chance&&this.moveAccurateOrMiss(move.effect_chance,accuracyAttacker, evasionDefender)){
        trainerOpponent.others.condition = ailment
      }
      playermove === 'player-move' ? this.frozenConfusedAsleepCounterNpc = 4 : this.frozenConfusedAsleepCounterPlayer = 4

      if (trainerOpponent.others.condition === 'paralysis') {
        let indexOfSpeed = trainerOpponent.others.stats.findIndex(val => val.name == 'speed')
        trainerOpponent.others.stats[indexOfSpeed].base_stat = trainerOpponent.others.stats[indexOfSpeed].base_stat- trainerOpponent.others.stats[indexOfSpeed].base_stat*.25
      }
    }
  }

  debuff(base_stat: number, change: number) {
    let new_base_stat = Math.floor(base_stat - (base_stat * multiplier(change)))
    return new_base_stat >1 ? new_base_stat : base_stat
  }

  buff(name:string, base_stat: number, change: number) {
    if (name=='evasion'&&base_stat == 0) {
      base_stat = 40
    }
    return base_stat >=200? base_stat: Math.floor(base_stat+(base_stat*multiplier(change)))
  }

  powerUp(move: MoveModel, playermove: string) {
    let trainer: PokemonModel = playermove === 'player-move' ? this.currentPlayer1[0] : this.currentPlayer2[0]
    let trainerOpponent: PokemonModel = playermove === 'player-move' ? this.currentPlayer2[0] : this.currentPlayer1[0]
    let stat_changes = []
    if(move.stat_changes){
      for (let stat_buff of move.stat_changes) {
        stat_changes.push(stat_buff.stat.name)
        let indexStat = trainer.stats.findIndex(req => req.name == stat_buff.stat.name)
        if (stat_buff.change > 0) {
          trainer.others.stats[indexStat].base_stat = this.buff(trainer.others.stats[indexStat].name,trainer.others.stats[indexStat].base_stat, stat_buff.change)
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
        } else {
          if (move.target.includes('opponent')) {
            trainerOpponent.others.stats[indexStat].base_stat = this.debuff(trainerOpponent.others.stats[indexStat].base_stat, stat_buff.change)
            if(move.damageClass.name == 'status'){
              this.animationAttack(playermove === 'player-move' ? 'player' : 'npc', 'special')
            }
          }else{
            trainer.others.stats[indexStat].base_stat = this.debuff(trainer.others.stats[indexStat].base_stat, stat_buff.change)
          }
        }
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
    this.playerLoseFirstTurn = false
    this.playerLoseSecondTurn = false
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
    this.npcLoseFirstTurn = false
    this.npcLoseSecondTurn = false
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
      if (this.currentPlayer2[0].others.canMegaEvolve) {
        this.npcMegaEvolve = true
        const megaFrontImageNpc = this.currentPlayer2[0].front_image
        this.currentPlayer2[0].front_image = this.currentPlayer2[0].others.originalValues.front_image
        setTimeout(() => {
          this.currentPlayer2[0].front_image = megaFrontImageNpc
          this.currentPlayer2[0].others.isMegaEvolve
        },2000)
      }
      this.settingUpInitialStat('npc')
      this.calculatePercentHp()
      this.playerOption = 'default'
    }
  }

  megaEvolution(originFrontImage: string) {
    
  }

  npcMove():MoveModel {
    let TYPE = 0;
    let typeArr = this.currentPlayer1[0].types
    let chosenNpcMove: MoveModel[] = []

    for (let move of this.currentPlayer2[0].moves) {
      if (move.pp > 0) {
        let newType
        if (this.currentPlayer1[0].others.condition == '' && move.damageClass.ailment && move.damageClass.ailment.category == 'ailment') {
          return move
        } else if(move.damageClass.ailment&&move.damageClass.ailment.category == 'net-good-stats'&&move.pp==move.ppMax){
          return move
        }else if (typeArr.typeTwo) {
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
    }
    return chosenNpcMove[0]
  }

  closeOverview() {
    this.moveOverview = []
  }

  openOverview(move: MoveModel) {
    this.moveOverview.push(move)
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
        this.attackSequence(npc, pokemon, npcMove,'player')
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

  spliceEvasionAccuracy(pokemon: PokemonModel) {
    let indexEvasion = pokemon.others.stats.findIndex(val=>val.name=='evasion')
    let indexAccuracy = pokemon.others.stats.findIndex(val => val.name == 'accuracy')
    
    pokemon.others.stats.splice(indexEvasion,1)
    pokemon.others.stats.splice(indexAccuracy, 1)
    return pokemon
  }

  battleEnd(outcome: string) {
    const returnPokemonPlayer1: PokemonModel [] = []
    const returnPokemonPlayer2: PokemonModel[] = []
    const perfect: boolean = this.faintedPokemonPlayer1.length === 0 ? true : false
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
        returnPokemonPlayer1[i].others.condition = ''
        returnPokemonPlayer2[i].currentHp = returnPokemonPlayer2[i].maxHp
        returnPokemonPlayer2[i].others.stats = returnPokemonPlayer2[i].stats
        returnPokemonPlayer2[i].others.condition = ''

        for (let move of returnPokemonPlayer1[i].moves) {
          move.pp = move.ppMax
        }

        for (let move of returnPokemonPlayer2[i].moves) {
          move.pp = move.ppMax
        }

        i++
      }

      this.outcomeSubmit.emit({
        outcome: outcome,
        player1pokemons: returnPokemonPlayer1,
        player2pokemons: returnPokemonPlayer2,
        perfect: perfect
      })
    }, 10000)

    this.battlePhase = 'battle-done'
  }

  signout() {
    localStorage.clear()
    this.router.navigate(['/'])
  }
}
