import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sale } from '../models/warehouse-models';

@Component({
  selector: 'app-sale-modal',
  templateUrl: './sale-modal.component.html',
  styleUrls: ['./sale-modal.component.scss']
})
export class SaleModalComponent {

  addSaleForm!: FormGroup;
  action!: string;
  sale!: Sale;
  products: any;
  isCreate: any;
  updatedSale = new EventEmitter();
  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) { }
  /**
    * Initializes the form group for updating a sale
    * If there are existing sale , they are added to the form group
    */
  ngOnInit() {
    this.addSaleForm = this.fb.group({
      productId: [this.sale.productId, Validators.required],
      amountSold: [this.sale.amountSold, [Validators.required, Validators.min(1)]]
    });
    this.addSaleForm.controls['productId'].disable();
  }
  /**
   * Emits an event with the updated sale form data when submit is clicked
   */
  submitForm() {
    this.isCreate = true;
    this.updatedSale.emit({ amountSold: this.addSaleForm.controls['amountSold'].value });
  }
  /**
    * Closes the modal
    */
  cancel() {
    this.bsModalRef.hide();
  }
}
