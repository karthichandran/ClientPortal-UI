import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form16BComponent } from './form-16-b.component';

describe('Form16BComponent', () => {
  let component: Form16BComponent;
  let fixture: ComponentFixture<Form16BComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Form16BComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Form16BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
