import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CepResponseModel } from './cep.model';

@Injectable({ providedIn: 'root' })
export class CepService {
  constructor(private http: HttpClient) {}

  getCep(cep: string): Observable<CepResponseModel> {
    const normalizedCep = cep.replace(/\D/g, '');
    return this.http.get<CepResponseModel>(
      `https://viacep.com.br/ws/${normalizedCep}/json/`
    );
  }
}
