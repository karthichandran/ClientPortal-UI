import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdsComplianceComponent } from './tds-compliance.component';

describe('TdsComplianceComponent', () => {
  let component: TdsComplianceComponent;
  let fixture: ComponentFixture<TdsComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdsComplianceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdsComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
