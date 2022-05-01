import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product | undefined;
  @Input() productId: number | undefined;
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
    if (!this.product) {
      this.productService.getProduct(this.productId || 1)
        .subscribe(products => products.length !== 0 ? this.product = products[0] : undefined);
    }
  }

  getPrice(): string {
    return this.product?.price ? `$${this.product.price}` : "";
  }

}
