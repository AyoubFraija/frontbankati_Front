import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotaleComponent } from './totale.component';

describe('TotaleComponent', () => {
  let component: TotaleComponent;
  let fixture: ComponentFixture<TotaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
