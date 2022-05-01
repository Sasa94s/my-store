import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../shared/services/cart.service";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product?: Product;
  @Input() productId?: number;

  selectedAmount: number = 0;
  isFulLView: boolean = false;
  addToCartOptions: number[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private alertService: AlertService,
    public cartService: CartService,
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

  addToCart(amount: number, product: Product) {
    if (amount === 0) {
      this.alertService.openSnackBar("Amount to be added to cart is not selected.", "OK");
      return;
    }

    this.cartService.updateCart({
      id: product.id,
      name: product.name,
      url: product.url,
      price: product.price,
      amount: amount,
    });
  }

}
