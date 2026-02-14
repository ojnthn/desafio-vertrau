import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CardComponent } from '../../../../../../shared/molecules/card/card.component';
import { FormInputComponent } from '../../../../../../shared/molecules/form-input/form-input.component';
import { ButtonComponent } from '../../../../../../shared/atoms/button/button.component';
import { UserNewStore } from '../../store/user-new.store';


@Component({
  selector: 'app-user-address-tab',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    FormInputComponent,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    ButtonComponent
  ],
  templateUrl: './user-address-tab.component.html',
})
export class UserAddressTabComponent {
  store = inject(UserNewStore);

  goBack() {
    window.dispatchEvent(new CustomEvent('user-new:back'));
  }

  save() {
    if (this.store.canSave()) {
      window.dispatchEvent(new CustomEvent('user-new:save'));
    }
  }

  get isLoading(): boolean {
    return this.store.isLoading;
  }
}
