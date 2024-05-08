import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { API_URL } from '../constants/apiurl.constant';
import {RedeemCodes, RedeemCodeResponse} from "../interfaces/redeem-codes";



@Injectable({
  providedIn: 'root',
})
export class redeemCodeService {
  constructor(private http: HttpClient) {}
  public redeemCodes: RedeemCodes[] = [];



  public createRedeemCode(redeemCode: RedeemCodes): void{
    this.http.post(`${API_URL}/redeem-code`, redeemCode).subscribe(
      _ => {
        this.loadAllRedeemCodes();
      }
    );

  }


  public getAllRedeemCodes(): RedeemCodes[]{
    return this.redeemCodes;
  }

  public loadAllRedeemCodes(): void {
    console.log('Calling API');
    this.http.get<RedeemCodeResponse>(`${API_URL}/redeem-code`).subscribe(
      redeemCodes => {
        this.redeemCodes= redeemCodes.data;
        console.log(this.redeemCodes)
      }
    )
  }

  public generateRedeemCode(): void {
    this.http.get<RedeemCodeResponse>(`${API_URL}/redeem-code/generate`).subscribe(
      response => {
        console.log('Generated Redeem Code:', response);
        this.loadAllRedeemCodes();
      },catchError(error => {
      console.error('generate error:', error);
      return throwError(error);
    })
    );
  }

  public validateRedeemCode(code: string ): Observable<RedeemCodeResponse> {
    let headers = new HttpHeaders().set('RC-Code', code);
    return this.http.get<RedeemCodeResponse>(`${API_URL}/redeem-code/validate`, { headers });
  }



  public updateRedeemCode(redeemCode: RedeemCodes, id: number | undefined): void {
    this.http.put(`${API_URL}/redeem-code/${id}`,redeemCode).subscribe(
      _ =>{
        this.loadAllRedeemCodes();
      },catchError(error => {
        console.error('update error:', error);
        return throwError(error);
      })

    )
  }

  public deleteRedeemCode( id: number | undefined): void {
    this.http.delete(`${API_URL}/redeem-code/${id}`).subscribe(
      _ =>{
        this.loadAllRedeemCodes();
      },catchError(error => {
        console.error('delete error:', error);
        return throwError(error);
      })
    )
  }


}

