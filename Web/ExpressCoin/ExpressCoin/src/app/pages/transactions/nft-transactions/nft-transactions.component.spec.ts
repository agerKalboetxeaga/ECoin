import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftTransactionsComponent } from './nft-transactions.component';

describe('NftTransactionsComponent', () => {
  let component: NftTransactionsComponent;
  let fixture: ComponentFixture<NftTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
