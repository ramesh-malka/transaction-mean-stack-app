import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:5000/api/transactions';

  constructor(private http: HttpClient) { }

  getTransactions(startDate: number, endDate: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?startDate=${startDate}&endDate=${endDate}`);
  }

  getTransactionById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateTransaction(transaction: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${transaction.id}`, transaction);
  }
}
