import { Component, OnInit } from '@angular/core';
import { PokemonService } from './_services/pokemon/pokemon.service';

import { PokemonModel } from './model/pokemon-model.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'pkmn-angular';
  constructor(private http: PokemonService) { }
  myPokemon: PokemonModel


  ngOnInit(): void {
    
    this.http.getPokemon('658').subscribe(data => {

      let tempMove: any[] = []
      let tempArr = []

      // move to a helper class
      for (const moveIndex of data.moves) {
        this.http.getPokemonMove(`${moveIndex.move.url}`).subscribe(move => {
          let tempObj = {
            id: move.id,
            name: move.name,
            power: move.power,
            pp: move.pp,
            type: move.type.name,
            accuracy: move.accuracy,
            damageClass: move.damage_class.name
          }
          if(tempObj.power){
            tempMove.push(tempObj)
          }
         })
      }

      //move to a helper class
      for (let i = 0; i < 6; i++){
        let tempObj = {
          base_stat: data.stats[i].base_stat,
          name: data.stats[i].stat.name
        }
        tempArr.push(tempObj)
      }
      //move to a helper class
      var temp = {
        id: data.id,
        name: data.name,
        stats: tempArr,
        types: {
          typeOne: data.types[0].type.name,
          typeTwo: data.types[1].type.name
        },
        moves: tempMove,
        front_image: data.sprites.front_default,
        back_image: data.sprites.back_default
      }
      this.myPokemon = temp
      console.log(temp)
    })
    console.log("CHECKING MY POKEMON ",this.myPokemon)
  }
}
