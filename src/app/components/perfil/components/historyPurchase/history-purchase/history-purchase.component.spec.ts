import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPurchaseComponent } from './history-purchase.component';

describe('HistoryPurchaseComponent', () => {
  let component: HistoryPurchaseComponent;
  let fixture: ComponentFixture<HistoryPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryPurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
