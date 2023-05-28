import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { PokemonModel, StatsModel } from 'src/app/model/pokemon-model.model';
import { MoveModel } from 'src/app/model/move-model.model';
import { getStats,getTypes, getMove } from 'src/app/helper/pokemon-helper';

const url = 'https://pokeapi.co/api/v2';
const monster = '/pokemon/'
const move = '/move/'
const kanto = 151

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemon(id: string){
    return this.http.get(`${url}${monster}${id}`)
    //   .pipe(map((res) => {
    //     console.log(res.moves)
    //     const pokemon = {
    //       id: res.id,
    //       name: res.name,
    //       stats: getStats(res.stats),
    //       types: getTypes(res.types),
    //       // moves: getMove(res.moves), 
    //       // front_image: res.sprites.front_default,
    //       // back_image: res.sprites.front_default
    //     }
    //     console.log("CHECKING ", pokemon)
    //     return pokemon
    //   }))
    //   .subscribe((res) => {
    //     console.log(res)
    //     return res
    // })
  }

  getPokemonMove(id: string): Observable<any>{
    return this.http.get(`${url}${move}${id}`)
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
