import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _cart: Map<number, CartItem>;
  private _addToCartMsg: Subject<CartItem>;

  constructor() {
    this._cart = new Map<number, CartItem>();
    this._addToCartMsg = new Subject<CartItem>();
    this._addToCartMsg.subscribe(cartItem => this._cart.set(cartItem.id, cartItem));
  }

  public getCart(): Map<number, CartItem> {
    return this._cart;
  }

  public getCartMessage(): Observable<CartItem> {
    return this._addToCartMsg.asObservable();
  }

  public updateCart(cartItem: CartItem): void {
    this._addToCartMsg.next(cartItem);
  }
}
