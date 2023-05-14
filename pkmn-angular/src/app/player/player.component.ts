import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../_services/pokemon/pokemon.service';
import { PokemonModel } from '../model/pokemon-model.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{
  constructor(private http: PokemonService) { }
  myPokemon: PokemonModel


  ngOnInit(): void {
    console.log("HELLO")
    // this.http.getPokemon('658').subscribe(data => {


    //   this.myPokemon = {
    //     id: data.id,
    //     name: data.name,
    //     stats: [
    //       {
    //         base_stat: data.stats[0].base_stat,
    //         name: data.stats[0].name
    //       }
    //     ],
    //     types: {
    //       typeOne: data.types[0].name,
    //       typeTwo: data.typeTwo[1].name
    //     },
    //     moves:
    //     front_image: data.sprites.front_default,
    //     back_image: data.sprites.back_default
    //   }
    // })
    // console.log("CHECKING MY POKEMON ",this.myPokemon)
  }
}
