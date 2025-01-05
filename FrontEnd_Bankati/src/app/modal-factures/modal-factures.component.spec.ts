import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFacturesComponent } from './modal-factures.component';

describe('ModalFacturesComponent', () => {
  let component: ModalFacturesComponent;
  let fixture: ComponentFixture<ModalFacturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFacturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFacturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
