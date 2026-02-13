import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Subject, takeUntil } from 'rxjs';
import { CepService } from '../../../../../core/services/cep/cep.service';



@Injectable()
export class UserNewStore {
  private destroy$ = new Subject<void>();

  form = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    gender: new FormControl('', { nonNullable: true, validators: [Validators.required] }),

    cep: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    state: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    street: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    neighborhood: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    number: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d+$/)],
    }),
    complement: new FormControl('', { nonNullable: true }),
  });

  get firstName() { return this.form.controls.firstName; }
  get lastName() { return this.form.controls.lastName; }
  get gender() { return this.form.controls.gender; }

  get cep() { return this.form.controls.cep; }
  get state() { return this.form.controls.state; }
  get street() { return this.form.controls.street; }
  get neighborhood() { return this.form.controls.neighborhood; }
  get number() { return this.form.controls.number; }
  get complement() { return this.form.controls.complement; }

  constructor(private cepService: CepService) {}

  initCepLookup(onInvalidCep?: () => void, onError?: () => void) {
    this.cep.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged(),
        filter((value) => value.replace(/\D/g, '').length === 8),
        switchMap((value) => this.cepService.getData(value))
      )
      .subscribe({
        next: (res) => {
          if (res.erro) {
            onInvalidCep?.();
            return;
          }
          this.state.setValue(res.uf ?? '');
          this.street.setValue(res.logradouro ?? '');
          this.neighborhood.setValue(res.bairro ?? '');
        },
        error: () => onError?.(),
      });
  }

  canGoNext(): boolean {
    this.firstName.markAsTouched();
    this.lastName.markAsTouched();
    this.gender.markAsTouched();
    return !(this.firstName.invalid || this.lastName.invalid || this.gender.invalid);
  }

  canSave(): boolean {
    this.cep.markAsTouched();
    this.state.markAsTouched();
    this.street.markAsTouched();
    this.neighborhood.markAsTouched();
    this.number.markAsTouched();

    return !(this.cep.invalid || this.state.invalid || this.street.invalid || this.neighborhood.invalid || this.number.invalid);
  }

  onlyDigitsForNumber(value: string) {
    const only = value.replace(/\D/g, '');
    if (only !== value) this.number.setValue(only);
  }

  getSummary() {
    return this.form.getRawValue();
  }

  destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
