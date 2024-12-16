import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreancierComponent } from './creancier.component';

describe('CreancierComponent', () => {
  let component: CreancierComponent;
  let fixture: ComponentFixture<CreancierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreancierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
