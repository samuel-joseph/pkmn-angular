import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBattleComponent } from './pre-battle.component';

describe('PreBattleComponent', () => {
  let component: PreBattleComponent;
  let fixture: ComponentFixture<PreBattleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreBattleComponent]
    });
    fixture = TestBed.createComponent(PreBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
