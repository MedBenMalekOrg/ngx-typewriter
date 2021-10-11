import {Component, Input, OnInit} from '@angular/core';
import {StyleService} from "./style.service";
import {TPW, TPWInterface} from "../models/TPW.model";
import {NgxTypewriterService} from "./ngx-typewriter.service";

@Component({
  selector: 'tp-writer',
  template: `
    <span [style.color]="tpw.color ? tpw.color : null" [innerHTML]="tpw.displayText"></span>
    <span class="marker">{{marker}}</span>
  `,
  styles: ['.marker { animation: 0.5s ease 0s infinite normal none running blink; } @keyframes blink {from {opacity: 0;} to {opacity: 1;}}']
})

export class NgxTypewriterComponent implements OnInit {

  @Input() public options!: TPWInterface;
  @Input() public selector = 'tpw';
  @Input() marker = '|';
  public tpw!: TPW;
  static styleService: StyleService;
  constructor(private tpWriterService: NgxTypewriterService, private styleService: StyleService) {
    NgxTypewriterComponent.styleService = this.styleService;
  }

  async ngOnInit() {
    this.tpw = this.tpWriterService.getTPW(this.selector, this.options);
    for (const className of Object.keys(this.tpw.classList)) {
      this.styleService.setStyles(`.${className}`, this.tpw.classList[className]);
    }
    await this.tpw.runDisplay();
  }

}
