import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { DataService } from './data.service';
import { IProduct, ICartProduct } from 'src/app/shared/interfaces/product';


@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cartIds: string[] = [];

  private cartAmountSource = new BehaviorSubject<number>(0);

  constructor(
    private dataService: DataService,
  ) {
    const cartIds = JSON.parse(localStorage.getItem('cartProductIds'));
    this.cartIds = cartIds ? cartIds : this.cartIds;
    this.publish();
  }

  public addToCart(product: IProduct) {
    product.addedToCart = true;
    this.cartIds.push(product.id);
    this.updateCart();
  }

  public removeFromCart(product: IProduct): void {
    product.addedToCart = false;
    const indexOfCurrId = this.cartIds.findIndex(el => el === product.id);
    this.cartIds.splice(indexOfCurrId, 1);

    this.updateCart();
  }

  public toggleCart(product: IProduct) {
    if (!product.addedToCart) {
      this.addToCart(product);
      return;
    }
    this.removeFromCart(product);
  }


  public getProducts(): Observable<IProduct[]> {
    return Observable.create((observer) => {
      const cartItems = JSON.parse(localStorage.getItem('cartProductIds'));
      if (!cartItems) {
        observer.next([]);
        return observer.complete();
      }
      this.dataService.get(`api/products?ids=${cartItems.join(',')}`).subscribe(({ products }) => {
        observer.next(products);
        observer.complete();
      });
    });
  }

  public getCartAmount(): Observable<number> {
    return this.cartAmountSource.asObservable();
  }

  public getCartIds(): string[] {
    return this.cartIds;
  }

  private updateCart(): void {
    localStorage.setItem('cartProductIds', JSON.stringify(this.cartIds));
    this.publish();
  }

  private publish(): void {
    this.cartAmountSource.next(this.cartIds.length);
  }
}
