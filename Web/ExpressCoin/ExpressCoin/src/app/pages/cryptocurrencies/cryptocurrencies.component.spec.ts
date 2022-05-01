import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrenciesComponent } from './cryptocurrencies.component';

describe('CryptocurrenciesComponent', () => {
  let component: CryptocurrenciesComponent;
  let fixture: ComponentFixture<CryptocurrenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptocurrenciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptocurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
