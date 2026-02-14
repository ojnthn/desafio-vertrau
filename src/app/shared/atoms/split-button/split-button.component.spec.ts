import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplitButtonComponent } from './split-button.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';

describe('SplitButtonComponent', () => {
  let component: SplitButtonComponent;
  let fixture: ComponentFixture<SplitButtonComponent>;

  const mockOptions: MenuItem[] = [
    { label: 'Option 1', command: () => {} },
    { label: 'Option 2', command: () => {} },
  ];

   beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitButtonComponent, SplitButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitButtonComponent);
    component = fixture.componentInstance;
    component.options = mockOptions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return primaryOption as first option', () => {
    expect(component.primaryOption).toBe(mockOptions[0]);
  });

  it('should return otherOptions excluding the first', () => {
    expect(component.otherOptions).toEqual([mockOptions[1]]);
  });

  it('should emit action when onCommand is called', () => {
    let emittedEvent: MenuItemCommandEvent | null = null;
    component.action.subscribe((event) => (emittedEvent = event));

    const eventMock: MenuItemCommandEvent = { originalEvent: new MouseEvent('click'), item: mockOptions[1] };
    component.onCommand(eventMock);
    expect(emittedEvent).toBe(eventMock);
  });

});
