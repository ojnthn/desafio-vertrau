import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputMaskModule } from "primeng/inputmask";
import { InputTextModule } from "primeng/inputtext";
import { IftaLabelModule } from "primeng/iftalabel"; // só se você realmente usar

@Component({
  selector: "app-form-input",
  standalone: true,
  imports: [InputTextModule, InputMaskModule, FormsModule, IftaLabelModule],
  templateUrl: "./form_input.component.html",
})
export class FormInputComponent {
  @Input() label = "Título";
  @Input() disabled = false;

  /** Tipo do input */
  @Input() type: 'default' | 'phone' | 'post-code' = 'default';

  /** Valor do input */
  @Input() model: string = '';

  /** Máscara do PrimeNG */
  get mask(): string | null {
    switch (this.type) {
      case 'phone':
        return '(99) 9 9999-9999';
      case 'post-code':
        return '99999-999';
      default:
        return null;
    }
  }

  /** Verifica se deve usar InputMask */
  get isMasked(): boolean {
    console.log(this.type === 'phone' || this.type === 'post-code');
    return this.type === 'phone' || this.type === 'post-code';
  }
}
