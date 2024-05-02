import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { API_URL } from '../constants/apiurl.constant';
import {RedeemCodes, RedeemCodeResponse} from "../interfaces/redeem-codes";



@Injectable({
  providedIn: 'root',
})
export class redeemCodeService {
  constructor(private http: HttpClient) {}

  public redeemCodes: RedeemCodes[] = [
    {rc_id:123,rc_code:'xyz', used:false},
    {rc_id:123,rc_code:'xyz', used:false},

    {rc_id:123,rc_code:'xyz', used:true},
    {rc_id:123,rc_code:'xyz', used:true},
    {rc_id:123,rc_code:'xyz', used:true},
    {rc_id:123,rc_code:'xyz', used:true},
    {rc_id:123,rc_code:'xyz', used:false},
    {rc_id:123,rc_code:'xyz', used:false},
    {rc_id:123,rc_code:'xyz', used:false},
    {rc_id:123,rc_code:'xyz', used:false},
    {rc_id:123,rc_code:'xyz', used:false},
    {rc_id:123,rc_code:'xyz', used:false},
    {rc_id:123,rc_code:'xyz', used:false}




  ];


  public createRedeemCode(redeemCode: RedeemCodes): void{
    this.http.post(`${API_URL}/redeem-code`, redeemCode).subscribe(
      _ => {
        this.loadAllRedeemCodes();
      }
    );

  }


  loadAllRedeemCodes(): void {
    this.http.get<RedeemCodeResponse>(`${API_URL}/redeem-code`).subscribe(
      redeemCodes => {
        this.redeemCodes = redeemCodes.data;
        console.log(this.redeemCodes);

      }
    )
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

