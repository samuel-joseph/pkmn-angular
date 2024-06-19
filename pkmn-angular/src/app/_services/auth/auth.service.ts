import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { PokemonModel } from "src/app/model/pokemon-model.model";
import { environment } from "src/environments/environment";

const AUTH_API = environment.AUTH_API;
const USER_API = environment.USER_API;  

export interface data {
  username: string,
  email: string,
  pokemons: PokemonModel[],
  password?: string,
  victory: number,
  lose: number,
  perfectVictory: number,
  totalGames: number
}


@Injectable({
  providedIn: 'root',
})
export class AuthService{
  isLogged: Boolean = false;
  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${AUTH_API}login`, credentials)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
        })
      )
  }

  helloWorld(): Observable<any>{
    return this.http.get(`https://pkmn-expressjs-a25e779e0e2a.herokuapp.com/`)
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    return this.http.post(AUTH_API + 'signout', { });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        username,
        email,
        password,
      }
    );
  }

  update(data: data): Observable<any> {
    // Define the headers, including the Authorization header with the token
    // Make the HTTP PUT request
    return this.http.put<any>(USER_API, data);
  }
  

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  tokenExist(): boolean {
    return this.getToken()!==null
  }
}