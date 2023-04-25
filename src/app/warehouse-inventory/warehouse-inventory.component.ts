import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Article, Product, Sale } from '../models/warehouse-models';
import { ArticleService } from '../services/article.service';
import { ProductService } from '../services/product.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { SaleService } from '../services/sale.service';
import { ArticleModalComponent } from '../article-modal/article-modal.component';
import { ToastrService } from 'ngx-toastr';
import { SaleModalComponent } from '../sale-modal/sale-modal.component';

@Component({
  selector: 'app-warehouse-inventory',
  templateUrl: './warehouse-inventory.component.html',
  styleUrls: ['./warehouse-inventory.component.scss']
})
export class WarehouseInventoryComponent implements OnInit {
  activeTab: string = 'products';
  products: any;
  sales: any;
  articles: any;
  modalRef!: BsModalRef;
  selectedProduct: any;
  selectedArticles: any[] = [];
  addSaleForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  selectedArticle!: any;
  isArticleModalOpen = false;
  isCreate = false;
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  selectedItemId: any;
  selectedType!: string;
  selectedSale: any;
  constructor(private fb: FormBuilder, private productService: ProductService, private articleService: ArticleService,
    private saleService: SaleService, private modalService: BsModalService, private toastr: ToastrService) { }
  /**
    * Initializes the component by calling the required APIs and
    * creating sale form
    */
  ngOnInit(): void {
    this.initData();
    this.addSaleForm = this.fb.group({
      productId: ['', Validators.required],
      amountSold: [0, [Validators.required, Validators.min(1)]]
    });
  }
  /**
    * Fetches all the required data by calling respective APIs.
    */
  initData() {
    this.getArticles();
    this.getProducts();
    this.getSales();
  }
  /**
    * Fetches the articles data.
    */
  getArticles() {
    this.articleService.getArticles().subscribe((res: any) => {
      this.articles = res;
      this.successMessage = 'Data loaded successfully';
    }, err => {
      if (err.status === 0) {
        this.errorMessage = 'Server is not running. Please try again later.';
      } else {
        this.errorMessage = err.error.message;
      }
      this.toastr.error(this.errorMessage, 'Error');
    });
  }
  /**
    * Fetches the sales data.
    */
  getSales() {
    this.saleService.getSales().subscribe((res: any) => {
      this.sales = res;
    }, err => {
      if (err.status === 0) {
        this.errorMessage = 'Server is not running. Please try again later.';
      } else {
        this.errorMessage = err.error.message;
      }
      this.toastr.error(this.errorMessage, 'Error');
    });
  }
  /**
    * Fetches the products data.
    */
  getProducts() {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res;
    }, err => {
      if (err.status === 0) {
        this.errorMessage = 'Server is not running. Please try again later.';
      } else {
        this.errorMessage = err.error.message;
      }
      this.toastr.error(this.errorMessage, 'Error');
    });
  }
  /**
    * Fetches the article name given article id.
    */
  getArticleName(articleId: any) {
    const article = this.articles ? this.articles.find((article: any) => article.id === articleId) : '';
    return article ? article.name : 'Unknown Article';
  }
  /**
    * Fetches the product name given product id.
    */
  getProductName(productId: any) {
    const product = this.products ? this.products.find((prd: any) => prd.id === productId) : '';
    return product ? product.name : 'Unknown Product';
  }
  /**
    * Updates the existing product 
    */
  editProduct(action: any, product: any) {
    let productId = product.id;
    const initialState: ModalOptions = {
      initialState: {
        product: product,
        action: action,
        articleData: this.articles,
        productArticles: product.articles,
        isCreate: false
      }
    };
    this.modalRef = this.modalService.show(ProductModalComponent, initialState);
    this.modalRef.setClass('modal-lg');
    this.modalRef.content.action = action;
    this.modalRef.content.updatedProduct.subscribe((updatedProduct: Product) => {
      this.productService.updateProduct(updatedProduct, productId).subscribe((res: any) => {
        if (res) {
          this.toastr.success('Product updated successfully', 'Success');
          this.getProducts();
          this.modalRef.hide();
        }
      }, err => {
        if (err.status === 0) {
          this.errorMessage = 'Server is not running. Please try again later.';
        } else {
          this.errorMessage = err.error.message;
        }
        this.toastr.error(this.errorMessage, 'Error');
        this.getProducts();
        this.modalRef.hide();
      });
    });
  }
  /**
    * Creates a new product 
    */
  createProduct(action: any) {
    const initialState: ModalOptions = {
      initialState: {
        action: action,
        articleData: this.articles,
        isCreate: false
      }
    };
    this.modalRef = this.modalService.show(ProductModalComponent, initialState);
    this.modalRef.setClass('modal-lg');
    this.modalRef.content.action = action;
    this.modalRef.content.updatedProduct.subscribe((updatedProduct: Product) => {
      this.productService.addProduct(updatedProduct).subscribe((res: any) => {
        if (res) {
          this.toastr.success('Product created successfully', 'Success');
          this.getProducts();
          this.modalRef.hide();
        }
      }, err => {
        if (err.status === 0) {
          this.errorMessage = 'Server is not running. Please try again later.';
        } else {
          this.errorMessage = err.error.message;
        }
        this.toastr.error(this.errorMessage, 'Error');
        this.getProducts();
        this.modalRef.hide();
      });
    });
  }
  /**
    * Creates a new article 
    */
  createArticle(action: string) {
    const initialState: ModalOptions = {
      initialState: {
        action: action,
        isCreate: false
      }
    };
    this.modalRef = this.modalService.show(ArticleModalComponent, initialState);
    this.modalRef.content.action = action;
    this.modalRef.content.updatedArticle.subscribe((updatedArticle: Article) => {
      this.articleService.addArticle(updatedArticle).subscribe((res: any) => {
        if (res) {
          this.toastr.success('Article created successfully', 'Success');
          this.getArticles();
          this.modalRef.hide();
        }
      }, err => {
        if (err.status === 0) {
          this.errorMessage = 'Server is not running. Please try again later.';
        } else {
          this.errorMessage = err.error.message;
        }
        this.toastr.error(this.errorMessage, 'Error');
        this.getArticles();
        this.modalRef.hide();
      });
    });
  }
  /**
    * Updates an existing article 
    */
  editArticle(action: string, article: Article) {
    let articleId = article.id;
    const initialState: ModalOptions = {
      initialState: {
        article: article,
        action: action,
        isCreate: false
      }
    };
    this.modalRef = this.modalService.show(ArticleModalComponent, initialState);
    this.modalRef.content.action = action;
    this.modalRef.content.updatedArticle.subscribe((updatedArticle: Article) => {
      this.articleService.updateArticle(updatedArticle, articleId).subscribe((res: any) => {
        if (res) {
          this.toastr.success('Article updated successfully', 'Success');
          this.getArticles();
          this.modalRef.hide();
        }
      }, err => {
        if (err.status === 0) {
          this.errorMessage = 'Server is not running. Please try again later.';
        } else {
          this.errorMessage = err.error.message;
        }
        this.toastr.error(this.errorMessage, 'Error');
        this.getArticles();
        this.modalRef.hide();
      });
    });
  }
  /**
    * Edits an existing sale 
    */
  editSale(action: string, sale: Sale) {
    let saleId = sale.id;
    let oldAmountSold = sale.amountSold;
    let isEdit = false;
    this.selectedSale = sale;
    const initialState: ModalOptions = {
      initialState: {
        sale: sale,
        action: action,
        products: this.products,
        isCreate: false
      }
    };
    this.getSelectedProductArticles(sale.productId);
    this.modalRef = this.modalService.show(SaleModalComponent, initialState);
    this.modalRef.content.action = action;
    this.modalRef.content.updatedSale.subscribe((updatedSale: Sale) => {
      let updatedArticles = [];
      if (updatedSale.amountSold < oldAmountSold) {
        isEdit = false;
        updatedArticles = this.updateArticles(oldAmountSold - updatedSale.amountSold);
      }
      else {
        isEdit = true;
        updatedArticles = this.updateArticles(updatedSale.amountSold - oldAmountSold, isEdit);
      }
      this.bulkUpdateArticles(updatedArticles, 'edit', updatedSale);
    });
  }
  /**
    * Collects the data for the item which is selected to be deleted
    */
  deleteItem(itemId: any, type: string, sale?: any) {
    this.modalRef = this.modalService.show(this.deleteModal);
    this.selectedItemId = itemId;
    this.selectedType = type;
    this.selectedSale = sale;
  }
  /**
    *  Confirms the deletion of a product, article or sale item by calling delete API for respective item
    */
  confirmDelete() {
    if (this.selectedType == 'products') {
      this.productService.deleteProduct(this.selectedItemId).subscribe((res: any) => {
        this.toastr.success('Product deleted successfully', 'Success');
        this.closeModal();
        this.getProducts();
      }, err => {
        if (err.status === 0) {
          this.errorMessage = 'Server is not running. Please try again later.';
        } else {
          this.errorMessage = err.error.message;
        }
        this.toastr.error(this.errorMessage, 'Error');
        this.closeModal();
      });
    } else if (this.selectedType == 'articles') {
      this.articleService.deleteArticle(this.selectedItemId).subscribe((res: any) => {
        this.toastr.success('Article deleted successfully', 'Success');
        this.getArticles();
        this.closeModal();
      }, err => {
        if (err.status === 0) {
          this.errorMessage = 'Server is not running. Please try again later.';
        } else {
          this.errorMessage = err.error.message;
        }
        this.toastr.error(this.errorMessage, 'Error');
        this.closeModal();
      });
    } else if (this.selectedType == 'sales') {
      this.getSelectedProductArticles(this.selectedSale.productId);
      let updatedArticles = this.updateArticles(this.selectedSale.amountSold);
      this.bulkUpdateArticles(updatedArticles, 'delete');

    }
  }
  /**
   * Closes the modal
   */
  closeModal() {
    this.modalRef.hide();
  }
  /**
    * Sets the active tab when a tab is selected.
    */
  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
  /**
    * When a product is selected from Sales form, its data is collected to process further.
    */
  onProductSelect(product: any) {
    const productId = this.addSaleForm.controls['productId'].value;
    this.getSelectedProductArticles(productId);
  }
  /**
    * When a product is selected to be registered for a sale,
    * its related articles are fetched and stored to help update inventory
    */
  getSelectedProductArticles(productId: any) {
    this.selectedProduct = this.products.find((prd: any) => prd.id === productId);
    this.selectedArticles = [];
    for (let article of this.selectedProduct.articles) {
      let stock = this.getArticleStock(article.id);
      this.selectedArticles.push({
        id: article.id,
        name: stock.name,
        quantity: Math.floor(stock.amountInStock / article.amountRequired), // Calculating based on amountInStock and amountRequired how much quantity can be oredered
        amountRequired: article.amountRequired,
        amountInStock: stock.amountInStock
      });
    }
  }
  /**
    * Gets the existing stock of article given its ID
    */
  getArticleStock(articleId: any) {
    let article = this.articles.find((item: any) => item.id === articleId);
    return { name: article.name, amountInStock: article.amountInStock };
  }
  /**
    * Handles the submission of the sale form. 
    * It creates a new Sale object, gets the updated article stock based on the sale, and registers the sale.
    */
  onSaleSubmit() {
    this.isCreate = true;
    let sales: Sale = {
      productId: this.selectedProduct.id,
      amountSold: this.addSaleForm.controls['amountSold'].value
    };
    this.selectedSale = sales;
    let updatedArticles = this.updateArticles();
    this.bulkUpdateArticles(updatedArticles, 'add');
  }
  /**
    * It updates the new stock of the Articles related to the product selected for sale. 
    * When inventory is updated successfully, then it makes call to register the sale depending on
    * action- add/edit/delete
    */
  bulkUpdateArticles(updatedArticles: any, type: string, sale?: any) {
    this.articleService.bulkUpdateArticle(updatedArticles).subscribe(res => {
      if (res) {
        this.successMessage = 'Inventory updated successfully';
        // this.toastr.info(this.successMessage, 'Info');
        if (type == 'add') {
          this.registerSale(this.selectedSale);
        } else if (type == 'delete') {
          this.deleteSale();
        } else if (type == 'edit') {
          this.updateSale(sale);
        }
      }
    }, err => {
      if (err.status === 0) {
        this.errorMessage = 'Server is not running. Please try again later.';
      } else {
        this.errorMessage = err.error.message;
      }
      this.toastr.error(this.errorMessage, 'Error');
    });
  }
  /**
    * Creates a new sale
    */
  registerSale(sales: any) {
    this.saleService.addSale(sales).subscribe(res => {
      if (res) {
        this.successMessage = 'Sales registered and inventory updated successfully';
        this.toastr.success(this.successMessage, 'Success');
        this.isCreate = false;
        this.initData();
        this.addSaleForm.reset();
      }
    }, err => {
      if (err.status === 0) {
        this.errorMessage = 'Server is not running. Please try again later.';
      } else {
        this.errorMessage = err.error.message;
      }
      this.toastr.error(this.errorMessage, 'Error');
      this.isCreate = false;
      this.addSaleForm.reset();
    });
  }
  /**
    * Deletes an existing sale
    */
  deleteSale() {
    this.saleService.deleteSale(this.selectedItemId).subscribe((res: any) => {
      this.toastr.success('Sales deleted successfully', 'Success');
      this.initData();
      this.closeModal();
    }, err => {
      if (err.status === 0) {
        this.errorMessage = 'Server is not running. Please try again later.';
      } else {
        this.errorMessage = err.error.message;
      }
      this.toastr.error(this.errorMessage, 'Error');
      this.closeModal();
    });
  }
  /**
    * Updates an existing sale
    */
  updateSale(updatedSale: any) {
    this.saleService.updateSale(updatedSale, this.selectedSale.id).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Sale updated successfully', 'Success');
        this.initData();
        this.closeModal();
      }
    }, err => {
      if (err.status === 0) {
        this.errorMessage = 'Server is not running. Please try again later.';
      } else {
        this.errorMessage = err.error.message;
      }
      this.toastr.error(this.errorMessage, 'Error');
      this.getSales();
      this.modalRef.hide();
    });
  }
  /**
    * Processes and calculates the new stock of the articles which are selected for sale. 
    */
  updateArticles(amountSold?: any, isEdit?: any): Article[] {
    let updatedArticles: Article[] = [];
    if (amountSold && isEdit) { // When Sale is edited
      for (let article of this.selectedArticles) {
        let newStock = article.amountRequired * amountSold;
        console.log('new stock after sale edit', newStock);
        updatedArticles.push({
          id: article.id,
          amountToSubtract: newStock,
        });
      }
    } else if (amountSold) { // When sale is deleted
      for (let article of this.selectedArticles) {
        let newStock = article.amountInStock + (article.amountRequired * amountSold);
        console.log('new stock after sale delete', newStock);
        updatedArticles.push({
          id: article.id,
          amountInStock: newStock,
        });
      }
    } else {
      for (let article of this.selectedArticles) { // When new sale registered
        let newStock = article.amountRequired * this.addSaleForm.controls['amountSold'].value;
        console.log('new stock after sale register', newStock);
        updatedArticles.push({
          id: article.id,
          amountToSubtract: newStock,
        });
      }
    }
    return updatedArticles;
  }
  /**
    * Validates the quantity selected for sale to check that it is not more than the item in stock 
    */
  validateQuantity() {
    const amountSoldControl = this.addSaleForm.controls['amountSold'];
    for (let article of this.selectedArticles) {
      let newStock = article.amountRequired * this.addSaleForm.controls['amountSold'].value;
      console.log('new stock after sale', newStock);
      if (newStock > article.amountInStock) {
        amountSoldControl.setErrors({ 'invalidQuantity': true });
        break;
      } else {
        amountSoldControl.setErrors(null);
      }
    }
  }

}
