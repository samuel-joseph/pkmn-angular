import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { UserModel } from 'src/app/model/trainer-model.model';
import { PokemonModel } from 'src/app/model/pokemon-model.model';
import { environment } from 'src/environments/environment';


const url = 'https://pokeapi.co/api/v2';
const monster = '/pokemon/'
const move = '/move/'

export interface Item {
  _id?: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Trainer {
  username: string,
  email: string,
  pokemons: PokemonModel,
  password: string
}


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http: HttpClient) { }
  USER_API = environment.USER_API

  getPokemon(id: string){
    return this.http.get(`${url}${monster}${id}`)
  }

  getPokemonMove(id: string): Observable<any>{
    return this.http.get(`${url}${move}${id}`)
  }

  //trainer
  getTrainer(_id:string): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.USER_API+_id)
  }
}
