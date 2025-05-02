import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemasoperativosComponent } from './sistemasoperativos.component';

describe('SistemasoperativosComponent', () => {
  let component: SistemasoperativosComponent;
  let fixture: ComponentFixture<SistemasoperativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SistemasoperativosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SistemasoperativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
