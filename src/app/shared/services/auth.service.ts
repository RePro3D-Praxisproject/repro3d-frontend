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
   * @param email Email of the user. Functions as a username.
   * @param password Password of the user.
   * @returns {Observable<any>} Observable of the login result.
   */
  public login(email: string, password: string): Observable<any> {
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
   * @returns {Observable<never>}
   */
  private handleError(error: { error: { message: any; }; status: any; message: any; }): Observable<never> {
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
  public logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }

  /**
   * Registers a user in the database.
   * @param user The user to register.
   * @returns {Observable<any>} Observable indicating whether the user is registered successfully or not.
   */
  public register(user: User): Observable<any> {
    return this.http.post<any>(`${API_URL}/user`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Checks if the user is logged in or not.
   * @returns {boolean} True if the user is logged in, false otherwise.
   */
  public isLoggedIn(): boolean {
    return localStorage.getItem('email') !== null;
  }

  /**
   * Gets the role of the currently logged-in user.
   * @returns {Role | undefined} The role of the currently logged-in user, or undefined if no user is logged in.
   */
  public getMyRole(): Role | undefined {
    const userData = localStorage.getItem('userdata');
    if (userData) {
      return JSON.parse(userData).data.role;
    }
    return undefined;
  }
}
