import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCarteComponent } from './modal-carte.component';

describe('ModalCarteComponent', () => {
  let component: ModalCarteComponent;
  let fixture: ComponentFixture<ModalCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCarteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
