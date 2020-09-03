import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OncallComponent } from './oncall.component';

describe('OncallComponent', () => {
  let component: OncallComponent;
  let fixture: ComponentFixture<OncallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OncallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OncallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
