import {Injectable} from '@angular/core';
import {catchError, map, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { API_URL } from '../constants/apiurl.constant';
import {RedeemCodes, RedeemCodeResponse} from "../interfaces/redeem-codes";



@Injectable({
  providedIn: 'root',
})
export class redeemCodeService {
  constructor(private http: HttpClient) {}

  public redeemCode: RedeemCodes[] = [
  ];


  public createRedeemCode(redeemCode: RedeemCodes): void{
    this.http.post(`${API_URL}/redeem-code`, redeemCode).subscribe(
      _ => {
        this.loadAllRedeemCodes();
      }
    );

  }

  loadAllRedeemCodes(): Observable<RedeemCodes[]> {
    return this.http.get<RedeemCodeResponse>(`${API_URL}/redeem-code`).pipe(
      map(response => response.data)
    );
  }

  public generateRedeemCode(): void {
    this.http.get<RedeemCodeResponse>(`${API_URL}/redeem-code/generate`).subscribe(
      response => {
        console.log('Generated Redeem Code:', response);
        this.loadAllRedeemCodes();  // Optionally refresh list
      }
    );
  }

  public validateRedeemCode(code: string): Observable<boolean> {
    const headers = new HttpHeaders().set('RC-Code', code);
    return this.http.get<RedeemCodeResponse>(`${API_URL}/redeem-code/validate`, { headers }).pipe(
      map(response => {
        return response.success === 'true';
      }),
      catchError(error => {
        console.error('Validation error:', error);
        return throwError(error);
      })
    );
  }


  public updateRedeemCode(redeemCode: RedeemCodes, id: number | undefined): void {
    this.http.put(`${API_URL}/redeem-code/${id}`,redeemCode).subscribe(
      _ =>{
        this.loadAllRedeemCodes();
      }

    )
  }

  public deleteRedeemCode( id: number | undefined): void {
    this.http.delete(`${API_URL}/redeem-code/${id}`).subscribe(
      _ =>{
        this.loadAllRedeemCodes();
      }
    )
  }


}

