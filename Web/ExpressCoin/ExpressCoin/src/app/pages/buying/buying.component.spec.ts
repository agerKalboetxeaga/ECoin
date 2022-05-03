import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingComponent } from './buying.component';

describe('BuyingComponent', () => {
  let component: BuyingComponent;
  let fixture: ComponentFixture<BuyingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
