import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerComponent } from './player/player.component';
import { NewGameComponent } from './new-game/new-game.component';

const routes: Routes = [
  { path: 'player', component: PlayerComponent },
  { path: 'new-game', component: NewGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
