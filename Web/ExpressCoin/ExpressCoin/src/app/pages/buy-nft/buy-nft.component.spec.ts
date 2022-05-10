import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNFTComponent } from './buy-nft.component';

describe('BuyNFTComponent', () => {
  let component: BuyNFTComponent;
  let fixture: ComponentFixture<BuyNFTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyNFTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyNFTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
