import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoMantenimientoComponent } from './catalogo-mantenimiento.component';

describe('CatalogoMantenimientoComponent', () => {
  let component: CatalogoMantenimientoComponent;
  let fixture: ComponentFixture<CatalogoMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoMantenimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
