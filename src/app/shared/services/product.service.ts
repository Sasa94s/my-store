import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _jsonURL = "assets/data.json";

  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this._jsonURL);
  }

  public getProduct(id: number) {
    return this.http.get<Product[]>(this._jsonURL)
      .pipe(
        map(products => products.filter(product => product.id === id))
      );
  }

}
