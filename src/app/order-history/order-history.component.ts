import {Component, OnInit} from '@angular/core';
import {OrderService} from "../shared/services/order.service";
import {Receipt} from "../shared/interfaces/receipt";
import {ReceiptService} from "../shared/services/receipt.service";

class Order {
}

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit{

  receipts: Receipt[] = [];

  orders: Order[] = [];
  private isModalOpen: boolean = false;
  ngOnInit(): void {
    this.loadReceipts();
  }

  constructor(private receiptService: ReceiptService) {}

  private loadReceipts() {
    this.receiptService.getAllReceipts().subscribe({
      next: (response) => {
        if (response.success) {
          this.receipts = response.data;
        } else {
          console.error('Failed to load receipts:', response.message);
        }
      },
      error: (err) => console.error('Error fetching receipts:', err)
    });
  }

  updateReceipt(id: number, receiptDetails: Receipt): void {
    this.receiptService.updateReceipt(id, receiptDetails);
    this.toggleModal(false)
  }
  deleteReceipt(id: number): void {
    this.receiptService.deleteReceipt(id).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Receipt deleted successfully:', response.message);
        } else {
          console.error('Failed to delete receipt:', response.message);
        }
      },
      error: (err) => console.error('Error deleting receipt:', err)
    });
  }


  private toggleModal(open: boolean) {
    this.isModalOpen = open;
  }
}
