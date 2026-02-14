import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormInputComponent } from './form-input.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FloatLabelModule } from 'primeng/floatlabel';

describe('FormInputComponent', () => {
  let component: FormInputComponent;
  let fixture: ComponentFixture<FormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputComponent, ReactiveFormsModule, InputTextModule, InputMaskModule, FloatLabelModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    component.label = 'Test Label';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return empty mask for text type', () => {
    component.type = 'text';
    expect(component.mask).toBe('');
  });

  it('should return phone mask for phone type', () => {
    component.type = 'phone';
    expect(component.mask).toBe('(99) 99999-9999');
  });

  it('should return post-code mask for post-code type', () => {
    component.type = 'post-code';
    expect(component.mask).toBe('99999-999');
  });

  it('should return hasError true when control is invalid and touched', () => {
    component.control.setErrors({ required: true });
    component.control.markAsTouched();
    expect(component.hasError).toBe(true);
  });

  it('should return hasError false when control is valid', () => {
    component.control.setValue('value');
    component.control.markAsTouched();
    expect(component.hasError).toBe(false);
  });

  it('should return hasError false when control is not touched', () => {
    component.control.setErrors({ required: true });
    expect(component.hasError).toBe(false);
  });
});
