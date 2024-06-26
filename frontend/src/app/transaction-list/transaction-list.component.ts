import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: any[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    const startDate = new Date('2020-01-01').getTime();
    const endDate = new Date('2020-12-31').getTime();
    this.transactionService.getTransactions(startDate, endDate).subscribe(data => {
      this.transactions = data;
    });
  }
}
