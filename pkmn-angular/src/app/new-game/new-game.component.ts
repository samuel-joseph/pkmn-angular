import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../_services/pokemon/pokemon.service';
import { PokemonModel, RegionPokemon } from '../model/pokemon-model.model';
import { getStats, getTypes, calculateHp, getRandNum } from '../helper/pokemon-helper';
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
    regionPokemons: RegionPokemon[] = []
    dbMoves: MoveModel[] = []
    FinalArrMove: MoveModel[] = []
    pokemon: PokemonModel
    toDisplayPokemon: any[] = []
  
    gameLoading = true
    
    myPokemons: PokemonModel[] = []
  
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

  ngOnInit(): void {
    for (let pokemon of this.moveListArr) {
      this.http.getPokemonMove(`${pokemon}`).subscribe((move) => {
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


        this.dbMoves.push({
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
    setTimeout(() => {
      this.gameLoading = false
    }, 10700)
  }

  getRegion(region: string) {
    let copyRegionPokemons = this.pokemonService.getPokemonRegion(region)
    this.regionPokemons = copyRegionPokemons
  }

  displayPokemon(id: string) {
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
          let groupOne:MoveModel[] = tempDbMoves.filter(move => move.type == types.typeOne)
          let groupTwo:MoveModel[] = types.typeTwo && tempDbMoves.filter(move => move.type == types.typeTwo)
          let nonGroupOne:MoveModel[] = tempDbMoves.filter(move => move.type !== types.typeOne)

          while (i < 4) {
            let randomNum
            let index: number
            let name: string
            if (i == 0) {
              randomNum = getRandNum(0, groupOne.length - 1)
              name = groupOne[randomNum].name
              let findIndex = groupOne.findIndex(pokemon=>pokemon.name == name)
              moveSet.push(groupOne[randomNum])
              groupOne.splice(findIndex,1)
            } else if (i == 1&&groupTwo!==undefined&&groupTwo.length>0) { 
              randomNum = getRandNum(0, groupTwo.length - 1)
              name = groupTwo[randomNum].name
              moveSet.push(groupTwo[randomNum])
              let findIndex = groupTwo.findIndex(pokemon => pokemon.name == name)
              groupTwo.splice(findIndex,1)
            } else if (i == 2) { 
              randomNum = getRandNum(0, nonGroupOne.length - 1)
              name = nonGroupOne[randomNum].name
              moveSet.push(nonGroupOne[randomNum])
              let findIndex = nonGroupOne.findIndex(pokemon => pokemon.name == name)
              nonGroupOne.splice(findIndex,1)
            } else {
              randomNum = getRandNum(0, tempDbMoves.length - 1)
              name = tempDbMoves[randomNum].name
              moveSet.push(tempDbMoves[randomNum])
            }

            index = tempDbMoves.findIndex(move => move.name == name)
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
  }

  chosenPokemon(chosen: PokemonModel) {
    let isUnique;
    this.emptyDisplay()
    isUnique = this.myPokemons.filter(pokemon => pokemon.id == chosen.id)
    if (isUnique.length < 1 || isUnique == undefined) {
      this.myPokemons.push(chosen)
      if (this.myPokemons.length == 6) {
        this.pokemonSubmit.emit({ pokemon: this.myPokemons, next:'player', dbMoves: this.dbMoves })
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
