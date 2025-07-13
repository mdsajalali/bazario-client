import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBrandsComponent } from './shop-brands.component';

describe('ShopBrandsComponent', () => {
  let component: ShopBrandsComponent;
  let fixture: ComponentFixture<ShopBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopBrandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
