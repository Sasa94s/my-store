import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: Product[] = [];

  constructor(
    public alertService: AlertService,
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}
