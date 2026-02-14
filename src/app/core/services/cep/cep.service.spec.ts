import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CepService, CepResponseModel } from './cep.service';

describe('CepService', () => {
  let service: CepService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CepService]
    });

    service = TestBed.inject(CepService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the correct URL with only digits', () => {
    const cep = '12345-678';
    const mockResponse: CepResponseModel = {
      uf: 'SP',
      logradouro: 'Rua Teste',
      bairro: 'Bairro Teste'
    };

    service.getData(cep).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should propagate error', () => {
    const cep = '12345-678';

    service.getData(cep).subscribe({
        next: () => { throw new Error('Expected request to fail'); },
        error: (err) => {
        expect(err.status).toBe(500);
        }
    });

    const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});