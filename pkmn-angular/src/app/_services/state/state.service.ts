import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { PokemonModel } from 'src/app/model/pokemon-model.model';
import { UserModel } from 'src/app/model/trainer-model.model';
import { AuthService } from '../auth/auth.service';
import { MoveModel } from 'src/app/model/move-model.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private defaultUser: UserModel = {
    _id: '',
    username: '',
    email: '',
    pokemons: [],
    victory: 0,
    perfectVictory: 0,
    lose: 0,
    totalGames: 0
  };

  private state$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(this.defaultUser);

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  // Set state
  setState(newState: UserModel): void {
    this.state$.next(newState);
  }

  async setPokemon(pokemons: PokemonModel[]): Promise<void> {
    const currentState = this.state$.getValue();
    const updatedState: UserModel = {
      ...currentState,
      pokemons: [...pokemons],
      victory: 0,
      perfectVictory: 0,
      lose: 0,
      totalGames: 0
    };
    try {
      const response = await this.authService.update(updatedState);
      this.setState(updatedState);
    } catch (error) {
      console.error('Error updating state:', error);
    }
  }

  async postBattle(event: any): Promise<void> {
    const win: boolean = event.outcome === 'win'
    const perfect: boolean = event.perfect
   try {
     const currentState = this.state$.getValue();
     if(currentState._id)
      this.authService.getUser(currentState._id).subscribe(async data => {
        if (win) {
          currentState.victory = currentState.victory + 1
          currentState.perfectVictory = perfect ? currentState.perfectVictory + 1 : currentState.perfectVictory
        }
        else if (!win && currentState.victory == 0) {
          this.newGame(false)
          this.router.navigate(['/main'])
        }
        else {
          currentState.lose = currentState.lose + 1
        }

        currentState.totalGames = currentState.totalGames + 1
        // const response = await this.authService.update(currentState);
        this.setState(currentState)
        const response = await this.authService.update(currentState);
        console.log(response)
      })
    } catch (e) {
      console.error("Error updating ",e)
    }
  }

  // async postBattle(event: any): Promise<void> {
  //   try {
  //     const currentState = this.state$.getValue();
  //     if (event.outcome == "lose") {
  //       if(currentState._id){
  //         this.loseScenario(currentState._id)
  //       }
  //     }
  //     const updatedState: UserModel = {
  //       ...currentState, // Copy current state
  //       victory: event.outcome === "win" ?
  //         currentState.victory + 1
  //         : currentState.victory,
  //       perfectVictory: event.perfect ?
  //         currentState.perfectVictory + 1
  //         : currentState.perfectVictory,
  //       lose: event.outcome === "lose" ? currentState.lose + 1 : currentState.lose,
  //       totalGames: currentState.victory + 1 + currentState.lose
  //     };
  
  //     const response = await this.authService.update(updatedState);
  //     this.setState(updatedState);
  //     console.log(response);
  //   } catch (error) {
  //     console.error('Error updating state:', error);
  //   }
  // }

  async newGame(endgame: boolean): Promise<void> {
    for (let gymLeader of environment.gymLeaders) {
      gymLeader.gymLose = false
    }
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
      _id: currentState._id,
      username: currentState.username,
      email: currentState.email,
      pokemons: [],
      victory: 0,
      perfectVictory: 0,
      lose: 0,
      totalGames: 0
    })

    // const newData = {
    //   username: currentState.username,
    //   email: currentState.email,
    //   pokemons: [],
    //   victory: 1,
    //   lose: 1,
    //   perfectVictory: 1,
    //   totalGames: 1
    // }
    // try {
    //   const response = await this.authService.update(newData)
    //   console.log(response)
    // } catch (e) {
    //   console.error('Error updating status: ',e)
    // }
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