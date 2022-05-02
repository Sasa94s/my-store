import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Output() removeFromCart: EventEmitter<Status>;
  @Output() addToCart: EventEmitter<Status>;

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
    this.addToCart = new EventEmitter<Status>();
    this.removeFromCart = new EventEmitter<Status>();
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

    this.cartService.getAddToCartStatusMessage()
      .subscribe(status => this.addToCart.emit({state: status, message: 'Item is added to cart successfully!'}));

    this.cartService.getRemoveFromCartStatusMessage()
      .subscribe(status => this.removeFromCart.emit({
        state: status,
        message: status ? 'Item is removed from cart successfully!' : 'Item is not found to be removed from cart.'
      }));

    if (this.isFulLView) {
      this.addToCart.subscribe(status => this.alertService.openSnackBar(status.message, 'OK'));
      this.removeFromCart.subscribe(status => this.alertService.openSnackBar(status.message, 'OK'));
    }
  }

  addToCartAction(amount: number, product: Product) {
    if (amount === 0) {
      this.addToCart.emit({state: false, message: 'Amount to be added to cart is not selected.'});
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

  removeFromCartAction(product: Product) {
    this.cartService.removeCart({
      id: product.id,
      name: product.name,
      price: product.price,
      url: product.url,
      amount: 0,
    });
  }
}
