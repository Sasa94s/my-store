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
  }

  getErrorMessage(entity: string) {
    return `Invalid ${entity}.`;
  }
}
