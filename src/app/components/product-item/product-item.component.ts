import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product | undefined;
  addToCartOptions: number[];

  constructor() {
    // initialize an array with 1 to 10 values
    this.addToCartOptions = [...Array(11).keys()].slice(1);
  }

  ngOnInit(): void {
  }

  getPrice(): string {
    return this.product?.price ? `$${this.product.price}` : "";
  }

}
