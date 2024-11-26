import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsToSellerComponent } from './payments-to-seller.component';

describe('PaymentsToSellerComponent', () => {
  let component: PaymentsToSellerComponent;
  let fixture: ComponentFixture<PaymentsToSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsToSellerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentsToSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
