import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './_services/auth-interceptor/auth-interceptor.service';

import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NewGameComponent } from './new-game/new-game.component';
import { Pokemon } from './helper/pokemon.class';
import { PlayerComponent } from './player/player.component';
import { PopUpComponent } from './pop-up/pop-up/pop-up.component';
import { BattleComponent } from './battle/battle/battle.component';
import { PreBattleComponent } from './battle/pre-battle/pre-battle.component';
import { OverviewComponent } from './pop-up/overview/overview.component';
import { VersusComponent } from './pop-up/versus/versus.component';
import { OpenningComponent } from './pop-up/openning/openning.component';
import { LoginComponent } from './login/login.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { StorageService } from './_services/storage/storage.service';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: OpenningComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Add more routes as needed
  { path: '**', redirectTo: '' } // Redirect to home if route not found
];

@NgModule({
  declarations: [
    AppComponent,
    NewGameComponent,
    PlayerComponent,
    PopUpComponent,
    BattleComponent,
    PreBattleComponent,
    OverviewComponent,
    VersusComponent,
    OpenningComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    Pokemon,
    StorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
