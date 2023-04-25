import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Sale } from '../models/warehouse-models';
import { SaleModalComponent } from './sale-modal.component';

describe('SaleModalComponent', () => {
  let component: SaleModalComponent;
  let fixture: ComponentFixture<SaleModalComponent>;
  let bsModalRefSpy: jasmine.SpyObj<BsModalRef>;
  beforeEach(async () => {
    bsModalRefSpy = jasmine.createSpyObj<BsModalRef>('BsModalRef', ['hide']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SaleModalComponent],
      providers: [
        { provide: BsModalRef, useValue: bsModalRefSpy },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(SaleModalComponent);
    component = fixture.componentInstance;
    component.sale = { productId: 'prdid', amountSold: 10 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should disable productId control in addSaleForm', () => {
    expect(component.addSaleForm.controls['productId'].disabled).toBeTrue();
  });

  it('should emit updatedSale event with form data when submitForm is called', () => {
    const amountSold = 20;
    const expectedEventData = { amountSold };
    const updatedSaleSpy = spyOn(component.updatedSale, 'emit');
    component.addSaleForm.controls['amountSold'].setValue(amountSold);
    component.submitForm();
    expect(updatedSaleSpy).toHaveBeenCalledWith(expectedEventData);
  });

  it('should call bsModalRef.hide method when the cancel button is clicked', () => {
    component.cancel();
    expect(bsModalRefSpy.hide).toHaveBeenCalled();
  });
});
