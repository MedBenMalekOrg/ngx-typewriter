import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTypewriterComponent } from './ngx-typewriter.component';

describe('NgxTypewriterComponent', () => {
  let component: NgxTypewriterComponent;
  let fixture: ComponentFixture<NgxTypewriterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxTypewriterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTypewriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
