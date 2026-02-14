import { TestBed } from '@angular/core/testing';
import { LocalDbService } from './local-storage-db.service'

describe('LocalDbService', () => {
  let service: LocalDbService;
  const storageMock: Record<string, string> = {};

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => storageMock[key] ?? null,
        setItem: (key: string, value: string) => { storageMock[key] = value; },
        removeItem: (key: string) => { delete storageMock[key]; },
      },
      writable: true
    });

    TestBed.configureTestingModule({
      providers: [LocalDbService]
    });
    service = TestBed.inject(LocalDbService);
    Object.keys(storageMock).forEach(k => delete storageMock[k]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should insert and get all items', () => {
    service.insert<{id: string; name: string}>('users', { id: '1', name: 'John' });
    service.insert<{id: string; name: string}>('users', { id: '2', name: 'Jane' });

    const all = service.getAll<{id: string; name: string}>('users');
    expect(all.length).toBe(2);
    expect(all[0].name).toBe('John');
    expect(all[1].name).toBe('Jane');
  });

  it('should update existing item', () => {
    service.insert<{id: string; name: string}>('users', { id: '1', name: 'John' });
    service.update<{id: string; name: string}>('users', { id: '1', name: 'Johnny' });

    const updated = service.findById<{id: string; name: string}>('users', '1');
    expect(updated?.name).toBe('Johnny');
  });

  it('should not update non-existing item', () => {
    service.insert<{id: string; name: string}>('users', { id: '1', name: 'John' });
    service.update<{id: string; name: string}>('users', { id: '2', name: 'Jane' });

    const all = service.getAll<{id: string; name: string}>('users');
    expect(all.length).toBe(1);
    expect(all[0].name).toBe('John');
  });

  it('should delete item by id', () => {
    service.insert<{id: string; name: string}>('users', { id: '1', name: 'John' });
    service.insert<{id: string; name: string}>('users', { id: '2', name: 'Jane' });

    service.delete('users', '1');

    const all = service.getAll<{id: string; name: string}>('users');
    expect(all.length).toBe(1);
    expect(all[0].id).toBe('2');
  });

  it('should find item by id', () => {
    service.insert<{id: string; name: string}>('users', { id: '1', name: 'John' });
    const found = service.findById<{id: string; name: string}>('users', '1');
    expect(found?.name).toBe('John');
  });

  it('should clear items', () => {
    service.insert<{id: string; name: string}>('users', { id: '1', name: 'John' });
    service.clear('users');
    const all = service.getAll<{id: string; name: string}>('users');
    expect(all.length).toBe(0);
  });
});