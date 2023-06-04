import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatDialogModule } from '@angular/material/dialog'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NewGameComponent } from './new-game/new-game.component';
import { Pokemon } from './helper/pokemon.class';
import { PlayerComponent } from './player/player.component';
import { PopUpComponent } from './pop-up/pop-up/pop-up.component';
import { BattleComponent } from './battle/battle/battle.component';
import { PreBattleComponent } from './battle/pre-battle/pre-battle.component';

@NgModule({
  declarations: [
    AppComponent,
    NewGameComponent,
    PlayerComponent,
    PopUpComponent,
    BattleComponent,
    PreBattleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [Pokemon],
  bootstrap: [AppComponent]
})
export class AppModule { }
