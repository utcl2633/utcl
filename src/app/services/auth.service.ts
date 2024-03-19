import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  login(email: any, password: any): Observable<boolean> {
    const isValidCredentials = email === 'user@123.com' && password === 'Pass1234';
    if (isValidCredentials) {
      this.loggedIn.next(true);
      return this.loggedIn.asObservable();
    }
    return this.loggedIn.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
