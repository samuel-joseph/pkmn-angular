import { Component, OnInit } from '@angular/core';
import { StateService } from '../_services/state/state.service';
import { environment } from 'src/environments/environment';
import { PokemonModel } from '../model/pokemon-model.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ending',
  templateUrl: './ending.component.html',
  styleUrls: ['./ending.component.scss']
})
export class EndingComponent implements OnInit{
  showChampionPokemon = false
  gymLeaders = environment.gymLeaders
  myPokemons: PokemonModel[] = []
  highlightPokemon: PokemonModel[] = []
  totalGames: number
  perfectWins: number

  counter: number = 0
  constructor(
    private stateService: StateService,
    private router: Router
  ) { }
  
  ngOnInit(){
    this.championshipFn()
  }

  playAgain() {
    this.stateService.newGame(true)
    this.router.navigate(['/main'])
  }

  championshipFn() {
    setTimeout(() => {
      this.stateService.getState().subscribe(response => {
        this.myPokemons = response.pokemons
        this.totalGames = response.totalGames
        this.perfectWins = response.perfectVictory
        const myPokemons = response.pokemons
        this.highlightPokemon = []
        this.highlightPokemon.push(myPokemons[this.counter])
        if (this.counter < myPokemons.length - 1) {
          this.counter++
          this.championshipFn()
        } else {
          this.showChampionPokemon = true
        }
      })
    },10000)
  }
}
