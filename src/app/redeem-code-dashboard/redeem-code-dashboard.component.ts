import {Component, OnInit} from '@angular/core';
import {RedeemCodes} from "../shared/interfaces/redeem-codes";
import {redeemCodeService} from "../shared/services/redeem-code.service";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

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


export class RedeemCodeDashboardComponent implements OnInit {
  redeemCodes: RedeemCodes[] = [];
  isLoading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  isModalOpen: boolean = false;
  totalPages: number = 0;
  validationMessage: string = '';
  isValid: boolean = false;
  constructor(protected redeemCodeService: redeemCodeService) {}

  ngOnInit(): void {
    this.redeemCodeService.loadAllRedeemCodes();
    this.updateRedeemCodes();
  }

  updateRedeemCodes(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.redeemCodes = this.redeemCodeService.getAllRedeemCodes();
      this.totalItems = this.redeemCodes.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.isLoading = false;
    }, 1000);
  }


  toggleModal(open: boolean): void {
    this.isModalOpen = open;
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

  validateCode(code: string | undefined): void {
    if (!code) {
      this.validationMessage = 'No code provided.';
      this.toggleModal(true);
      return;
    }
    this.isLoading = true;

    this.redeemCodeService.validateRedeemCode(code).subscribe({
      next: (response) => {
        this.isValid = response.success === "true";
        this.validationMessage = this.isValid ? 'Redeem code is active.' : response.message;
        this.isLoading = false;
        this.toggleModal(true);
      },
      error: (error) => {
        this.validationMessage = 'Error validating code: ' + error.message;
        this.isLoading = false;
        this.toggleModal(true);
      }
    });
  }
  generateCode(): void {
    this.isLoading = true;

    this.redeemCodeService.generateRedeemCode();
    this.isLoading = false;
    this.redeemCodeService.getAllRedeemCodes();
  }

  createCode(redeemCode: RedeemCodes){
    this.redeemCodeService.createRedeemCode(redeemCode)
    this.toggleModal(false);
}

  deleteCode(id: number | undefined): void {
    if (id) {
      this.isLoading = true;
      this.redeemCodeService.deleteRedeemCode(id);
      this.isLoading = false;
      this.redeemCodeService.getAllRedeemCodes();
    }
  }

  protected readonly Math = Math;

}
