import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerModule } from './player/player.module';
import { HttpClientModule } from '@angular/common/http';
import { NewGameComponent } from './new-game/new-game.component';
import { Pokemon } from './helper/pokemon.class';

@NgModule({
  declarations: [
    AppComponent,
    NewGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PlayerModule,
    HttpClientModule,
  ],
  providers: [Pokemon],
  bootstrap: [AppComponent]
})
export class AppModule { }
