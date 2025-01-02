import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlafondComponent } from './modal-plafond.component';

describe('ModalPlafondComponent', () => {
  let component: ModalPlafondComponent;
  let fixture: ComponentFixture<ModalPlafondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPlafondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
