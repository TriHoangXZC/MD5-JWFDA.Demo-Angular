import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product = {};

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
  }

  createProduct(productForm) {
    if (productForm.valid) {
      this.productService.createProduct(productForm.value).subscribe(() => {
        console.log("Create success");
      }, error => {
        console.log("Create fail");
      });
      productForm.resetForm();
      this.router.navigateByUrl("/products");
    }
  }
}
