import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent, SelectOption } from './select.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';

describe('SelectComponent', () => {
  let component: SelectComponent<string>;
  let fixture: ComponentFixture<SelectComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent, CommonModule, FormsModule, SelectModule, FloatLabel],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write value correctly', () => {
    component.writeValue('test');
    expect(component.value).toBe('test');
  });

  it('should register onChange callback', () => {
    let changedValue: string | null = null;
    component.registerOnChange((v) => changedValue = v);
    component.handleModelChange('option1');
    expect(changedValue).toBe('option1');
  });

  it('should register onTouched callback', () => {
    let touchedCalled = false;
    component.registerOnTouched(() => touchedCalled = true);
    component.handleBlur();
    expect(touchedCalled).toBe(true);
  });

  it('should set disabled state', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
  });

  it('should handle model change', () => {
    let changedValue: string | null = null;
    let touchedCalled = false;
    component.registerOnChange((v) => changedValue = v);
    component.registerOnTouched(() => touchedCalled = true);
    component.handleModelChange('option2');
    expect(component.value).toBe('option2');
    expect(changedValue).toBe('option2');
    expect(component.touched).toBe(true);
    expect(touchedCalled).toBe(true);
  });

  it('should mark touched on blur', () => {
    let touchedCalled = false;
    component.registerOnTouched(() => touchedCalled = true);
    component.handleBlur();
    expect(component.touched).toBe(true);
    expect(touchedCalled).toBe(true);
  });

  it('should compute isInvalid correctly', () => {
    component.required = true;
    component.touched = true;
    component.value = null;
    expect(component.isInvalid).toBe(true);
    component.value = 'value';
    expect(component.isInvalid).toBe(false);
  });

  it('should not be invalid if not required', () => {
    component.required = false;
    component.touched = true;
    component.value = null;
    expect(component.isInvalid).toBe(false);
  });
});