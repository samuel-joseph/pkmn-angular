import { Component, OnInit } from '@angular/core';
import { PokemonModel } from '../model/pokemon-model.model';
import { MoveModel } from '../model/move-model.model';
import { environment } from 'src/environments/environment';
import { StateService } from '../_services/state/state.service';
import { PokemonService } from '../_services/pokemon/pokemon.service';
import { Router } from '@angular/router';
import { MoveService } from '../_services/move/move.service';

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
    for (let idMove of this.moveListArr) {
      this.http.getPokemonMove(`${idMove}`).subscribe((move)=>{
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

        let moveFx = this.getMoveFx(move.type.name, move.power)

        let description 
        for (let desc of move.flavor_text_entries) {
          if (desc.language.name == "en") {
            description = desc.flavor_text
          }
        }


        const data:MoveModel = {
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
        }

        this.moveService.addMove(data).subscribe(response=> console.log(response))
      })
    }
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

        let moveFx = this.getMoveFx(move.type.name,move.power)

        let description 
        for (let desc of move.flavor_text_entries) {
          if (desc.language.name == "en") {
            description = desc.flavor_text
          }
        }


        dbMoves.push({
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

  getMoveFx(moveType: string, power: number) {
    let moveDamage = ''
    if (power > 70) {
      moveDamage = 'strong'
    } else {
      moveDamage = 'medium'
    }
    
    switch (moveDamage) {
      case 'medium':
        switch (moveType) {
          case 'water':
            return 'https://thumbs.gfycat.com/InformalWellwornCockroach-small.gif'
          case 'fire':
            return 'https://i.pinimg.com/originals/29/ca/76/29ca767e0d917e541cd18eb97f4825dc.gif'
          case 'grass':
            return 'https://i.imgur.com/uDJiGRk.gif'
          case 'electric':
            return 'https://media3.giphy.com/media/ebQMQkzmJNT7G/source.gif'
          case 'fighting':
            return 'https://cdna.artstation.com/p/assets/images/images/015/934/194/original/joshua-gates-quick-explosion.gif?1550235110'
          case 'normal':
            return 'https://cdna.artstation.com/p/assets/images/images/015/934/194/original/joshua-gates-quick-explosion.gif?1550235110'
          case 'dragon':
            return 'https://orangemushroom.files.wordpress.com/2016/07/demon-awakening-effect-slash-1.gif?w=400'
          case 'ghost':
            return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/96269ce8-4a07-4702-936a-6860e1b5594f/dc62zhb-097d58db-0e51-4e7e-b3b4-8cee199d08a4.png/v1/fit/w_150,h_150,strp/shadow_ball__redesign__by_venjix5_dc62zhb-150.png'
          case 'psychic':
            return 'https://i.gifer.com/OupZ.gif'
          case 'steel':
            return 'https://miro.medium.com/v2/resize:fit:1400/1*itTs80OkVKKxysXRr9svew.gif'
          case 'fairy':
            return 'https://thumbs.gfycat.com/PlumpKnobbyArmednylonshrimp-size_restricted.gif'
          case 'dark':
            return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/96269ce8-4a07-4702-936a-6860e1b5594f/dc62zhb-097d58db-0e51-4e7e-b3b4-8cee199d08a4.png/v1/fit/w_150,h_150,strp/shadow_ball__redesign__by_venjix5_dc62zhb-150.png'
          case 'bug':
            return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/96269ce8-4a07-4702-936a-6860e1b5594f/dc62zhb-097d58db-0e51-4e7e-b3b4-8cee199d08a4.png/v1/fit/w_150,h_150,strp/shadow_ball__redesign__by_venjix5_dc62zhb-150.png'
          case 'flying':
            return 'https://thumbs.gfycat.com/RaggedMixedBlackfly-max-1mb.gif'
          case 'ice':
            return 'https://clipart-library.com/img/973912.gif'
          case 'rock':
            return 'https://media3.giphy.com/media/SFinpavCE7qC4ed3AG/giphy.gif?cid=6c09b9525a92lkkl5w214mkl5hxm1sd4eqoyvvj9yg69p68i&ep=v1_stickers_related&rid=giphy.gif&ct=s'
          case 'ground':
            return 'https://i.gifer.com/o8G.gif'
          case 'poison':
            return 'https://i.gifer.com/OupZ.gif'
          default:
            return 'https://www.freeiconspng.com/thumbs/x-png/x-png-18.png'
        }
      case 'strong':
        switch (moveType) {
          case 'water':
            return 'https://webstockreview.net/images/clipart-mountain-ocean-1.gif'
          case 'fire':
            return 'https://i.gifer.com/3q62.gif'
          case 'grass':
            return 'https://thumbs.gfycat.com/PlumpKnobbyArmednylonshrimp-size_restricted.gif'
          case 'electric':
            return 'https://i.gifer.com/4bXG.gif'
          case 'fighting':
            return 'https://cdna.artstation.com/p/assets/images/images/015/934/194/original/joshua-gates-quick-explosion.gif?1550235110'
          case 'normal':
            return 'https://media2.giphy.com/media/dphDDCpGfzJPq/source.gif'
          case 'dragon':
            return 'https://pa1.narvii.com/6881/3e2030d2b7d2ffe47e7fd0fa6fea2b7ce27f43fdr1-350-500_hq.gif'
          case 'ghost':
            return 'https://thumbs.gfycat.com/SickEnchantingAdamsstaghornedbeetle-small.gif'
          case 'psychic':
            return 'https://pa1.narvii.com/6916/24eaf472b2d3a587aed0c268fcd42f35aedb7061r1-1024-1024_hq.gif'
          case 'steel':
            return 'https://miro.medium.com/v2/resize:fit:1400/1*itTs80OkVKKxysXRr9svew.gif'
          case 'fairy':
            return 'https://thumbs.gfycat.com/PlumpKnobbyArmednylonshrimp-size_restricted.gif'
          case 'dark':
            return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/96269ce8-4a07-4702-936a-6860e1b5594f/dc62zhb-097d58db-0e51-4e7e-b3b4-8cee199d08a4.png/v1/fit/w_150,h_150,strp/shadow_ball__redesign__by_venjix5_dc62zhb-150.png'
          case 'bug':
            return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/96269ce8-4a07-4702-936a-6860e1b5594f/dc62zhb-097d58db-0e51-4e7e-b3b4-8cee199d08a4.png/v1/fit/w_150,h_150,strp/shadow_ball__redesign__by_venjix5_dc62zhb-150.png'
          case 'flying':
            return 'https://thumbs.gfycat.com/RaggedMixedBlackfly-max-1mb.gif'
          case 'ice':
            return 'https://clipart-library.com/img/973912.gif'
          case 'rock':
            return 'https://media3.giphy.com/media/SFinpavCE7qC4ed3AG/giphy.gif?cid=6c09b9525a92lkkl5w214mkl5hxm1sd4eqoyvvj9yg69p68i&ep=v1_stickers_related&rid=giphy.gif&ct=s'
          case 'ground':
            return 'https://i.gifer.com/o8G.gif'
          case 'poison':
            return 'https://i.gifer.com/OupZ.gif'
          default:
            return 'https://www.freeiconspng.com/thumbs/x-png/x-png-18.png'
        }
    }
    return 'https://www.freeiconspng.com/thumbs/x-png/x-png-18.png'
  }
}
