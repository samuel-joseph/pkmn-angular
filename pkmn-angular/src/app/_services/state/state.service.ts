import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { PokemonModel } from 'src/app/model/pokemon-model.model';
import { UserModel } from 'src/app/model/trainer-model.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private defaultUser: UserModel = {
    username: '',
    email: '',
    pokemons: [],
    victory: 0,
    chance: 0,
    password: ''
  };

  private state$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(this.defaultUser);

  constructor(private authService: AuthService) { }

  // Set state
  setState(newState: UserModel): void {
    this.state$.next(newState);
  }

  setPokemon(pokemons: PokemonModel[]): void {
    const currentState = this.state$.getValue();
    const updatedState: UserModel = {
      ...currentState, // Copy current state
      pokemons: [...pokemons] // Update pokemons array
    };
    this.setState(updatedState);
    this.authService.update(updatedState)
  }

  addVictory(): void {
    const currentState = this.state$.getValue();
    const updatedState: UserModel = {
      ...currentState, // Copy current state
      victory: currentState.victory+1 // Update pokemons array
    };
    this
    this.setState(updatedState);
    this.authService.update(updatedState)
  }

  // Get state
  getState(): Observable<UserModel> {
    return this.state$.asObservable();
  }

  isStateEmpty(): Observable<boolean> {
    return this.state$.pipe(
      map(state => {
        // Check if any property in state has a value
        return Object.values(state).every(value => value === null || value === '' || (Array.isArray(value) && value.length === 0));
      })
    );
  }

  // Other methods to get, add, update, and remove Pokemon from state can be implemented similarly
}