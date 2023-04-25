import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '../models/warehouse-models';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss']
})
export class ArticleModalComponent implements OnInit {

  updateArticleForm!: FormGroup;
  action!: string;
  article!: Article;
  isCreate: any;
  updatedArticle = new EventEmitter<Article>();
  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) { }
  /**
     * Initializes and creates the article form group based on the 
     * action passed as input. If the action is 'Create', an empty form group is created.
     * If the action is 'Edit', the form group is initialized with the values of the 
     * article passed as input.
     * 
     * @input action - a string that indicates whether the form should be initialized for
     * creating or editing an article
     * @input article - an Article object that contains the data to be pre-filled in the form
     */
  ngOnInit() {
    if (this.action == 'Create') {
      this.updateArticleForm = this.fb.group({
        name: ['', Validators.required],
        amountInStock: ['', [Validators.required, Validators.min(1)]]
      });
    } else {
      this.updateArticleForm = this.fb.group({
        name: [this.article.name, Validators.required],
        amountInStock: [this.article.amountInStock, [Validators.required, Validators.min(1)]]
      });
    }
  }
  /**
     * Emits an event containing the data entered in the form when the submit button is clicked.
     * 
     * @output updatedArticle - an event that contains the data entered in the form
     */
  submitForm() {
    this.isCreate = true;
    this.updatedArticle.emit(this.updateArticleForm.value);
  }
  /**
   * Closes the modal when the cancel button is clicked.
   */
  cancel() {
    this.bsModalRef.hide();
  }
}
