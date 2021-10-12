import { Component } from '@angular/core';
  import {NgxTypewriterService, TPW, TPWInterface} from "ngx-typewriter";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public disableBtn = false;
  constructor(private typewriterService: NgxTypewriterService) {}

  public options: TPWInterface = {
    speed: 80,
    loop: true,
    delay: 200,
  }

  public options1: TPWInterface = {
    text: 'Welcome to ngx-typewriter demo',
  }

  public code1 = `  in component.ts
  public options: TPWInterface = {
      text: 'Welcome to ngx-typewriter demo',
  }
  ---------------------
  in component.html
  <tp-writer [options]=\"options\"></tp-writer>`;

  public options2: TPWInterface = {
    textList: ['List of phrases demo', 'another phrase'],
  }

  public code2 = `  in component.ts
  public options: TPWInterface = {
    textList: ['List of phrases demo', 'another phrase'],
  }
  ---------------------
  in component.html
  <tp-writer [options]=\"options\"></tp-writer>`;

  public options3: TPWInterface = {
    textList: ['List of phrases demo with loop', 'another phrase with loop', 'the speed now is 30ms'],
    speed: 30,
    loop: true
  }

  public code3 = `  in component.ts
  public options: TPWInterface = {
    textList: ['List of phrases demo with loop', 'another phrase with loop', 'the speed now is 30ms'],
    speed: 30,
    loop: true
  }
  ---------------------
  in component.html
  <tp-writer [options]=\"options\"></tp-writer>`;

  public options4: TPWInterface = {
    textList: ['List of phrases with #tpw-key(style, color:red, font-weight:bold)#', 'another phrase with #tpw-key(small text, font-size:10px)#',],
    loop: true,
  }

  public code4 = `  in component.ts
  public options: TPWInterface = {
    textList: ['List of phrases with #tpw-key(style, color:red, font-weight:bold)#', 'another phrase with #tpw-key(small text, font-size:10px)#',],
    loop: true,
  }
  ---------------------
  in component.html
  <tp-writer [options]=\"options\"></tp-writer>`;

  public options5: TPWInterface = {
    textList: ['List of phrases with #tpw-key(css class, class:my-class-1)#', 'another phrase with #tpw-key(blue text, class:my-class-2)#',],
    loop: true,
    classList: {
      'my-class-1': {
        'color': 'red',
        'font-weight': 'bold'
      },
      'my-class-2': {
        'color': 'blue'
      }
    }
  }

  public code5 = `  in component.ts
  public options: TPWInterface = {
    textList: ['List of phrases with #tpw-key(css class, class:my-class-1)#', 'another phrase with #tpw-key(blue text, class:my-class-2)#',],
    loop: true,
    classList: {
      'my-class-1': {
        'color': 'red',
        'font-weight': 'bold'
      },
      'my-class-2': {
        'color': 'blue'
      }
    }
  }
  ---------------------
  in component.html
  <tp-writer [options]=\"options\"></tp-writer>`;

  public options6: TPWInterface = {
    text: 'you can another text'
  }

  public code6 = `  in component.ts
  import {NgxTypewriterService, TPW, TPWInterface} from "ngx-typewriter";

  export class AppComponent {
    public disableBtn = false;
    public options: TPWInterface = {
       text: 'you can another text'
    }
    constructor(private typewriterService: NgxTypewriterService) {}

    async addText() {
      const tpw: TPW = this.typewriterService.getTPW('tpw');
      this.disableBtn = true;
      tpw.speed = 200;
      await tpw.addText('adding another text');
      this.disableBtn = false;
    }
  }
  ---------------------
  in component.html
  <button class="btn black ml" (click)="addText()" [disabled]="disableBtn">add text</button>
  <tp-writer [selector]="'twp'" [options]=\"options\"></tp-writer>`;

  async addText() {
    const tpw: TPW = this.typewriterService.getTPW('tpw');
    this.disableBtn = true;
    tpw.speed = 200;
    await tpw.addText('adding another text');
    tpw.loop = true;
    this.disableBtn = false;
  }

}
