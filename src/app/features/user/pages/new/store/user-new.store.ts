import { inject, Inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Subject, takeUntil } from 'rxjs';
import { CepService } from '../../../../../core/services/cep/cep.service';
import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories/user-new.repository';
import { Router } from '@angular/router';



@Injectable()
export class UserNewStore {
  private destroy$ = new Subject<void>();
  private _saved = signal(false);
  private _isLoading = signal(false);
  private _message = signal<string | null>(null);
  private _error = signal<string | null>(null);

  private router = inject(Router);

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
  
  get isLoading() { return this._isLoading(); }
  get message() { return this._message(); }
  get error() { return this._error(); }
  get saved() { return this._saved(); }

  constructor(
    private cepService: CepService, 
    @Inject(USER_REPOSITORY) 
    private repository: UserRepository
  ) {}

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

  save(): void {
    if (!this.canSave()) {
      this._error.set('Preencha todos os campos obrigatórios.');
      return;
    }

    this._error.set(null);
    this._message.set(null);
    this._isLoading.set(true);

    setTimeout(() => {
      try {
        const rawValue = this.form.getRawValue();
        const entity = {
          firstName: rawValue.firstName,
          lastName: rawValue.lastName,
          gender: rawValue.gender,
          address: {
            cep: rawValue.cep,
            state: rawValue.state,
            street: rawValue.street,
            neighborhood: rawValue.neighborhood,
            number: rawValue.number,
            complement: rawValue.complement,
          }
        }

        this.repository.save(entity);

        this._message.set('Usuário salvo com sucesso!');
        this.form.reset();
      } catch (e) {
        this._error.set('Erro ao salvar usuário.');
      } finally {
        this._isLoading.set(false);
        this._saved.set(true);
      }
    }, 2000);
  }


  destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
