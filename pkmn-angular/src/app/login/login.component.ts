import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { Router } from '@angular/router';
import { StateService } from '../_services/state/state.service';
import { UserModel } from '../model/trainer-model.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  gameLoading = true

  constructor(
    private authService: AuthService,
    private router: Router,
    private stateService: StateService
  ) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login({ email, password }).subscribe({
      next: data => {
        const user = data.user
        const userData: UserModel = {
          _id: user._id,
          username: user.username,
          password: user.password,
          pokemons: user.pokemons,
          email: user.email,
          victory: user.victory,
          lose: user.totalGames - user.victory,
          totalGames: user.totalGames,
          perfectVictory: user.perfectVictory
        }
        this.stateService.setState(userData);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/main'])
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}