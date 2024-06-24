import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)
  const protectedRoutes: string[] = ["/main", "/end"]
  return protectedRoutes.includes(state.url) && !authService.tokenExist() 
    ? router.navigate(['/login'])
    : true
};
