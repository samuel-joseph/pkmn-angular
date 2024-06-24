import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/_services/state/state.service';
import { PokemonModel } from 'src/app/model/pokemon-model.model';
import { AuthService } from '../_services/auth/auth.service';
import { UserModel } from '../model/trainer-model.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string
  email: string
  pokemons: PokemonModel[] | []
  victory: number
  chance: number
  password: string

  state$: Observable<UserModel>
  pokemons$: Observable<PokemonModel[]>


  constructor(private stateService: StateService, private authService: AuthService) { }

  ngOnInit(): void {
    this.state$ = this.stateService.getState()
    this.pokemons$ = this.stateService.getState().pipe(map(state => state.pokemons));
  }

  updateDb() {
    // Retrieve the latest state data
    this.stateService.getState().subscribe(state => {
      // Extract necessary data from the state
      const data = {
        username: state.username,
        email: state.email,
        pokemons: state.pokemons,
        victory: state.victory,
        perfectVictory: state.perfectVictory,
        lose: state.lose,
        totalGames: state.totalGames,
      };
  
      // Call the authService update method with the extracted data
      // this.authService.update(data)
      //   .subscribe(response => {
      //     console.log(response);
      //   });
    });
  }
}
