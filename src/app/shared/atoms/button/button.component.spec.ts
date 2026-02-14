import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent, ButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default label', () => {
    const btn = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(btn.textContent.trim()).toBe('Botão');
  });

  it('should compute severity as danger when destructive is true', () => {
    component.destructive = true;
    expect(component.severity).toBe('danger');
  });

  it('should compute severity as secondary when destructive is false', () => {
    component.destructive = false;
    expect(component.severity).toBe('secondary');
  });

  it('should be outlined when variant is secondary', () => {
    component.variant = 'secondary';
    expect(component.outlined).toBe(true);
  });

  it('should not be outlined when variant is primary', () => {
    component.variant = 'primary';
    expect(component.outlined).toBe(false);
  });

  it('should be disabled if disabled input is true', () => {
    component.disabled = true;
    expect(component.isDisabled).toBe(true);
  });

  it('should be disabled if loading input is true', () => {
    component.loading = true;
    expect(component.isDisabled).toBe(true);
  });

  it('should emit action on click when enabled', () => {
    let emitted = false;
    component.action.subscribe(() => emitted = true);
    component.disabled = false;
    component.loading = false;
    component.onClick();
    expect(emitted).toBe(true);
  });

  it('should not emit action on click when disabled', () => {
    let emitted = false;
    component.action.subscribe(() => emitted = true);
    component.disabled = true;
    component.onClick();
    expect(emitted).toBe(false);
  });

  it('should not emit action on click when loading', () => {
    let emitted = false;
    component.action.subscribe(() => emitted = true);
    component.loading = true;
    component.onClick();
    expect(emitted).toBe(false);
  });
});
