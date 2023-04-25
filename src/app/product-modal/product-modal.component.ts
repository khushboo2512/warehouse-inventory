import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Product } from '../models/warehouse-models';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {
  product: any;
  action!: string;
  productForm!: FormGroup;
  productArticles: any;
  articleData: any;
  isCreate: any;
  updatedProduct = new EventEmitter<Product>();
  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) { }
  /**
    * Initializes the form group for creating or updating a product
    * If there are existing product articles, they are added to the form group
    */
  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      articles: this.fb.array([])
    });

    if (this.productArticles && this.productArticles.length > 0) {
      this.productForm.patchValue({ name: this.product.name });
      this.productArticles.forEach((article: any) => {
        const articleFormGroup = this.fb.group({
          id: [article.id, Validators.required],
          amountRequired: [article.amountRequired, Validators.required]
        });
        this.articlesFormArray.push(articleFormGroup);
      });
    }
  }
  /**
    * Returns the form array of product articles
    */
  get articlesFormArray() {
    return this.productForm.get('articles') as FormArray;
  }
  /**
    * Returns the name of an article given its ID
    *
    * @param {*} articleId - The ID of the article
    * @returns The name of the article or 'Unknown Article' if it is not found in articleData
    */
  getArticleName(articleId: any) {
    const article = this.articleData ? this.articleData.find((article: any) => article.id === articleId) : '';
    return article ? article.name : 'Unknown Article';
  }
  /**
    * Adds a new article form group to the articles form array
    *
    */
  addArticle() {
    const articleFormGroup = this.fb.group({
      id: ['', Validators.required],
      amountRequired: ['', Validators.required]
    });
    this.articlesFormArray.push(articleFormGroup);
  }
  /**
    * Deletes an article form group at a given index from the articles form array
    *
    * @param {number} index - The index of the article form group to delete
    */
  deleteArticle(index: number) {
    this.articlesFormArray.removeAt(index);
  }
  /**
    * Emits an event with the updated product form data when submit is clicked
    */
  submitForm() {
    this.isCreate = true;
    this.updatedProduct.emit(this.productForm.value);
  }
  /**
    * Closes the modal
    */
  cancel() {
    this.bsModalRef.hide();
  }
}
