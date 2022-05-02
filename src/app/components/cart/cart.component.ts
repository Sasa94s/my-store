import {Component, OnInit} from '@angular/core';
import {CartService} from "../../shared/services/cart.service";
import {AlertService} from "../../shared/services/alert.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  fullName = new FormControl('', [Validators.required, Validators.minLength(3)]);
  address = new FormControl('', [Validators.required, Validators.minLength(6)]);
  creditCardNumber = new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]);

  totalAmount: number = 0;

  constructor(
    private alertService: AlertService,
    public cartService: CartService,
  ) {
  }

  ngOnInit(): void {
    this.recalculateTotalAmount();
    this.cartService.getUpdateCartMessage().subscribe(_ => this.recalculateTotalAmount());
  }

  getErrorMessage(entity: string) {
    return `Invalid ${entity}.`;
  }

  recalculateTotalAmount(): void {
    this.totalAmount = 0;
    this.cartService.getCart().forEach(cartItem => this.totalAmount += (cartItem.price * cartItem.amount));
  }

  changeItemAmount(cartItem: CartItem, amount: number) {
    cartItem.amount = amount;
    this.cartService.updateCart(cartItem);
  }
}
