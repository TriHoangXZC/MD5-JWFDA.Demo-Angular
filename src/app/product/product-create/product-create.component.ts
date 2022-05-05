import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product/product.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../service/category/category.service';
import {Category} from '../../model/category';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    category: null
  };

  categories: Category[] = [];

  productForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    price: new FormControl('', [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(private productService: ProductService,
              private router: Router,
              private notificationService: NotificationService,
              private categoryService: CategoryService) {
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

  get formGroupControl() {
    return this.productForm.controls;
  }

  ngOnInit() {
    this.getAllCategories();
  }

  // Template Form
  // createProduct(productForm) {
  //   if (productForm.valid) {
  //     this.productService.createProduct(productForm.value).subscribe(() => {
  //      this.notificationService.showMessage('success', 'Create success')
  //     }, error => {
  //       this.notificationService.showMessage('error' , 'Create fail!')
  //     });
  //     productForm.resetForm();
  //     this.router.navigateByUrl('/products');
  //   } else {
  //     this.notificationService.showMessage('error' , 'Create fail!')
  //   }
  // }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categoriesFromBE) => {
      this.categories = categoriesFromBE;
    }, error => {
      this.notificationService.showMessage('error', 'Get list categories fail!');
    });
  }

//  Reactive Form
  createProduct() {
    if (this.productForm.valid) {
      let product = this.productForm.value;
      product.category = {
        id: product.category
      }
      this.productService.createProduct(product).subscribe(() => {
        this.notificationService.showMessage('success', 'Create success');
        this.productForm.reset();
        this.router.navigateByUrl('/products');
      }, error => {
        this.notificationService.showMessage('error', 'Create fail!');
      })
    } else {
      this.notificationService.showMessage('error', 'Create fail!');
    }
  }
}
