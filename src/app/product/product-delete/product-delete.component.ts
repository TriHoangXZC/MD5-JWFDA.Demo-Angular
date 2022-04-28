import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: Product = {};

  productForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router ) {
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

  get descriptionControl() {
    return this.productForm.get('description');
  }

  getProductById(id) {
    this.productService.getProductById(id).subscribe(productBE =>{
      this.product = productBE;
      this.idControl.setValue(this.product.id);
      this.nameControl.setValue(this.product.name);
      this.priceControl.setValue(this.product.price);
      this.descriptionControl.setValue(this.product.description);
    });
  }

  ngOnInit() {
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id).subscribe(() => {
      console.log("Delete success");
    }, error => {
      console.log("Delete fail");
    });
    this.router.navigateByUrl("/products")
  }

}
