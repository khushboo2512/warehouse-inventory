import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Article } from '../models/warehouse-models';
import { ProductModalComponent } from './product-modal.component';

describe('ProductModalComponent', () => {
  let component: ProductModalComponent;
  let fixture: ComponentFixture<ProductModalComponent>;
  let bsModalRefSpy: jasmine.SpyObj<BsModalRef>;

  beforeEach(async () => {
    bsModalRefSpy = jasmine.createSpyObj<BsModalRef>('BsModalRef', ['hide']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductModalComponent],
      providers: [{ provide: BsModalRef, useValue: bsModalRefSpy }]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('on initialization', () => {
    it('should initialize the productForm', () => {
      expect(component.productForm).toBeDefined();
    });
  });
  describe('addArticle', () => {
    it('should add a new article form group to the articles form array', () => {
      const initialLength = component.articlesFormArray.length;
      component.addArticle();
      expect(component.articlesFormArray.length).toEqual(initialLength + 1);
    });
  });
  describe('deleteArticle', () => {
    it('should delete an article form group at a given index from the articles form array', () => {
      const initialLength = component.articlesFormArray.length;
      component.deleteArticle(0);
      expect(component.articlesFormArray.length).toEqual(initialLength);
    });
  });
  describe('submitForm', () => {
    it('should emit an event with the updated product form data when submit is clicked', () => {
      spyOn(component.updatedProduct, 'emit');
      component.submitForm();
      expect(component.updatedProduct.emit).toHaveBeenCalledWith(component.productForm.value);
    });
  });
  it('should call bsModalRef.hide method when the cancel button is clicked', () => {
    component.cancel();
    expect(bsModalRefSpy.hide).toHaveBeenCalled();
  });
});
