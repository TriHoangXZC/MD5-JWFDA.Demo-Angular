import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../model/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @Input()
  product: Product = {};

  @Output()
  newProduct = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {
  }

  editProduct() {
    this.newProduct.emit(this.product);
  }
}
