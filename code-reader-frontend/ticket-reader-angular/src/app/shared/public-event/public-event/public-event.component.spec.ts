import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicEventComponent } from './public-event.component';

describe('PublicEventComponent', () => {
  let component: PublicEventComponent;
  let fixture: ComponentFixture<PublicEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
