import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product/product.service';
import {NotificationService} from '../../service/notification/notification.service';

declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService,
              private notificationService: NotificationService) {
  }

  getAllProduct() {
    this.productService.getAll().subscribe((productsFromBE) => {
      this.products = productsFromBE;
      $(function() {
        $('#product-list').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': true,
          'ordering': true,
          'info': true,
          'autoWidth': false,
          'responsive': true,
        });
      });
    }, error => {
      this.notificationService.showMessage('error', 'Get list fail!');
    });
  }

  //Nếu có phân trang
  // getAllProduct() {
  //   this.productService.getAll().subscribe((productsFromBE: any) =>  {
  //     this.products = productsFromBE.content;
  //   }, error => {
  //     console.log("Get list product fail");
  //   });
  // }

  ngOnInit() {
    this.getAllProduct();
  }

}
