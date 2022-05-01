import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product?: Product;
  @Input() productId?: number;

  isFulLView: boolean = false;

  addToCartOptions: number[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    // initialize an array with 1 to 10 values
    this.addToCartOptions = [...Array(11).keys()].slice(1);
  }

  ngOnInit(): void {
    if (!this.productId) {
      this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    }

    // when productId is passed via route url and no product pass as an input
    this.isFulLView = !!this.productId && !this.product;

    if (this.isFulLView) {
      this.productService.getProduct(this.productId)
        .subscribe(products => products.length !== 0 ? this.product = products[0] : undefined);
    }
  }

}
