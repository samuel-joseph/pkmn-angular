import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { UserModel } from 'src/app/model/trainer-model.model';
import { PokemonModel } from 'src/app/model/pokemon-model.model';
import { MoveModel } from 'src/app/model/move-model.model';


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
  private mainUrl = 'http://localhost:3000/api'
  private apiUrl = 'http://localhost:3000/api/user';
  private apiTrainerUrl = '/trainer'
  constructor(private http: HttpClient) { }

  getPokemon(id: string){
    return this.http.get(`${url}${monster}${id}`)
  }

  getPokemonMove(id: string): Observable<any>{
    return this.http.get(`${url}${move}${id}`)
  }

  //trainer
  getTrainer(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.mainUrl+this.apiTrainerUrl)
  }


  //coming from mongodb
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  addUser(pokemon: PokemonModel[]): Observable<Trainer> {
    let trainer = {
      username: 'test',
      email: 'test@gmail.com',
      pokemons: pokemon,
      password: '123456'
    }
    return this.http.post<Trainer>(this.apiUrl, trainer);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${item._id}`, item);
  }

  deleteItem(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
