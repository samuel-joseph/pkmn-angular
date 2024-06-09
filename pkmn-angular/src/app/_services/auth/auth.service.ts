import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { PokemonModel } from "src/app/model/pokemon-model.model";

const AUTH_API = 'http://54.90.231.243:3000/api/auth/';
const USER_API = 'http://54.90.231.243:3000/api/user/';  
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  logout(): Observable<any> {
    localStorage.removeItem('token');
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  update(
    username: string,
    email: string,
    pokemons: PokemonModel[],
    victory: number,
    chance: number
  ): Observable<any> {
    const token = this.getToken()

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(
      USER_API,
      {
        username,
        email,
        password: 'password',
        pokemons,
      },
      {headers}
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  tokenExist(): boolean {
    return this.getToken()!==null
  }
}