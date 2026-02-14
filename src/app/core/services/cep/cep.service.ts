import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CepResponseModel {
    uf: string;
    logradouro: string;
    bairro: string;
    erro?: boolean;
}

@Injectable({ providedIn: 'root' })
export class CepService {
  constructor(private http: HttpClient) {}

  getData(cep: string): Observable<CepResponseModel> {
    const onlyDigits = cep.replace(/\D/g, '');
    return this.http.get<CepResponseModel>(`https://viacep.com.br/ws/${onlyDigits}/json/`);
  }
}