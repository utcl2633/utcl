import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(): Observable<boolean> | boolean {
    return this.authService.isLoggedIn().pipe(
      map((loggedIn:any) => {
        if (loggedIn) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
