import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: 'Iphone 13',
      price: 1500,
      description: 'New'
    },
    {
      id: 2,
      name: 'Iphone 12',
      price: 1300,
      description: 'New'
    },
    {
      id: 3,
      name: 'Iphone 11',
      price: 1100,
      description: 'New'
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }

  currentProduct: Product = {};

  isShowCreatedForm = false;

  changeStateCreateForm() {
    this.isShowCreatedForm = !this.isShowCreatedForm;
  }

  createProduct(product) {
    this.products.push(product);
    this.isShowCreatedForm = !this.isShowCreatedForm;
  }

  isShowEditedForm = false;

  changeStateEditForm(product) {
    this.isShowEditedForm = !this.isShowEditedForm;
    this.currentProduct = product;
  }

  editProduct(product) {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == product.id) {
        index = i;
        break;
      }
    }
    this.products[index] = product;
    this.isShowEditedForm = !this.isShowEditedForm;
  }

  isShowDeletedForm = false;

  changeStateDeleteForm(product) {
    this.isShowDeletedForm = !this.isShowDeletedForm;
    this.currentProduct = product;
  }

  deleteProduct(product) {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == product.id) {
        index = i;
        break;
      }
    }
    this.products.splice(index, 1);
    this.isShowDeletedForm = !this.isShowDeletedForm;
  }
}
