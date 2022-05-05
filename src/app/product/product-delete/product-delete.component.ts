import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../service/notification/notification.service';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category/category.service';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: Product = {};

  categories: Category[] = [];

  productForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl(null),
    description: new FormControl('')
  });

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService,
              private categoryService: CategoryService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getProductById(id);
    })
  }

  get idControl() {
    return this.productForm.get('id');
  }

  get nameControl() {
    return this.productForm.get('name');
  }

  get priceControl() {
    return this.productForm.get('price');
  }

  get categoryControl() {
    return this.productForm.get('category');
  }

  get descriptionControl() {
    return this.productForm.get('description');
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(listCategory => this.categories = listCategory);
  }

  getProductById(id) {
    this.productService.getProductById(id).subscribe(productBE =>{
      this.product = productBE;
      this.idControl.setValue(this.product.id);
      this.nameControl.setValue(this.product.name);
      this.priceControl.setValue(this.product.price);
      this.categoryControl.setValue(this.product.category.id);
      this.descriptionControl.setValue(this.product.description);
    });
  }

  ngOnInit() {
    this.getAllCategories();
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id).subscribe(() => {
      this.notificationService.showMessage('success', 'Delete success');
      this.router.navigateByUrl("/products");
    }, error => {
      this.notificationService.showMessage('error', 'Delete fail')
    });
  }
}
