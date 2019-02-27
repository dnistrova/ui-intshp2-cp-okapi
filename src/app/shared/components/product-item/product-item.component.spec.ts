import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductItemComponent } from './product-item.component';
import { ProductAvailabilityState, ProductSize } from '../../interfaces/product';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadComponent } from '../lazy-load/lazy-load.component';

describe('ProductItemComponent', () => {
  const product = {
    id: '1',
    name: 'Reebock Track Jacket',
    price: 100,
    rating: 2,
    // tslint:disable-next-line
    swatches: [
      { color: 'red', imgSrc: '' },
      {
        color: 'black',
        imgSrc:
            // tslint:disable-next-line
          'http://www.roasterydepartment.com/images/large/reebok/Beautiful%20Reebok%20Women%20Reebok%20Full%20Zip%20Fleece%20Jacket%20Women%20Reebok%20Jackets%20SW87_LRG.jpg',
      },
      {
        color: 'grey',
        imgSrc:
            // tslint:disable-next-line
          'http://www.roasterydepartment.com/images/large/reebok/Popular%20Reebok%20Women%20Reebok%20Full%20Zip%20Fleece%20Jacket%20Women%20Reebok%20Jackets%20MJ85_LRG.jpg',
      },
      {
        color: 'blue',
        imgSrc:
        // tslint:disable-next-line
          'http://www.roasterydepartment.com/images/large/reebok/Cheap%20Reebok%20Women%20Reebok%20Full%20Zip%20Fleece%20Jacket%20Women%20Reebok%20Jackets%20PE94_LRG.jpg',
      },
    ],
    availability: [
      ProductAvailabilityState.IN_STORE,
      ProductAvailabilityState.ONLINE_ONLY,
    ],
    thumbnailImageSrc: 'img-link',
    sizes: [ProductSize.S, ProductSize.M, ProductSize.L, ProductSize.XL],
    addedToCart: false,
    addedToWishList: true,
  };

  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ProductItemComponent, LazyLoadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a h2 with the provided label text', () => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    component.product = product;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('h2').textContent).toContain(product.name);
  });

  it('renders a p with the provided label text', () => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    component.product = product;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('.price').textContent).toContain(product.price);
  });

  it('should trigger mouseover', () => {
    spyOn(component, 'onMouseOver');
    component.product = product;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.product-item');
    const event = new MouseEvent('mouseover');
    element.dispatchEvent(event);
    expect(component.onMouseOver).toHaveBeenCalled();
  });

  it('should be ishovered on mouseover', () => {
    component.product = product;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.product-item');
    const event = new MouseEvent('mouseover');
    element.dispatchEvent(event);
    expect(component.isHovered).toBeTruthy();
  });

  it('should trigger mouseleave', () => {
    spyOn(component, 'onMouseLeave');
    component.product = product;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.product-item');
    const event = new MouseEvent('mouseleave');
    element.dispatchEvent(event);
    expect(component.onMouseLeave).toHaveBeenCalled();
  });

  it('should not be ishovered on mouseleave', () => {
    component.product = product;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.product-item');
    const event = new MouseEvent('mouseleave');
    element.dispatchEvent(event);
    expect(component.isHovered).toBeFalsy();
  });
});
