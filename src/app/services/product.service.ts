import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/warehouse-models';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product | undefined;
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:7000/products/';

  // Get list of all products
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  getProducts() {
    return this.http.get(this.baseUrl).pipe(
      retry(2), // retry up to 3 times
      catchError(error => {
        console.log('Error loading Product data:', error);
        return throwError(error);
      })
    );
  }
  // Get product object by its ID
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  getProductById(id: string) {
    return this.http.get(this.baseUrl + id).pipe(
      retry(2), // retry up to 3 times
      catchError(error => {
        console.log('Error loading Product data by id:', error);
        return throwError(error);
      })
    );
  }
  // Add a product
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  addProduct(product: Product) {
    return this.http.post(this.baseUrl, product).pipe(
      retry(2), // retry up to 3 times
      catchError(error => {
        console.log('Error adding Product data:', error);
        return throwError(error);
      })
    );
  }
  // Update an existing product
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  updateProduct(product: Product, id: any) {
    return this.http.patch(this.baseUrl + id, product).pipe(
      retry(2), // retry up to 3 times
      catchError(error => {
        console.log('Error updating Product data:', error);
        return throwError(error);
      })
    );
  }
  // Delete an existing product
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + id).pipe(
      retry(2), // retry up to 3 times
      catchError(error => {
        console.log('Error deleting Product data:', error);
        return throwError(error);
      })
    );
  }
}
