import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerComponent } from './player/player.component';
import { NewGameComponent } from './new-game/new-game.component';
import { OpenningComponent } from './pop-up/openning/openning.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guards/auth-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { PreBattleComponent } from './battle/pre-battle/pre-battle.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  // { path: 'player', title: 'profile', component: PlayerComponent },
  // {
  //   path: 'new-game',
  //   title: 'new-game',
  //   component: NewGameComponent,
  //   canActivate: [authGuard]
  // },
  // { path: '', title:'loading', component: OpenningComponent },
  { path: 'login', title: 'login', component: LoginComponent },
  { path: 'register', title: 'register', component: RegisterComponent },
  {
    path: 'main',
    title: 'main',
    component: MainComponent, 
    canActivate: [authGuard]
  },
  // { path: 'profile', title: 'profile', component: ProfileComponent },
  // { path: 'choose-moveset', title: 'choose-moveset', component: PlayerComponent },
  // { path: 'pre-battle', title: 'pre-battle', component: PreBattleComponent },
  // Add more routes as needed
  { path: '**', redirectTo: 'login' } // Redirect to home if route not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
