import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { User } from '../interfaces/user';
import { API_URL } from '../constants/apiurl.constant';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  /**
   * Logs the user in with email and password.
   * @param email Emails of the user. Functions as a username.
   * @param password Password of the user.
   * @returns {Observable} Observable of the login result.
   */
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(email + ':' + password),
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${API_URL}/user/email/${email}`, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }
 
  /**
   * Generic error handling method.
   * @param error An error object.
   * @returns {void}
   */
  handleError(error: { error: { message: any; }; status: any; message: any; }) {
    if (this.isLoggedIn()) this.logout();
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

  /**
   * Logs the user out, deleting the locally stored email and password.
   */
  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }

  /**
   * Registers a user in the database.
   * @param user The user to register.
   * @returns An observable boolean indicating whether the user is registered successfully or not.
   */
  register(user: User): Observable<any> {
    return this.http.post<any>(`${API_URL}/user`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Checks if the user is logged in or not.
   * @returns {boolean}
   */
  isLoggedIn(): boolean {
    if (localStorage.getItem('email') === null) {
      return false;
    }
    return true;
  }

  getMyRole(): Role | undefined {
    if (localStorage.getItem('userdata')) {
      if (localStorage.getItem('userdata') !== null){
        return JSON.parse(localStorage.getItem('userdata')!).data.role;
      }
    }
    return undefined;
  }
}



