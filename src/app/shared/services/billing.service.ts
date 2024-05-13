import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RedeemCode, RedeemCodeResponse} from "../interfaces/redeem-codes";
import {API_URL} from "../constants/apiurl.constant";

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  public redeemCodes: RedeemCode[] = [];
  public itemsPerPage: number = 10;
  public currentPage: number = 1;
  public totalItems: number = 0;

  constructor(private http: HttpClient) { }

  public loadAllRedeemCodes(): void {
    this.http.get<RedeemCodeResponse>(`${API_URL}/redeem-code`).subscribe(
      res => {
        this.redeemCodes = res.data.reverse();
        this.totalItems = this.redeemCodes.length;
      }
    )
  }

  public toggleValidation(redeemCode: RedeemCode): void {
    redeemCode.used = !redeemCode.used;
    this.http.put(`${API_URL}/redeem-code/${redeemCode.rc_id}`, redeemCode).subscribe(
      res =>{
        this.loadAllRedeemCodes();
      }
    );
  }

  public deleteRedeemCode(redeemCode: RedeemCode): void {
    this.http.delete(`${API_URL}/redeem-code/${redeemCode.rc_id}`).subscribe(
      _ =>{
        this.loadAllRedeemCodes();
      })
  }

  public generateRedeemCode(): void {
    this.http.get(`${API_URL}/redeem-code/generate`).subscribe(
      _ => {
        this.loadAllRedeemCodes();
      }
    )
  }

}
