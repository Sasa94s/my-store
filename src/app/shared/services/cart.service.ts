import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _cart: Map<number, CartItem>;
  private _addToCartMsg: Subject<CartItem>;
  private _updateCartMsg: Subject<boolean>;

  constructor() {
    this._cart = new Map<number, CartItem>();
    this._addToCartMsg = new Subject<CartItem>();
    this._updateCartMsg = new Subject<boolean>();
    this._addToCartMsg.subscribe(cartItem => {
      this._cart.set(cartItem.id, cartItem);
      this._updateCartMsg.next(!this._cart.has(cartItem.id));
    });
  }

  public getCart(): Map<number, CartItem> {
    return this._cart;
  }

  public getCartMessage(): Observable<CartItem> {
    return this._addToCartMsg.asObservable();
  }

  public getUpdateCartMessage(): Observable<boolean> {
    return this._updateCartMsg.asObservable();
  }

  public updateCart(cartItem: CartItem): void {
    this._addToCartMsg.next(cartItem);
  }
}
