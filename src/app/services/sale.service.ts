import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from '../models/warehouse-models';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  sales: Sale | undefined;
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:7000/sales/';

  // Get list of all Sales
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  getSales() {
    return this.http.get(this.baseUrl).pipe(
      retry(2), // retry up to 3 times
      catchError(error => {
        console.log('Error loading Sale data:', error);
        return throwError(error);
      })
    );
  }
  // Get sale object by its ID
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  getSaleById(id: string) {
    return this.http.get(this.baseUrl + id).pipe(
      retry(2), // retry up to 3 times
      catchError(error => {
        console.log('Error loading Sale data by id:', error);
        return throwError(error);
      })
    );
  }
  // Add a sale 
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  addSale(sale: Sale) {
    return this.http.post(this.baseUrl, sale).pipe(
      retry(2), // retry up to 3 times
      catchError(error => {
        console.log('Error adding Sale data:', error);
        return throwError(error);
      })
    );
  }
  // Update an existing sale
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  updateSale(sale: Sale, id: any) {
    return this.http.patch(this.baseUrl + id, sale).pipe(
      retry(2), // retry up to 3 times
      catchError(error => {
        console.log('Error updating Sale data:', error);
        return throwError(error);
      })
    );
  }
  // Delete an existing sale
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  deleteSale(id: number) {
    return this.http.delete(this.baseUrl + id).pipe(
      retry(2), // retry up to 3 times
      catchError(error => {
        console.log('Error deleting Sale data:', error);
        return throwError(error);
      })
    );
  }
}
