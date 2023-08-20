import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../_services/pokemon/pokemon.service';
import { RegionPokemon } from '../model/pokemon-model.model';
import { getStats, getTypes, calculateHp } from '../helper/pokemon-helper';
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
    myPokemons: any[] = []
    regionPokemons: RegionPokemon[] = []
    dbMoves: MoveModel[] = []
    FinalArrMove: MoveModel[] = []
  pokemon: any
  toDisplayPokemon: any[] = []
  
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
          crit_rate,
          moveFx,
          target: move.target.name,
          description
        })
      })
    }
  }

  getRegion(region: string) {
    let copyRegionPokemons = this.pokemonService.getPokemonRegion(region)
    this.regionPokemons = copyRegionPokemons
  }

  displayPokemon(id: string) {
    this.http.getPokemon(id).subscribe((data) => {
      let temp: any = []
      temp.push(data)
      for (let pokemon of temp) {
        const stats = getStats(pokemon.stats)
        const types = getTypes(pokemon.types)
        let moves = []
        for (const move of pokemon.moves) {
          let tempObj = {
            name: move.move.name
          }
          moves.push(tempObj)
        }
        let objPokemon = {
          id: pokemon.id,
          name: pokemon.name,
          types,
          stats,
          front_image: pokemon.sprites.front_default,
          back_image: pokemon.sprites.back_default,
          moves
        }
        this.toDisplayPokemon.push(objPokemon)
        this.pokemon = data
      }
    })
  }

  emptyDisplay() {
    this.toDisplayPokemon = []
  }

  chosenPokemon(id: string) {
    let isUnique;
    this.emptyDisplay()
    isUnique = this.myPokemons.filter(pokemon => pokemon.id == id)
    if (isUnique.length < 1 || isUnique == undefined) {
      this.myPokemons.push(this.pokemon)
        if (this.myPokemons.length == 6) {
          this.toStore()
        }
    }
    this.gotoTop()
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  removePokemon(id:any) {
    let copyMyPokemons = this.myPokemons.filter(pokemon => {
      return pokemon.id != id
    })
    this.myPokemons = copyMyPokemons
  }



  toStore() {
    let tempArr = []
    for (const myPokemon of this.myPokemons) {
      let tempDbMoves: MoveModel[] = []
      let temp4Moves: MoveModel[] = []
      for (const move of myPokemon.moves) {
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

      const maxHp = calculateHp(myPokemon.stats[0].base_stat)
      const stats = getStats(myPokemon.stats)

      let pokemon = {
        id: myPokemon.id,
        name: myPokemon.name,
        stats,
        types: getTypes(myPokemon.types),
        moves: temp4Moves,
        dbMoves: tempDbMoves,
        front_image: myPokemon.sprites.front_default,
        back_image: myPokemon.sprites.back_default,
        maxHp,
        currentHp: maxHp,
        others: {
          stats,
          condition: ''
        }
      }
      tempArr.push(pokemon)
      if (tempArr.length == 6) {
        this.pokemonSubmit.emit({ pokemon: tempArr, next:'player', dbMoves: this.dbMoves});
      }
    }
  }
}
