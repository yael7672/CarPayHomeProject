import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartMenuComponent } from './smart-menu.component';

describe('SmartMenuComponent', () => {
  let component: SmartMenuComponent;
  let fixture: ComponentFixture<SmartMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartMenuComponent]
    });
    fixture = TestBed.createComponent(SmartMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
