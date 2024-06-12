import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, catchError, tap, throwError } from "rxjs";
import { PokemonModel } from "src/app/model/pokemon-model.model";
import { jwtDecode } from "jwt-decode";

const AUTH_API = 'http://54.90.231.243:3000/api/auth/';
const USER_API = 'http://54.90.231.243:3000/api/user/';  
const token = localStorage.getItem('token')

export interface data {
  username: string,
  email: string,
  pokemons: PokemonModel[],
  password: string
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

  isTokenExpired() {
    let token = this.getToken()

    if (token === null) {
      token = ''
    }

    const decodedToken = jwtDecode(token); // Decoding the token
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

        // Check if decodedToken or decodedToken.exp is undefined
        if (!decodedToken || typeof decodedToken.exp === 'undefined') {
          // Token is malformed or doesn't contain exp property
          return true; // Consider it expired to be safe
      }
  
      // Check if the token expiration time (exp) is less than the current time
      return decodedToken.exp < currentTime;
  }
}