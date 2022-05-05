import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../service/product/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category/category.service';
import {error} from 'protractor';


declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = {};

  categories: Category[] = [];

  productForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    price: new FormControl('', [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService,
              private categoryService: CategoryService) {
    //Router: Đối tượng giúp chuyển sang bên phía ts)
    //ActivatedRoute => Lấy giá trị của biến trên đường dẫn
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // + => ép kiểu từ chuỗi sang số
      const id = +paramMap.get('id');
      this.getProductById(id);
    });
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
    this.productService.getProductById(id).subscribe(productBE => {
      this.product = productBE;
      this.idControl.setValue(this.product.id);
      this.nameControl.setValue(this.product.name);
      this.priceControl.setValue(this.product.price);
      this.descriptionControl.setValue(this.product.description);
      this.categoryControl.setValue(this.product.category.id);
    });
  }

  ngOnInit() {
    this.getAllCategories();
  }

  editProduct() {
    let product = this.productForm.value;
    product.category = {
      id: product.category
    }
    this.productService.editProduct(this.product.id, this.productForm.value).subscribe(() => {
      this.notificationService.showMessage('success', 'Edit success');
      this.router.navigateByUrl('/products');
    }, error => {
      this.notificationService.showMessage('error', 'Edit fail!');
    });
  }
}
