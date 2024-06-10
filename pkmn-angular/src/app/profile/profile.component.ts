import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/_services/state/state.service';
import { PokemonModel } from 'src/app/model/pokemon-model.model';
import { AuthService } from '../_services/auth/auth.service';

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


  constructor(private stateService: StateService, private authService: AuthService) { }

  ngOnInit(): void {
    this.stateService.getState().subscribe(response => {
      this.username = response.username
      this.email = response.email
      this.pokemons = response.pokemons
      this.victory = response.victory
      this.chance = response.chance
    })
  }

  updateDb() {
    console.log("AM I CALLED HERE")
    const data = {
      username: 'aws07',
      email: 'aws',
      pokemons: this.pokemons,
      password: 'password',
    }
    const token = this.authService.getToken()
    this.authService.update(data)
      .subscribe(response => {
        console.log(response)
      })
  }
}
