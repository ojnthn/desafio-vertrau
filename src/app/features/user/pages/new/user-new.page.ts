import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsComponent, TabItem } from '../../../../shared/organisms/tabs/tabs.component';

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { UserNewStore } from './store/user-new.store';
import { UserDataTabComponent } from './components/user-data-tab/user-data-tab.component';
import { UserAddressTabComponent } from './components/user-address-tab/user-address-tab.component';

@Component({
  selector: 'app-usuario-novo-page',
  standalone: true,
  imports: [CommonModule, TabsComponent, DialogModule, ToastModule],
  providers: [UserNewStore, MessageService],
  templateUrl: './user-new.page.html',
})
export class UserNewPage implements OnInit, OnDestroy {
  activeIndex = 0;

  showSummary = false;
  summaryData: any = null;

  tabs: TabItem[] = [
    { value: '0', label: 'Dados do usuário', component: UserDataTabComponent },
    { value: '1', label: 'Endereço', component: UserAddressTabComponent },
  ];

  constructor(public store: UserNewStore, private msg: MessageService) {}

  ngOnInit(): void {
    this.store.initCepLookup(
      () => this.msg.add({ severity: 'warn', summary: 'CEP inválido', detail: 'CEP não encontrado.', life: 2500 }),
      () => this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao consultar CEP.', life: 2500 }),
    );

    window.addEventListener('user-new:next', this.onNext);
    window.addEventListener('user-new:back', this.onBack);
    window.addEventListener('user-new:save', this.onSave);
  }

  ngOnDestroy(): void {
    window.removeEventListener('user-new:next', this.onNext);
    window.removeEventListener('user-new:back', this.onBack);
    window.removeEventListener('user-new:save', this.onSave);
    this.store.destroy();
  }

  onNext = () => {
    this.activeIndex = 1;
  };

  onBack = () => {
    this.activeIndex = 0;
  };

  onSave = () => {
    this.summaryData = this.store.getSummary();
    this.showSummary = true;
  };
}
