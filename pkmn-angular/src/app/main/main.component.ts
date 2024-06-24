import { Component, OnInit } from '@angular/core';
import { PokemonModel } from '../model/pokemon-model.model';
import { MoveModel } from '../model/move-model.model';
import { environment } from 'src/environments/environment';
import { StateService } from '../_services/state/state.service';
import { PokemonService } from '../_services/pokemon/pokemon.service';
import { Router } from '@angular/router';
import { MoveService } from '../_services/move/move.service';
import { moveFxRecords } from 'src/environments/environment-constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  title = 'pkmn-angular';
  myPokemon: PokemonModel[] = []
  dbMove: MoveModel[] = []
  page: string
  gymLeaders: any[] = []
  pokemonObj = {}
  moveListArr = environment.moveDb

  constructor(
    private router: Router,
    private stateService: StateService,
    private http: PokemonService,
    private moveService: MoveService
  ) { }

  async ngOnInit(): Promise<void> {
    // await this.initializeAllMoves()
    this.stateService.getState().subscribe(response => {
      if (response.email === '') {
        localStorage.clear()
        this.router.navigate(['/login'])
      } else {
        // this.grabMovesets()
        this.myPokemon = response.pokemons
        this.gymLeaders = environment.gymLeaders
        let i = 0
        while (i < response.victory) {
          this.gymLeaders[i].gymLose = true
          i++
        }
        if (this.myPokemon.length < 1) {
          this.page = 'newGame'
        } else {
          this.page='pre-battle'
        }
      }
    })
  }

  public transition(child: any): void {
    switch (child.next) {
      case "player":
        this.myPokemon.push(...child.pokemon)
        this.dbMove.push(...child.dbMoves)
        break
      case "pre-batlle":
        this.myPokemon.push(...child.pokemon)
        break
    }
    this.pokemonObj = {
      pokemon: this.myPokemon,
      gymLeaders: this.gymLeaders,
      dbMove: this.dbMove
    }
    this.page = child.next
  }

  initializeAllMoves() {
    this.moveService.getAllMoves().subscribe(response => {
      const allMoves = response
      for (let move of allMoves) {
        move.moveFx = this.getMoveFx(move)
        this.moveService.updateMove(move).subscribe((response) => {
          console.log('Move updated successfully ',response)
        }),
          (error: any) => {
            console.log('Error updating move',error)
          }
      }
    })
  }

  // grabMovesets() {
  //   for (let pokemon of this.moveListArr) {
  //     this.http.getPokemonMove(`${pokemon}`).subscribe((move) => {
  //       let ailment, hits, crit_rate

  //       if (move.meta) {
  //         ailment = {
  //           name: move.meta.ailment['name'],
  //           category: move.meta.category['name'],
  //           chance: move.meta.ailment_chance
  //         }
  //         hits = {
  //           min_hits: move.meta.min_hits != null ? move.meta.min_hits : undefined,
  //           max_hits: move.meta.max_hits != null ? move.meta.max_hits : undefined
  //         }
  //         crit_rate = move.meta.crit_rate
          
  //       }

  //       let moveFx = this.getMoveFx(move.type.name, move.power)

  //       let description 
  //       for (let desc of move.flavor_text_entries) {
  //         if (desc.language.name == "en") {
  //           description = desc.flavor_text
  //         }
  //       }


  //       this.dbMove.push({
  //         id: move.id,
  //         name: move.name,
  //         power: move.power,
  //         pp: move.pp,
  //         ppMax: move.pp,
  //         type: move.type.name,
  //         accuracy: move.accuracy,
  //         damageClass: {
  //           name: move.damage_class.name,
  //           ailment
  //         },
  //         effect_chance: move.effect_chance,
  //         stat_changes: move.stat_changes,
  //         priority: move.priority,
  //         hits,
  //         crit_rate: move.meta.crit_rate,
  //         moveFx,
  //         target: move.target.name,
  //         description,
  //         drain: move.meta.drain
  //       })
  //     })
  //   }
  // }

  loadMoves() {
    const dbMoves: MoveModel[] = []
    for (let i = 0; i < this.moveListArr.length; i++) {
      this.http.getPokemonMove(`${this.moveListArr[i]}`).subscribe((move) => {
        let ailment, hits, crit_rate

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

        let moveFx = this.getMoveFx(move)

        let description 
        for (let desc of move.flavor_text_entries) {
          if (desc.language.name == "en") {
            description = desc.flavor_text
          }
        }


        dbMoves.push({
          _id: move._id,
          id: move.id,
          name: move.name,
          power: move.power,
          pp: move.pp,
          ppMax: move.pp,
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
          crit_rate: move.meta.crit_rate,
          moveFx,
          target: move.target.name,
          description,
          drain: move.meta.drain
        })
      })
    }
    this.stateService.setMoveState(dbMoves)
  }

  getMoveFx(move: MoveModel) {

    if (move.name.includes('slash')) {
      return moveFxRecords.slash
    } else if (move.name.includes('punch')&&move.power>=100) {
      return moveFxRecords.punch
    } else if (move.name.includes('shuriken')) {
      return moveFxRecords.shuriken
    }

    let moveDamage = ''
    if (move.power > 70) {
      moveDamage = 'strong'
    } else {
      moveDamage = 'medium'
    }
    
    switch (moveDamage) {
      case 'medium':
        switch (move.type) {
          case 'water':
            return move.damageClass.name == 'physical' ?
              moveFxRecords.bluePhysical
              : moveFxRecords.waterSpecialMid
          case 'fire':
            return move.damageClass.name == 'physical' ?
            moveFxRecords.firePhysical
            : moveFxRecords.fireSpecialMid
          case 'grass':
            return move.damageClass.name == 'physical' ?
            moveFxRecords.grassPhysical
            : moveFxRecords.grassSpecial
          case 'electric':
            return move.damageClass.name == 'physical' ?
              moveFxRecords.thunderPhysical
              : moveFxRecords.thunderSpecialMid
          case 'fighting':
            return move.damageClass.name == 'physical' ?
              moveFxRecords.fighting 
              : moveFxRecords.thunderPhysical
          case 'normal':
            return moveFxRecords.normalPhysical
          case 'dragon':
            return move.damageClass.name == 'physical' ?
              moveFxRecords.dragonPhysical
              : moveFxRecords.purpleSpecial
          case 'ghost':
            return move.damageClass.name == 'physical' ?
              moveFxRecords.psychicPhysical
              : moveFxRecords.dark
          case 'psychic':
            return move.damageClass.name == 'physical' ?
              moveFxRecords.psychicPhysical
              : moveFxRecords.psychicSpecial
          case 'steel':
            return moveFxRecords.metal1
          case 'fairy':
            return moveFxRecords.pinkBlast
          case 'dark':
            return moveFxRecords.dark
          case 'bug':
            return moveFxRecords.grassPhysical
          case 'flying':
            return moveFxRecords.fighting
          case 'ice':
            return moveFxRecords.ice
          case 'rock':
            return moveFxRecords.boulder
          case 'ground':
            return moveFxRecords.normalPhysical
          case 'poison':
            return moveFxRecords.violetDiamond
          default:
            return move.damageClass.name == 'physical' ?
              moveFxRecords.normalPhysical
              : moveFxRecords.normalSpecial
        }
      case 'strong':
        switch (move.type) {
          case 'water':
            return moveFxRecords.waterSpecialHard
          case 'fire':
            return moveFxRecords.fireSpecialHard
          case 'grass':
            return moveFxRecords.grassUlt
          case 'electric':
            return moveFxRecords.thunderSpecialHard
          case 'fighting':
            return moveFxRecords.fighting
          case 'normal':
            return moveFxRecords.strongBlast
          case 'dragon':
          return move.damageClass.name == 'physical' ?
          moveFxRecords.dragonPhysical
          : moveFxRecords.aura
          case 'ghost':
            return moveFxRecords.purpleSpecial
          case 'psychic':
            return moveFxRecords.psychicSpecialHard
          case 'steel':
            return moveFxRecords.metal2
          case 'fairy':
            return moveFxRecords.pinkBlast2
          case 'dark':
            return moveFxRecords.blackBlast
          case 'bug':
            return moveFxRecords.grassStrong
          case 'flying':
            return moveFxRecords.windSpecial
          case 'ice':
            return moveFxRecords.ice1
          case 'rock':
            return moveFxRecords.rockSpecial
          case 'ground':
            return moveFxRecords.groundSpecial
          case 'poison':
            return moveFxRecords.violetDiamond
          default:
            return move.damageClass.name == 'physical' ?
            moveFxRecords.normalPhysical
            : moveFxRecords.normalSpecial
        }
    }
    return move.damageClass.name == 'physical' ?
    moveFxRecords.normalPhysical
    : moveFxRecords.normalSpecial
  }
}
