import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CarouselComponent } from './carousel.component';
import { SharedModule } from '../../shared.module';
import { ProductDetailsPageModule } from 'src/app/product-details-page/product-details-page.module';


describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, ProductDetailsPageModule],
      providers: []
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CarouselComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
