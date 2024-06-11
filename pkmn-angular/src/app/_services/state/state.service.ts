import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { PokemonModel } from 'src/app/model/pokemon-model.model';
import { UserModel } from 'src/app/model/trainer-model.model';

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

  constructor() {}

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
  }

  // Get state
  getState(): Observable<UserModel> {
    return this.state$.asObservable();
  }

  // Other methods to get, add, update, and remove Pokemon from state can be implemented similarly
}