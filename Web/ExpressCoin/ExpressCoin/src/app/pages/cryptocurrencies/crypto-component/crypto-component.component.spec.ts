import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoComponentComponent } from './crypto-component.component';

describe('CryptoComponentComponent', () => {
  let component: CryptoComponentComponent;
  let fixture: ComponentFixture<CryptoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
