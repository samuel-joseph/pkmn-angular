import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';


const url = 'https://pokeapi.co/api/v2';
const monster = '/pokemon/'
const move = '/move/'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemon(id: string){
    return this.http.get(`${url}${monster}${id}`)
  }

  getPokemonMove(id: string): Observable<any>{
    return this.http.get(`${url}${move}${id}`)
  }
}
