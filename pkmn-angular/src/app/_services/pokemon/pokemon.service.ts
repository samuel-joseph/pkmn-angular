import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon/';
const kanto = 151

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemon(id: string): Observable<any>{
    return this.http.get(`${POKEMON_API}${id}`)
  }

  getPokemonMove(MOVE_API: string): Observable<any>{
    return this.http.get(`${MOVE_API}`)
  }
}
