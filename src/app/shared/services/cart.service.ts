import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _cart: Map<number, CartItem>;
  private _addToCartMsg: Subject<CartItem>;
  private _updateCartMsg: Subject<boolean>;
  private _removeCartMsg: Subject<CartItem>;
  private _addToCartStatusMsg: Subject<boolean>;
  private _removeFromCartStatusMsg: Subject<boolean>;

  constructor() {
    this._cart = new Map<number, CartItem>();
    this._addToCartMsg = new Subject<CartItem>();
    this._updateCartMsg = new Subject<boolean>();
    this._removeCartMsg = new Subject<CartItem>();
    this._addToCartStatusMsg = new Subject<boolean>();
    this._removeFromCartStatusMsg = new Subject<boolean>();
    this._addToCartMsg.subscribe(cartItem => {
      const exists = this._cart.has(cartItem.id);
      this._cart.set(cartItem.id, cartItem);
      this._updateCartMsg.next(!exists);
      this._addToCartStatusMsg.next(!exists);
    });
    this._removeCartMsg.subscribe(cartItem => {
      const exists = this._cart.has(cartItem.id);
      this._cart.delete(cartItem.id);
      this._updateCartMsg.next(exists);
      this._removeFromCartStatusMsg.next(exists);
    });
  }

  public getCart(): Map<number, CartItem> {
    return this._cart;
  }

  public getAddToCartMessage(): Observable<CartItem> {
    return this._addToCartMsg.asObservable();
  }

  public getUpdateCartMessage(): Observable<boolean> {
    return this._updateCartMsg.asObservable();
  }

  public getRemoveFromCartMessage(): Observable<CartItem> {
    return this._removeCartMsg.asObservable();
  }

  public getAddToCartStatusMessage(): Observable<boolean> {
    return this._addToCartStatusMsg.asObservable();
  }

  public getRemoveFromCartStatusMessage(): Observable<boolean> {
    return this._removeFromCartStatusMsg.asObservable();
  }

  public updateCart(cartItem: CartItem): void {
    this._addToCartMsg.next(cartItem);
  }

  public removeCart(cartItem: CartItem): void {
    this._removeCartMsg.next(cartItem);
  }

  public clearCart(): void {
    this._cart.clear();
  }
}
