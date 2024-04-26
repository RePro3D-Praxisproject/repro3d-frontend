import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { User } from '../interfaces/user';
import { API_URL } from '../constants/apiurl.constant';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(email + ':' + password),
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${API_URL}/user`, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: { error: { message: any; }; status: any; message: any; }) {
    this.logout();
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('email') === null) {
      return false;
    }
    return true;
  }
}



