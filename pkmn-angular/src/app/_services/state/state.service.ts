import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { PokemonModel } from 'src/app/model/pokemon-model.model';
import { UserModel } from 'src/app/model/trainer-model.model';
import { AuthService } from '../auth/auth.service';
import { MoveModel } from 'src/app/model/move-model.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private defaultUser: UserModel = {
    username: '',
    email: '',
    pokemons: [],
    victory: 0,
    perfectVictory: 0,
    lose: 0,
    totalGames: 0,
    password: ''
  };

  private state$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(this.defaultUser);

  constructor(private authService: AuthService) { }

  // Set state
  setState(newState: UserModel): void {
    this.state$.next(newState);
  }

  async setPokemon(pokemons: PokemonModel[]): Promise<void> {
    const currentState = this.state$.getValue();
    const updatedState: UserModel = {
      ...currentState, // Copy current state
      pokemons: [...pokemons] // Update pokemons array
    };
    await this.authService.update(updatedState).subscribe(response => {
      this.setState(updatedState);
      console.log(response)
    })
  }

  postBattle(returningPokemons: PokemonModel[], result: boolean, perfect: boolean): void {

    const currentState = this.state$.getValue();
    const updatedPokemons = [...currentState.pokemons, ...returningPokemons];
    const updatedState: UserModel = {
      ...currentState, // Copy current state
      pokemons: updatedPokemons,
      victory: result ? currentState.victory + 1 : currentState.victory,
      perfectVictory: perfect ? currentState.perfectVictory + 1 : currentState.perfectVictory,
      lose: result ? currentState.lose + 1 : currentState.lose,
      totalGames: currentState.victory + currentState.lose
    };

    this.authService.update(updatedState).subscribe(response => {
      this.setState(updatedState);
      console.log(response)
    })
  }

  newGame(endgame: boolean): void {
    const currentState = this.state$.getValue();

    if (endgame) {
      //to be stored in a db 'leaderboards'
      const champion = {
        username: currentState.username,
        pokemons: currentState.pokemons,
        date: Date.now(),
        totalGames: currentState.victory + currentState.lose,
        perfectVictory: currentState.perfectVictory
      } 
    }

    this.setState({
      username: currentState.username,
      email: currentState.email,
      pokemons: [],
      victory: 0,
      perfectVictory: 0,
      lose: 0,
      totalGames: 0
    })

    const newData = {
      username: currentState.username,
      email: currentState.email,
      pokemons: [],
      victory: 1,
      lose: 1,
      perfectVictory: 1,
      totalGames: 1
    }
    this.authService.update(newData).subscribe(response => {
      console.log('new game '+response)
    })
  }

  // Get state
  getState(): Observable<UserModel> {
    return this.state$.asObservable();
  }

  setMoveState(newMoves: MoveModel[]): void {
    const currentState = this.state$.getValue();
    const updatedState: UserModel = {
      ...currentState,
      moves: [...newMoves]
    };
    this.state$.next(updatedState);
  }

  getMoveState(): Observable<MoveModel[]> {
    return this.state$.pipe(
      map(state => state.moves?.slice() ?? []) 
    );
  }

  // Other methods to get, add, update, and remove Pokemon from state can be implemented similarly
}