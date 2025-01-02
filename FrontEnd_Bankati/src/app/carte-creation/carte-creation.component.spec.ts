import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteCreationComponent } from './carte-creation.component';

describe('CarteCreationComponent', () => {
  let component: CarteCreationComponent;
  let fixture: ComponentFixture<CarteCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarteCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
