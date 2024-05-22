import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RedeemCode, RedeemCodeResponse } from "../interfaces/redeem-codes";
import { API_URL } from "../constants/apiurl.constant";

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  /** Array to hold the redeem codes. */
  public redeemCodes: RedeemCode[] = [];

  /** Number of items to display per page for pagination. */
  public itemsPerPage: number = 10;

  /** Current page for pagination. */
  public currentPage: number = 1;

  /** Total number of items for pagination. */
  public totalItems: number = 0;

  /**
   * Constructs the BillingService.
   * 
   * @param {HttpClient} http - The HTTP client for making requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Loads all redeem codes from the API.
   */
  public loadAllRedeemCodes(): void {
    this.http.get<RedeemCodeResponse>(`${API_URL}/redeem-code`).subscribe(
      res => {
        this.redeemCodes = res.data.reverse();
        this.totalItems = this.redeemCodes.length;
      }
    );
  }

  /**
   * Toggles the validation status of a redeem code.
   * 
   * @param {RedeemCode} redeemCode - The redeem code to toggle.
   */
  public toggleValidation(redeemCode: RedeemCode): void {
    redeemCode.used = !redeemCode.used;
    this.http.put(`${API_URL}/redeem-code/${redeemCode.rc_id}`, redeemCode).subscribe(
      res => {
        this.loadAllRedeemCodes();
      }
    );
  }

  /**
   * Deletes a redeem code.
   * 
   * @param {RedeemCode} redeemCode - The redeem code to delete.
   */
  public deleteRedeemCode(redeemCode: RedeemCode): void {
    this.http.delete(`${API_URL}/redeem-code/${redeemCode.rc_id}`).subscribe(
      _ => {
        this.loadAllRedeemCodes();
      }
    );
  }

  /**
   * Generates a new redeem code.
   */
  public generateRedeemCode(): void {
    this.http.get(`${API_URL}/redeem-code/generate`).subscribe(
      _ => {
        this.loadAllRedeemCodes();
      }
    );
  }
}
