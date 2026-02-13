import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FloatLabelModule } from 'primeng/floatlabel';

export interface FormFieldConfig {
  name: string;
  label: string;
  type?: 'text' | 'post-code' | 'phone';
  control: FormControl;
  errorMessage?: string;
}


@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    FloatLabelModule
  ],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss'
})
export class FormInputComponent {
  @Input({ required: true }) control!: FormControl;

  @Input() label!: string;
  @Input() type: 'text' | 'post-code' | 'phone' = 'text';
  @Input() errorMessage = 'Campo inválido';

  get mask(): string {
    var maskFormat = "";

    switch(this.type) {
        case 'phone':
            maskFormat = '(99) 99999-9999';
            break;
        case 'post-code':
            maskFormat = '99999-999';
            break;
    }

    return maskFormat;
  }

  get hasError(): boolean {
    return this.control.invalid && this.control.touched;
  }
}
