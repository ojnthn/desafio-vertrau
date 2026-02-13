import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormFieldConfig, FormInputComponent } from '../../molecules/form-input/form-input.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormInputComponent,
    ButtonComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) fields!: FormFieldConfig[];

  @Input() submitLabel = 'Salvar';
  @Input() cancelLabel = 'Cancelar';
  @Input() loading = false;

  @Output() formResult = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.formResult.emit(this.form.getRawValue());
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
