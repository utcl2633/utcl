import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  setItem(key: string, value: any): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.error('localStorage is not available.');
    }
  }

  getItem(key: string): any {
    if (typeof localStorage !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } else {
      console.error('localStorage is not available.');
      return null;
    }
  }

  removeItem(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    } else {
      console.error('localStorage is not available.');
    }
  }

  clear(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    } else {
      console.error('localStorage is not available.');
    }
  }
}
