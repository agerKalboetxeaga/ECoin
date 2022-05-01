import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftComponentComponent } from './nft-component.component';

describe('NftComponentComponent', () => {
  let component: NftComponentComponent;
  let fixture: ComponentFixture<NftComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
