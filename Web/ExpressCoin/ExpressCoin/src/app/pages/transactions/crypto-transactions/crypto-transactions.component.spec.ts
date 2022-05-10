import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoTransactionsComponent } from './crypto-transactions.component';

describe('CryptoTransactionsComponent', () => {
  let component: CryptoTransactionsComponent;
  let fixture: ComponentFixture<CryptoTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
