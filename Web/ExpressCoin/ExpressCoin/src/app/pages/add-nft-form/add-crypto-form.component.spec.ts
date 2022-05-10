import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCryptoFormComponent } from './add-nft-form.component';

describe('AddCryptoFormComponent', () => {
  let component: AddCryptoFormComponent;
  let fixture: ComponentFixture<AddCryptoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCryptoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCryptoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
