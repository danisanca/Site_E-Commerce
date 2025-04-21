import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishPaymentComponent } from './finish-payment.component';

describe('FinishPaymentComponent', () => {
  let component: FinishPaymentComponent;
  let fixture: ComponentFixture<FinishPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
