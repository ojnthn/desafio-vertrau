import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalDbService {

  private get storage(): Storage | null {
    return typeof window !== 'undefined'
      ? window.localStorage
      : null;
  }

  getAll<T>(key: string): T[] {
    const raw = this.storage?.getItem(key);
    return raw ? JSON.parse(raw) : [];
  }

  insert<T>(key: string, item: T) {
    const list = this.getAll<T>(key);
    list.push(item);
    this.storage?.setItem(key, JSON.stringify(list));
  }

  update<T extends { id: string }>(key: string, item: T) {
    const list = this.getAll<T>(key);
    const index = list.findIndex(i => i.id === item.id);

    if (index === -1) return;

    list[index] = item;
    this.storage?.setItem(key, JSON.stringify(list));
  }

  delete(key: string, id: string) {
    const list = this.getAll<any>(key)
      .filter((i: any) => i.id !== id);

    this.storage?.setItem(key, JSON.stringify(list));
  }
  
  findById<T extends { id: string }>(key: string, id: string): T | undefined {
    return this.getAll<T>(key).find(i => i.id === id);
  }

  clear(key: string) {
    this.storage?.removeItem(key);
  }
}
