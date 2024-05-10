import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/apiurl.constant';
import { Receipt, ReceiptResponse } from '../interfaces/receipt'; // Import your newly defined interfaces


@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  constructor(private http: HttpClient) {
  }

  getAllReceipts(): Observable<ReceiptResponse> {
    return this.http.get<ReceiptResponse>(`${API_URL}/receipt`);
  }

  getReceiptById(id: number): Observable<Receipt> {
    return this.http.get<Receipt>(`${API_URL}/receipt/${id}`);
  }


  /**
   * Updates a receipt by its ID.
   * @param id The ID of the receipt to update.
   * @param receiptDetails The updated details of the receipt.
   * @returns Observable of ApiResponse
   */
  updateReceipt(id: number, receiptDetails: Receipt) {
     this.http.put(`${API_URL}/receipt/${id}`, receiptDetails).subscribe(
       _ =>{
         this.getAllReceipts();
  });
  }

  /**
   * Deletes a receipt by its ID.
   * @param id The ID of the receipt to delete.
   * @returns Observable of ApiResponse
   */
  deleteReceipt(id: number): Observable<ReceiptResponse> {
    return this.http.delete<ReceiptResponse>(`${API_URL}/receipt/${id}`);
  }

}
