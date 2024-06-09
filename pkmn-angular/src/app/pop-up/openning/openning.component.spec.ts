import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenningComponent } from './openning.component';

describe('OpenningComponent', () => {
  let component: OpenningComponent;
  let fixture: ComponentFixture<OpenningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenningComponent]
    });
    fixture = TestBed.createComponent(OpenningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
