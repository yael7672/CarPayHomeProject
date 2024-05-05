import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePropertiesComponent } from './change-properties.component';

describe('ChangePropertiesComponent', () => {
  let component: ChangePropertiesComponent;
  let fixture: ComponentFixture<ChangePropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePropertiesComponent]
    });
    fixture = TestBed.createComponent(ChangePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
