import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WarehouseInventoryComponent } from './warehouse-inventory/warehouse-inventory.component';
import { ArticleService } from './services/article.service';
import { ProductService } from './services/product.service';
import { SaleService } from './services/sale.service';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ArticleModalComponent } from './article-modal/article-modal.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastrModule } from 'ngx-toastr';
import { SaleModalComponent } from './sale-modal/sale-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    WarehouseInventoryComponent,
    ProductModalComponent,
    ArticleModalComponent,
    SaleModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [ArticleService,ProductService, SaleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
