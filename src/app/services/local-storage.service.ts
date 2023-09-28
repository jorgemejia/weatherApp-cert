import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItemArray(key: string, value: number[]) {
    const query = localStorage.getItem(key);
    const items = query? JSON.parse(query): [];
    items.push(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItemArray(key: string): []  {
    const query = localStorage.getItem(key);
    const result = query? JSON.parse(query) : [];
    return result;
  }

  deleteItemFromArray(key: string, value: number){
    const query = localStorage.getItem(key);
    const items = query? JSON.parse(query): [];
    const indexOfItem = items.indexOf(value);
    indexOfItem > -1 ? items.splice(indexOfItem, 1) : console.log('Item not found');
  }

  deleteItem(key: string, index: number){
    const query = localStorage.getItem(key);
    const items = query? JSON.parse(query): [];
    console.log('Delete', items, index);
    items.length >= 0? items.splice(index, 1) : console.log('Item not found');
    localStorage.setItem(key, JSON.stringify(items));
  }

}
