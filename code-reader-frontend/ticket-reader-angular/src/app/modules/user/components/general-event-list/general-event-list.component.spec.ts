import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralEventListComponent } from './general-event-list.component';

describe('GeneralEventListComponent', () => {
  let component: GeneralEventListComponent;
  let fixture: ComponentFixture<GeneralEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralEventListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
