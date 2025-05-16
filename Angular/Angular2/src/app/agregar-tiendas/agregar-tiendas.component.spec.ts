import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTiendasComponent } from './agregar-tiendas.component';

describe('AgregarTiendasComponent', () => {
  let component: AgregarTiendasComponent;
  let fixture: ComponentFixture<AgregarTiendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarTiendasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
