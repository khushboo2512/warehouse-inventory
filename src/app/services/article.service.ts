import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/warehouse-models';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  article: Article | undefined;
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:7000/articles/';

  // Get list of all articles
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  getArticles() {
    return this.http.get(this.baseUrl).pipe(
      retry(2), // retry up to 2 times
      catchError(error => {
        console.log('Error loading Articles data:', error);
        return throwError(error);
      })
    );
  }
  // Get an article object by its ID
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  getArticleById(id: string) {
    return this.http.get(this.baseUrl + id).pipe(
      retry(2), // retry up to 2 times
      catchError(error => {
        console.log('Error loading Article by id:', error);
        return throwError(error);
      })
    );
  }
  // Add an article 
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  addArticle(article: Article) {
    return this.http.post(this.baseUrl, article).pipe(
      retry(2), // retry up to 2 times
      catchError(error => {
        console.log('Error adding Article data:', error);
        return throwError(error);
      })
    );
  }
  // Update an existing article
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  updateArticle(article: Article, id: any) {
    return this.http.patch(this.baseUrl + id, article).pipe(
      retry(2), // retry up to 2 times
      catchError(error => {
        console.log('Error updating Article data:', error);
        return throwError(error);
      })
    );
  }
  // Update multiple articles at once
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  bulkUpdateArticle(articles: Article[]) {
    return this.http.patch(this.baseUrl, articles).pipe(
      retry(2), // retry up to 2 times
      catchError(error => {
        console.log('Error updating bulk Article data:', error);
        return throwError(error);
      })
    );
  }
  // Delete an existing article
  // As API is unreliable so retry mechanism is implemented to hit the API again if error is encountered
  deleteArticle(id: number) {
    return this.http.delete(this.baseUrl + id).pipe(
      retry(2), // retry up to 2 times
      catchError(error => {
        console.log('Error deleting Article data:', error);
        return throwError(error);
      })
    );;
  }
}
