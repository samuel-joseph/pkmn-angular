import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the map operator
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

  // Get state
  getState(): Observable<UserModel> {
    return this.state$.asObservable();
  }

  // // Get Pokemon by ID
  // getPokemonById(id: number): Observable<PokemonModel | undefined> {
  //   return this.state$.asObservable().pipe(
  //     map(pokemonArray => pokemonArray.find(pokemon => pokemon.id === id))
  //   );
  // }

  // // Add a new Pokemon to state
  // addPokemon(pokemon: PokemonModel): void {
  //   const currentState = this.state$.getValue();
  //   currentState.push(pokemon);
  //   this.state$.next(currentState);
  // }

  // // Update an existing Pokemon in state
  // updatePokemon(updatedPokemon: PokemonModel): void {
  //   const currentState = this.state$.getValue();
  //   const index = currentState.findIndex(pokemon => pokemon.id === updatedPokemon.id);
  //   if (index !== -1) {
  //     currentState[index] = updatedPokemon;
  //     this.state$.next(currentState);
  //   }
  // }

  // // Remove a Pokemon from state
  // removePokemon(id: number): void {
  //   const currentState = this.state$.getValue();
  //   const filteredState = currentState.filter(pokemon => pokemon.id !== id);
  //   this.state$.next(filteredState);
  // }
}
