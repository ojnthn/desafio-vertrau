import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormInputComponent } from '../../molecules/form-input/form-input.component';
import { ButtonComponent } from '../../atoms/button/button.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent, ReactiveFormsModule, FormInputComponent, ButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    component.fields = [
      { name: 'name', label: 'Name', control: new FormControl('', Validators.required) },
      { name: 'email', label: 'Email', control: new FormControl('', Validators.required) }
    ];

    component.form = new FormGroup({
      name: component.fields[0].control,
      email: component.fields[1].control
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formResult when form is valid', () => {
    let emittedValue: any;
    component.formResult.subscribe(value => emittedValue = value);

    component.form.setValue({ name: 'John', email: 'john@test.com' });
    component.onSubmit();

    expect(emittedValue).toEqual({ name: 'John', email: 'john@test.com' });
  });

  it('should not emit formResult when form is invalid', () => {
    let emittedValue: any = null;
    component.formResult.subscribe(value => emittedValue = value);

    component.form.setValue({ name: '', email: '' });
    component.onSubmit();

    expect(emittedValue).toBeNull();
    expect(component.form.touched).toBe(true);
  });

  it('should emit cancel event on onCancel', () => {
    let cancelled = false;
    component.cancel.subscribe(() => cancelled = true);
    component.onCancel();
    expect(cancelled).toBe(true);
  });
});