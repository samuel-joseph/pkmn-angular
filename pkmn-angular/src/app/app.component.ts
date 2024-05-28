import { Component, OnInit } from '@angular/core';
import { PokemonService, Item } from './_services/pokemon/pokemon.service';

import { PokemonModel } from './model/pokemon-model.model';
import { MoveModel } from './model/move-model.model';
import { environment } from 'src/environment/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'pkmn-angular';
  myPokemon: PokemonModel[] = []
  dbMove: MoveModel[] = []
  page: string
  gymLeaders: any[] = []
  pokemonObj = {}

  //to be deleted
  // items: Item[] = [];
  // newItem: Item = { name: '', quantity: 0, price: 0 };

  constructor(private http: PokemonService) {}

  public transition(child: any): void {
    switch (child.next) {
      case "player":
        this.myPokemon.push(...child.pokemon)
        this.dbMove.push(...child.dbMoves)
        break
      case "pre-batlle":
        this.myPokemon.push(...child.pokemon)
        break
    }
    this.page = child.next
    this.pokemonObj = {
      pokemon: this.myPokemon,
      gymLeaders: this.gymLeaders,
      dbMove: this.dbMove
    }
  }
  
  ngOnInit(): void {
    // this.http.getItems().subscribe(items => {
    //   this.items = items;
    // });
    if (this.myPokemon.length < 1) {
      this.page = 'newGame'
    }
    this.gymLeaders = environment.gymLeaders
  }

  // addItem(): void {
  //   this.http.addItem(this.newItem).subscribe(item => {
  //     this.items.push(item);
  //     this.newItem = { name: '', quantity: 0, price: 0 };  // Clear the form
  //   });
  // }

  // updateItem(item: Item): void {
  //   this.http.updateItem(item).subscribe(updatedItem => {
  //     const index = this.items.findIndex(i => i._id === updatedItem._id);
  //     if (index !== -1) {
  //       this.items[index] = updatedItem;
  //     }
  //   });
  // }

  // deleteItem(id: string): void {
  //   this.http.deleteItem(id).subscribe(response => {
  //     this.items = this.items.filter(item => item._id !== id);
  //   });
  // }
}
