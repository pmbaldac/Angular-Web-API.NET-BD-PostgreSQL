import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedcomponenteComponent } from './pedcomponente.component';

describe('PedcomponenteComponent', () => {
  let component: PedcomponenteComponent;
  let fixture: ComponentFixture<PedcomponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedcomponenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedcomponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
