import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
  transaction: any;
  comments: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.transactionService.getTransactionById(id).subscribe(data => {
      this.transaction = data;
      this.comments = this.transaction.comments;
    });
  }

  save(): void {
    this.transaction.comments = this.comments;
    this.transactionService.updateTransaction(this.transaction).subscribe(() => {
      this.router.navigate(['/transactions']);
    });
  }
}
