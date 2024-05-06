import {Component, OnInit} from '@angular/core';
import {RedeemCodes} from "../shared/interfaces/redeem-codes";
import {redeemCodeService} from "../shared/services/redeem-code.service";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";

@Component({
  selector: 'app-redeem-code-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SlicePipe
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
  constructor(private redeemCodeService: redeemCodeService) {}

  ngOnInit(): void {
    this.loadRedeemCodes();
  }

  refreshPage(): void {
    this.loadRedeemCodes();
  }

  loadRedeemCodes(): void {
    this.isLoading = true;
    this.redeemCodeService.loadAllRedeemCodes().subscribe(codes => {
      this.redeemCodes = codes;
        this.totalItems = codes.length;
      this.isLoading = false;
    }


    );
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.refreshPage();
  }

  validateCode(code: string | undefined): void {
    if (code != null) {
      this.isLoading = true;

      this.redeemCodeService.validateRedeemCode(code).subscribe(
        isValid => {
          alert(`Redeem code ${isValid ? 'is valid' : 'is invalid or already used'}`);
        }
      );
      this.isLoading = false;

    }
  }
  generateCode(): void {
    this.isLoading = true;

    this.redeemCodeService.generateRedeemCode();
    this.isLoading = false;
    this.loadRedeemCodes();
  }


  deleteCode(id: number | undefined): void {
    if (id) {
      this.isLoading = true;
      this.redeemCodeService.deleteRedeemCode(id);
      this.isLoading = false;
      this.loadRedeemCodes();
      this.refreshPage();
    }
  }


  protected readonly Math = Math;
}
