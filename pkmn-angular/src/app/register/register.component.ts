import { Component } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { Router } from '@angular/router';
import { StateService } from '../_services/state/state.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private stateService: StateService,
    private router: Router,
    private authService: AuthService) { }

    async onSubmit(): Promise<void> {
      const { username, email, password } = this.form;
    
      try {
        const data = await this.authService.register(username, email, password).toPromise();
        this.stateService.setState(data.user);
        await this.router.navigate(['/main']);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      } catch (err) {
        // Type guard to check if err is an instance of an object with the expected structure
        if (err instanceof Error && (err as any).error && typeof (err as any).error.message === 'string') {
          this.errorMessage = (err as any).error.message;
        } else {
          this.errorMessage = 'An unexpected error occurred';
        }
        this.isSignUpFailed = true;
      }
    }
}
