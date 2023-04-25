import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Article } from '../models/warehouse-models';

import { ArticleModalComponent } from './article-modal.component';

describe('ArticleModalComponent', () => {
  let component: ArticleModalComponent;
  let fixture: ComponentFixture<ArticleModalComponent>;
  let bsModalRefSpy: jasmine.SpyObj<BsModalRef>;

  beforeEach(async () => {
    bsModalRefSpy = jasmine.createSpyObj<BsModalRef>('BsModalRef', ['hide']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ArticleModalComponent],
      providers: [{ provide: BsModalRef, useValue: bsModalRefSpy }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleModalComponent);
    component = fixture.componentInstance;
    component.article = { name: 'Article1', amountInStock: 10 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('should create an empty form group when action is Create', () => {
      component.action = 'Create';
      component.ngOnInit();
      expect(component.updateArticleForm.value).toEqual({ name: '', amountInStock: '' });
    });

    it('should initialize the form group with article values when action is Edit', () => {
      const article: Article = { name: 'Article1', amountInStock: 10 };
      component.action = 'Edit';
      component.article = article;
      component.ngOnInit();
      expect(component.updateArticleForm.value).toEqual({ name: article.name, amountInStock: article.amountInStock });
    });
  });
  describe('submitForm', () => {
    it('should emit updatedArticle event with form value when the submit button is clicked', () => {
      const article: Article = { name: 'Article1', amountInStock: 10 };
      component.updateArticleForm.setValue(article);
      component.action = 'Create';
      // component.ngOnInit();
      spyOn(component.updatedArticle, 'emit');
      component.submitForm();
      expect(component.isCreate).toBeTrue();
      expect(component.updatedArticle.emit).toHaveBeenCalledWith(article);
    });
  });
  it('should call bsModalRef.hide method when the cancel button is clicked', () => {
    component.cancel();
    expect(bsModalRefSpy.hide).toHaveBeenCalled();
  });
});
