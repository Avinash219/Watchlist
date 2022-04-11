import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplySectionComponent } from './reply-section.component';

describe('ReplySectionComponent', () => {
  let component: ReplySectionComponent;
  let fixture: ComponentFixture<ReplySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
