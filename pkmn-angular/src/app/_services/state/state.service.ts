import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
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

  private readonly defaultUser: UserModel = {
    _id: '',
    username: '',
    email: '',
    pokemons: [],
    victory: 0,
    perfectVictory: 0,
    lose: 0,
    totalGames: 0,
    champion: false
  };

  private state$ = new BehaviorSubject<UserModel>(this.defaultUser);

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  // ========== Helpers ==========
  private resetStats(user: UserModel): UserModel {
    return {
      ...user,
      pokemons: [],
      victory: 0,
      perfectVictory: 0,
      lose: 0,
      totalGames: 0,
      champion: false
    };
  }

  private async updateUser(user: UserModel): Promise<UserModel> {
    try {
      const response = await this.authService.update(user);
      this.setState(user);
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // ========== State Management ==========
  setState(newState: UserModel): void {
    this.state$.next({ ...newState });
  }

  getState(): Observable<UserModel> {
    return this.state$.asObservable();
  }

  // ========== Pokemon Management ==========
  async setPokemon(pokemons: PokemonModel[]): Promise<UserModel> {
    const updated = this.resetStats({
      ...this.state$.getValue(),
      pokemons: [...pokemons]
    });
    return this.updateUser(updated);
  }

  // ========== Battle Handling ==========
  async postBattle(event: { outcome: 'win' | 'lose'; perfect?: boolean }): Promise<UserModel> {
    const win = event.outcome === 'win';
    const perfect = !!event.perfect;
    const currentState = this.state$.getValue();

    if (!currentState._id) return currentState;

    try {
      const freshUser = await firstValueFrom(this.authService.getUser(currentState._id));

      let updated: UserModel = { ...freshUser };

      if (win) {
        updated.victory++;
        if (perfect) updated.perfectVictory++;
      } else if (!win && updated.victory === 0) {
        await this.newGame(false);
        this.router.navigate(['/main']);
        return updated;
      } else {
        updated.lose++;
      }

      updated.totalGames++;

      return this.updateUser(updated);
    } catch (error) {
      console.error("Error posting battle:", error);
      throw error;
    }
  }

  async newGame(endgame: boolean): Promise<UserModel> {
    // Reset gym leaders
    environment.gymLeaders.forEach(leader => leader.gymLose = false);

    let current = this.state$.getValue();

    if (endgame) {
      // TODO: Save champion in leaderboard collection
      const champion = {
        username: current.username,
        pokemons: current.pokemons,
        date: Date.now(),
        totalGames: current.victory + current.lose,
        perfectVictory: current.perfectVictory
      };
      current = { ...current, champion: true };
      await this.updateUser(current);
    }

    const resetUser = this.resetStats(current);
    this.setState(resetUser);
    return resetUser;
  }

  // ========== Moves ==========
  setMoveState(newMoves: MoveModel[]): void {
    const updated: UserModel = {
      ...this.state$.getValue(),
      moves: [...newMoves]
    };
    this.setState(updated);
  }

  getMoveState(): Observable<MoveModel[]> {
    return this.state$.pipe(
      map(state => state.moves?.slice() ?? []) 
    );
  }
}
