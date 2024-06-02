import { Component, ElementRef, ViewChild, inject } from '@angular/core';

import { AuthService } from '../_services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(){
    this.activeRoute.queryParamMap.subscribe((queries) => {
      const logout = Boolean(queries.get('logout'));
      if(logout){
        this.authService.logout();
        alert('You are now logged out. IsLogged = ' + this.authService.isLogged);
      }
    })
  }

  login(){
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error => {
        this.message = 'Invalid email or password.';
      }
    )
  }
}
