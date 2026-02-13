import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CepService } from './cep.service';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CepFacade {
  constructor(private cepService: CepService) {}

  bindCepLookup(
    form: FormGroup,
    cepControlName: string
  ): void {
    const cepControl = form.get(cepControlName);

    if (!cepControl) return;

    cepControl.valueChanges
      .pipe(
        filter((value: string) => value?.replace(/\D/g, '').length === 8)
      )
      .subscribe((cep) => {
        this.lookupCep(form, cep);
      });
  }

  private lookupCep(form: FormGroup, cep: string): void {
    this.cepService.getData(cep).subscribe({
      next: (data) => {
        form.patchValue({
          street: data.logradouro,
          neighborhood: data.bairro,
          state: data.uf
        });
      },
      error: () => {
        form.get('cep')?.setErrors({ invalidCep: true });
      },
    });
  }
}
