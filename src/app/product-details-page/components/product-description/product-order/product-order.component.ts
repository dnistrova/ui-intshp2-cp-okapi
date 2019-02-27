import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';


import { DataService } from 'src/app/core/services/data.service';
import { KillswitchService } from 'src/app/core/services/killswitch.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.scss']
})
export class ProductOrderComponent implements OnChanges {
  @Input() product: IProduct;
  @Input() addedToCart: boolean;
  @Input() addedToWishList: boolean;
  public selected: number;
  selectedSwatch: number;
  @Output() swatchSelect = new EventEmitter();

  public productConfiguration = {
    count: 1,
    size: '',
    price: 0,
    swatch: ''
  };
  public wishListEnabled;

  constructor(
    private productsService: ProductsService,
    private dataService: DataService,
    private killswitchService: KillswitchService
    ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.wishListEnabled = this.killswitchService.getKillswitch('wishListEnabled');
    if (!this.product || !this.product.sizes && !this.product.price) {
      return;
    }

    const { product } = changes;
    if (!product) {
      return;
    }
    const { price } = product.currentValue;
    this.productConfiguration.price = price;
  }

  addToCart() {
    this.dataService.create('add-to-cart/', this.productConfiguration).subscribe();
  }

  public toggleWishList(): void {
    this.productsService.toggleWishListProduct(this.product);
  }

  public increaseQuantity(): void {
    this.productConfiguration.count++;
    this.productConfiguration.price += this.product.price;
  }

  public decreaseQuantity(): void {
    if (this.productConfiguration.count > 1) {
      this.productConfiguration.count--;
      this.productConfiguration.price -= this.product.price;
    }
  }

  public onChooseSize(size: string, i: number): void {
    this.productConfiguration.size = size;
    this.selected = i;
  }

  public onChooseColor(swatch: string, i: number): void {
    this.productConfiguration.swatch = swatch;
    this.selectedSwatch = i;
    this.swatchSelect.emit(swatch);
  }
}
