import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../../../../../shared/molecules/card/card.component';
import { FormInputComponent } from '../../../../../../shared/molecules/form-input/form-input.component';
import { SelectComponent } from '../../../../../../shared/atoms/select/select.component';
import { UserNewStore } from '../../store/user-new.store';

@Component({
  selector: 'app-user-data-tab',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    FormInputComponent,
    SelectModule,
    ButtonModule,
    FloatLabelModule,
    SelectComponent,
    ReactiveFormsModule,
],
  templateUrl: './user-data-tab.component.html',
})
export class UserDataTabComponent {
  store = inject(UserNewStore);

  genderOptions = [
      { label: 'Masculino', value: 'M' },
      { label: 'Feminino', value: 'F' },
      { label: 'Outro', value: 'O' },
      { label: 'Prefiro não responder', value: 'N' },
    ];

  goNext() {
    if (this.store.canGoNext()) {
      window.dispatchEvent(new CustomEvent('user-new:next'));
    }
  }
}
