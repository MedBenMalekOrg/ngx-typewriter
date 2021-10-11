import { Injectable } from '@angular/core';
import {ObjectInterface, TPW, TPWInterface} from "../models/TPW.model";

@Injectable({
  providedIn: 'root'
})
export class NgxTypewriterService {
  private list: ObjectInterface<TPW, 'selector'> = {};
  constructor() { }
  getTPW(selector: string, options?: TPWInterface) {
    if (!this.list.hasOwnProperty(selector) && options) {
      this.list[selector] = new TPW(options);
    }
    return this.list[selector] || null;
  }
}
