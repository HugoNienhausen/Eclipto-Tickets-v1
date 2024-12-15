import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreatorComponent } from './event-creator.component';

describe('EventCreatorComponent', () => {
  let component: EventCreatorComponent;
  let fixture: ComponentFixture<EventCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
