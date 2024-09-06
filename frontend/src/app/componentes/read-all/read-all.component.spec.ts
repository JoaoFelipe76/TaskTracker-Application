import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAllComponent } from './read-all.component';

describe('ReadAllComponent', () => {
  let component: ReadAllComponent;
  let fixture: ComponentFixture<ReadAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
