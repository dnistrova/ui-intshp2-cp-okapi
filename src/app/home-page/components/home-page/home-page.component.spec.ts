import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomePageComponent } from './home-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SlideshowComponent } from '../slideshow/slideshow.component';
import { WishListComponent } from '../wish-list/wish-list.component';
import { RecentlyViewedComponent } from '../recently-viewed/recently-viewed.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, RouterTestingModule],
      declarations: [
        HomePageComponent,
        SlideshowComponent,
        WishListComponent,
        RecentlyViewedComponent
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.products = [{
      'id': '1',
      'title': 'String',
      'price': 1,
      'brand': 'String',
      'description': 'String',
      'sex': 'String',
      'name': 'String',
      'rating': 1,
      'swatches': [],
      'availability': [],
      'thumbnailImageSrc': 'string',
      'sizes': [],
      'addedToCart': true,
      'addedToWishList': true,
      'relatedProducts': []
    }
    ];
    component.wishList = [{
      'id': '1',
      'title': 'String',
      'price': 1,
      'brand': 'String',
      'description': 'String',
      'sex': 'String',
      'name': 'String',
      'rating': 1,
      'swatches': [],
      'availability': [],
      'thumbnailImageSrc': 'string',
      'sizes': [],
      'addedToCart': true,
      'addedToWishList': true,
      'relatedProducts': []
    }
    ];
    component.recentlyViewed = [{
      'id': '1',
      'title': 'String',
      'price': 1,
      'brand': 'String',
      'description': 'String',
      'sex': 'String',
      'name': 'String',
      'rating': 1,
      'swatches': [],
      'availability': [],
      'thumbnailImageSrc': 'string',
      'sizes': [],
      'addedToCart': true,
      'addedToWishList': true,
      'relatedProducts': []
    }
    ];
    expect(component).toBeTruthy();
  });
});
