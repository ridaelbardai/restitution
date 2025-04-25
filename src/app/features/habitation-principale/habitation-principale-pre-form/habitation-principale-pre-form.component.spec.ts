import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitationPrincipalePreFormComponent } from './habitation-principale-pre-form.component';

describe('HabitationPrincipalePreFormComponent', () => {
  let component: HabitationPrincipalePreFormComponent;
  let fixture: ComponentFixture<HabitationPrincipalePreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitationPrincipalePreFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitationPrincipalePreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
