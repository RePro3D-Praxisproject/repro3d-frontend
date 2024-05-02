import {Component, OnInit} from '@angular/core';
import {RedeemCodes} from "../shared/interfaces/redeem-codes";
import {redeemCodeService} from "../shared/services/redeem-code.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-redeem-code-dashboard',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './redeem-code-dashboard.component.html',
  styleUrl: './redeem-code-dashboard.component.scss'
})


export class RedeemCodeDashboardComponent implements OnInit {
  redeemCodes: RedeemCodes[] = [];

  constructor(private redeemCodeService: redeemCodeService) {}

  ngOnInit(): void {
    this.loadRedeemCodes();
  }

  loadRedeemCodes(): void {
    this.redeemCodeService.loadAllRedeemCodes();
    this.redeemCodes = this.redeemCodeService.redeemCodes;
  }

  editCode(code: RedeemCodes): void {
    console.log('Edit functionality to be implemented', code);
  }

  validateCode(code: string | undefined): void {
    if (code != null) {
      this.redeemCodeService.validateRedeemCode(code).subscribe(
        isValid => {
          alert(`Redeem code ${isValid ? 'is valid' : 'is invalid or already used'}`);
        }
      );
    }
  }
  generateCode(): void {
    this.redeemCodeService.generateRedeemCode();
  }


  deleteCode(id: number | undefined): void {
    if (id) {
      this.redeemCodeService.deleteRedeemCode(id);
    }
  }
}
