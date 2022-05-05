import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingViewComponent } from './buying-view.component';

describe('BuyingViewComponent', () => {
  let component: BuyingViewComponent;
  let fixture: ComponentFixture<BuyingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
