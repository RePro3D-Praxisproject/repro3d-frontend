import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BillingService} from "../shared/services/billing.service";

@Component({
  selector: 'app-redeem-code-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SlicePipe,
    FormsModule
  ],
  templateUrl: './redeem-code-dashboard.component.html',
  styleUrl: './redeem-code-dashboard.component.scss'
})


export class RedeemCodeDashboardComponent {

  constructor(
    public billingService: BillingService,
  ) {
    billingService.loadAllRedeemCodes()
  }

  onItemsPerPageChange(newSize: number): void {
    this.billingService.itemsPerPage = newSize;
    this.billingService.currentPage = 1;
  }

}
