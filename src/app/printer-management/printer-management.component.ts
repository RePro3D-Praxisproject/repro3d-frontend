import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-printer-management',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './printer-management.component.html',
  styleUrl: './printer-management.component.scss'
})
export class PrinterManagementComponent {
  isModalOpen: boolean = false;

  toggleModal(open: boolean): void {
    this.isModalOpen = open;
  }

}
