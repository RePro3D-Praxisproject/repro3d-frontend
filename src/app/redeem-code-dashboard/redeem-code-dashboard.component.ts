import { Component } from '@angular/core';
import { CommonModule, NgClass, NgForOf, NgIf, SlicePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BillingService } from "../shared/services/billing.service";

/**
 * Component for managing and displaying redeem codes.
 * Allows generating, validating, invalidating, and deleting redeem codes.
 */
@Component({
  selector: 'app-redeem-code-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SlicePipe,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './redeem-code-dashboard.component.html',
  styleUrl: './redeem-code-dashboard.component.scss'
})
export class RedeemCodeDashboardComponent {

  /**
   * Constructs the RedeemCodeDashboardComponent.
   * 
   * @param {BillingService} billingService - The service to manage billing and redeem codes.
   */
  constructor(
    public billingService: BillingService,
  ) {
    billingService.loadAllRedeemCodes();
  }

  /**
   * Handles changes to the number of items displayed per page.
   * Resets the current page to 1 when the items per page is changed.
   * 
   * @param {number} newSize - The new number of items to display per page.
   */
  public onItemsPerPageChange(newSize: number): void {
    this.billingService.itemsPerPage = newSize;
    this.billingService.currentPage = 1;
  }
}
