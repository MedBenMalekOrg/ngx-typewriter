import {NgxTypewriterComponent} from "../lib/ngx-typewriter.component";

export interface TPWInterface {
  textList?: string[];
  text?: string,
  speed?: number;
  color?: string | null;
  selector?: string | null;
  loop?: boolean | null;
  delay?: number;
  classList?: ObjectInterface<ObjectInterface<string, 'key'>, 'className'>;
}

export class TPW implements TPWInterface {
  private _color: string | null = null;
  private _text: string = '';
  private _selector: string | null = null;
  private _speed = 70;
  private _textList: string[] = [];
  private _loop = false;
  private _delay = 1000;
  private _classList: ObjectInterface<ObjectInterface<string, 'key'>, 'className'> = {};
  public displayText: string = '';

  constructor(params: TPWInterface) {
    if (!params) {
      return this;
    }
    for (const key of Object.keys(params)) {
      const propDescriptor = Object.getOwnPropertyDescriptor(this, `_${key}`);
      if (propDescriptor !== undefined && propDescriptor.writable) {
        try {
          // @ts-ignore
          this[key] = params[key];
        } catch (e) {
          if (!(e instanceof TypeError)) {
            throw e;
          }
        }
      }
    }
    if (this.textList.length === 0) {
      this.textList.push(this.text);
    } else {
      if (!this.text) {
        this.text = this.textList[this.textList.length-1];
      }
    }
  }


  get color(): string | null {
    return this._color;
  }

  set color(value: string | null) {
    this._color = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get selector(): string | null {
    return this._selector;
  }

  set selector(value: string | null) {
    this._selector = value;
  }

  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
  }

  get textList(): string[] {
    return this._textList;
  }

  set textList(value: string[]) {
    this._textList = value;
  }

  get loop(): boolean {
    return this._loop;
  }

  set loop(value: boolean) {
    this._loop = value;
  }
  get delay(): number {
    return this._delay;
  }

  set delay(value: number) {
    this._delay = value;
  }

  get classList(): ObjectInterface<ObjectInterface<string, "key">, "className"> {
    return this._classList;
  }

  set classList(value: ObjectInterface<ObjectInterface<string, "key">, "className">) {
    this._classList = value;
  }

  addClass(className: string, style: ObjectInterface<string, "key">) {
    this.classList[className] = style;
    NgxTypewriterComponent.styleService.setStyles(`.${className}`, style);
  }

  async addText(text: string, current = true) {
    this.textList.push(text);
    if (current) this.text = text;
    await this.loopThroughText(text);
  }

  async runDisplay() {
    this. displayText = '';
    await this.loopThroughTextList()
  }

  private static camelCase (text: string) {
    return text.replace( /-([a-z])/ig, function( all, letter ) {
      return letter.toUpperCase();
    });
  }

  private static makeClass(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  private replaceText(text: string, replace: string) {
    const index = this.textList.indexOf(text);
    this.textList[index] = replace;
    if (this.text === text) {
      this.text = text;
    }
  }

  private async loopThroughText(text: string, index = 0) {
    if (index < text.length) {
      if (text[index] === '#' && text.substr(index, 8) === '#tpw-key') {
        const style: ObjectInterface<string, 'key'> = {};
        const classList: string[] = [];
        const regex = /#tpw-key\((.*?)\)#/
        const input = regex.exec(text);
        if (input) {
          const list = input[1].split(',');
          for (let current = 1; current < list.length; current++) {
            const params = list[current].split(':');
            if (params.length !== 2) {
              break;
            } else {
              if (TPW.camelCase(params[0].trim()) in ListCSSProperties) {
                style[params[0].trim()] = params[1].trim();
              } else if (params[0].trim() === 'class') {
                classList.push(params[1].trim());
              }
            }
          }
          const className = TPW.makeClass(5);
          classList.push(className);
          this.replaceText(text, text.replace(input[0], `<span class="${classList.join(' ')}">${list[0]}</span>`));
          text = text.replace(input[0], `<span class="${classList.join(' ')}">${list[0]}</span>`);
          index += `<span class="${classList.join(' ')}">`.length;
          if (Object.keys(style).length > 0) {
            NgxTypewriterComponent.styleService.setStyles(`.${className}`, style);
          }
        }
      }
      if (text[index] === '<' && text.substr(index, 7) === '</span>') {
        index += 7;
      }
      if (text[index] === '<' && text.substr(index, 12) === '<span class=') {
        const regex1 = /<span(.*?)>/
        const input = regex1.exec(text);
        if (input) index += input[0].length;
      }
      this.displayText = text.substr(0, index + 1);
      index += 1;
      await this.Timeout();
      await this.loopThroughText(text, index)
    }
  }

  private async loopThroughTextList(index = 0) {
    if (index < this.textList.length) {
      await this.loopThroughText(this.textList[index])
      index += 1;
      await this.Timeout(this.delay);
      await this.loopThroughTextList(index)
    } else {
      if (this.loop) {
        await this.runDisplay();
      }
    }
  }

  private Timeout(time?: number) {
    return new Promise(resolve => setTimeout(resolve, time ? time : this.speed));
  }

}

export interface ObjectInterface<T = any, Id = 'id'> {
  [Id: string]: T;
}

const ListCSSProperties = {
  alignContent: null,
  alignItems: null,
  alignSelf: null,
  alignmentBaseline: null,
  all: null,
  animation: null,
  animationDelay: null,
  animationDirection: null,
  animationDuration: null,
  animationFillMode: null,
  animationIterationCount: null,
  animationName: null,
  animationPlayState: null,
  animationTimingFunction: null,
  backfaceVisibility: null,
  background: null,
  backgroundAttachment: null,
  backgroundClip: null,
  backgroundColor: null,
  backgroundImage: null,
  backgroundOrigin: null,
  backgroundPosition: null,
  backgroundPositionX: null,
  backgroundPositionY: null,
  backgroundRepeat: null,
  backgroundSize: null,
  baselineShift: null,
  blockSize: null,
  border: null,
  borderBlockEnd: null,
  borderBlockEndColor: null,
  borderBlockEndStyle: null,
  borderBlockEndWidth: null,
  borderBlockStart: null,
  borderBlockStartColor: null,
  borderBlockStartStyle: null,
  borderBlockStartWidth: null,
  borderBottom: null,
  borderBottomColor: null,
  borderBottomLeftRadius: null,
  borderBottomRightRadius: null,
  borderBottomStyle: null,
  borderBottomWidth: null,
  borderCollapse: null,
  borderColor: null,
  borderImage: null,
  borderImageOutset: null,
  borderImageRepeat: null,
  borderImageSlice: null,
  borderImageSource: null,
  borderImageWidth: null,
  borderInlineEnd: null,
  borderInlineEndColor: null,
  borderInlineEndStyle: null,
  borderInlineEndWidth: null,
  borderInlineStart: null,
  borderInlineStartColor: null,
  borderInlineStartStyle: null,
  borderInlineStartWidth: null,
  borderLeft: null,
  borderLeftColor: null,
  borderLeftStyle: null,
  borderLeftWidth: null,
  borderRadius: null,
  borderRight: null,
  borderRightColor: null,
  borderRightStyle: null,
  borderRightWidth: null,
  borderSpacing: null,
  borderStyle: null,
  borderTop: null,
  borderTopColor: null,
  borderTopLeftRadius: null,
  borderTopRightRadius: null,
  borderTopStyle: null,
  borderTopWidth: null,
  borderWidth: null,
  bottom: null,
  boxShadow: null,
  boxSizing: null,
  breakAfter: null,
  breakBefore: null,
  breakInside: null,
  captionSide: null,
  caretColor: null,
  clear: null,
  clip: null,
  clipPath: null,
  clipRule: null,
  color: null,
  colorInterpolation: null,
  colorInterpolationFilters: null,
  columnCount: null,
  columnFill: null,
  columnGap: null,
  columnRule: null,
  columnRuleColor: null,
  columnRuleStyle: null,
  columnRuleWidth: null,
  columnSpan: null,
  columnWidth: null,
  columns: null,
  content: null,
  counterIncrement: null,
  counterReset: null,
  cssFloat: null,
  cssText: null,
  cursor: null,
  direction: null,
  display: null,
  dominantBaseline: null,
  emptyCells: null,
  fill: null,
  fillOpacity: null,
  fillRule: null,
  filter: null,
  flex: null,
  flexBasis: null,
  flexDirection: null,
  flexFlow: null,
  flexGrow: null,
  flexShrink: null,
  flexWrap: null,
  float: null,
  floodColor: null,
  floodOpacity: null,
  font: null,
  fontFamily: null,
  fontFeatureSettings: null,
  fontKerning: null,
  fontSize: null,
  fontSizeAdjust: null,
  fontStretch: null,
  fontStyle: null,
  fontSynthesis: null,
  fontVariant: null,
  fontVariantCaps: null,
  fontVariantEastAsian: null,
  fontVariantLigatures: null,
  fontVariantNumeric: null,
  fontVariantPosition: null,
  fontWeight: null,
  gap: null,
  glyphOrientationVertical: null,
  grid: null,
  gridArea: null,
  gridAutoColumns: null,
  gridAutoFlow: null,
  gridAutoRows: null,
  gridColumn: null,
  gridColumnEnd: null,
  gridColumnGap: null,
  gridColumnStart: null,
  gridGap: null,
  gridRow: null,
  gridRowEnd: null,
  gridRowGap: null,
  gridRowStart: null,
  gridTemplate: null,
  gridTemplateAreas: null,
  gridTemplateColumns: null,
  gridTemplateRows: null,
  height: null,
  hyphens: null,
  imageOrientation: null,
  imageRendering: null,
  inlineSize: null,
  justifyContent: null,
  justifyItems: null,
  justifySelf: null,
  left: null,
  readonly: null,
  letterSpacing: null,
  lightingColor: null,
  lineBreak: null,
  lineHeight: null,
  listStyle: null,
  listStyleImage: null,
  listStylePosition: null,
  listStyleType: null,
  margin: null,
  marginBlockEnd: null,
  marginBlockStart: null,
  marginBottom: null,
  marginInlineEnd: null,
  marginInlineStart: null,
  marginLeft: null,
  marginRight: null,
  marginTop: null,
  marker: null,
  markerEnd: null,
  markerMid: null,
  markerStart: null,
  mask: null,
  maskComposite: null,
  maskImage: null,
  maskPosition: null,
  maskRepeat: null,
  maskSize: null,
  maskType: null,
  maxBlockSize: null,
  maxHeight: null,
  maxInlineSize: null,
  maxWidth: null,
  minBlockSize: null,
  minHeight: null,
  minInlineSize: null,
  minWidth: null,
  objectFit: null,
  objectPosition: null,
  opacity: null,
  order: null,
  orphans: null,
  outline: null,
  outlineColor: null,
  outlineOffset: null,
  outlineStyle: null,
  outlineWidth: null,
  overflow: null,
  overflowAnchor: null,
  overflowWrap: null,
  overflowX: null,
  overflowY: null,
  overscrollBehavior: null,
  overscrollBehaviorBlock: null,
  overscrollBehaviorInline: null,
  overscrollBehaviorX: null,
  overscrollBehaviorY: null,
  padding: null,
  paddingBlockEnd: null,
  paddingBlockStart: null,
  paddingBottom: null,
  paddingInlineEnd: null,
  paddingInlineStart: null,
  paddingLeft: null,
  paddingRight: null,
  paddingTop: null,
  pageBreakAfter: null,
  pageBreakBefore: null,
  pageBreakInside: null,
  paintOrder: null,
  perspective: null,
  perspectiveOrigin: null,
  placeContent: null,
  placeItems: null,
  placeSelf: null,
  pointerEvents: null,
  position: null,
  quotes: null,
  resize: null,
  right: null,
  rotate: null,
  rowGap: null,
  rubyAlign: null,
  rubyPosition: null,
  scale: null,
  scrollBehavior: null,
  shapeRendering: null,
  stopColor: null,
  stopOpacity: null,
  stroke: null,
  strokeDasharray: null,
  strokeDashoffset: null,
  strokeLinecap: null,
  strokeLinejoin: null,
  strokeMiterlimit: null,
  strokeOpacity: null,
  strokeWidth: null,
  tabSize: null,
  tableLayout: null,
  textAlign: null,
  textAlignLast: null,
  textAnchor: null,
  textCombineUpright: null,
  textDecoration: null,
  textDecorationColor: null,
  textDecorationLine: null,
  textDecorationStyle: null,
  textEmphasis: null,
  textEmphasisColor: null,
  textEmphasisPosition: null,
  textEmphasisStyle: null,
  textIndent: null,
  textJustify: null,
  textOrientation: null,
  textOverflow: null,
  textRendering: null,
  textShadow: null,
  textTransform: null,
  textUnderlinePosition: null,
  top: null,
  touchAction: null,
  transform: null,
  transformBox: null,
  transformOrigin: null,
  transformStyle: null,
  transition: null,
  transitionDelay: null,
  transitionDuration: null,
  transitionProperty: null,
  transitionTimingFunction: null,
  translate: null,
  unicodeBidi: null,
  userSelect: null,
  verticalAlign: null,
  visibility: null,
  /** @deprecated */
  webkitAlignContent: null,
  /** @deprecated */
  webkitAlignItems: null,
  /** @deprecated */
  webkitAlignSelf: null,
  /** @deprecated */
  webkitAnimation: null,
  /** @deprecated */
  webkitAnimationDelay: null,
  /** @deprecated */
  webkitAnimationDirection: null,
  /** @deprecated */
  webkitAnimationDuration: null,
  /** @deprecated */
  webkitAnimationFillMode: null,
  /** @deprecated */
  webkitAnimationIterationCount: null,
  /** @deprecated */
  webkitAnimationName: null,
  /** @deprecated */
  webkitAnimationPlayState: null,
  /** @deprecated */
  webkitAnimationTimingFunction: null,
  /** @deprecated */
  webkitAppearance: null,
  /** @deprecated */
  webkitBackfaceVisibility: null,
  /** @deprecated */
  webkitBackgroundClip: null,
  /** @deprecated */
  webkitBackgroundOrigin: null,
  /** @deprecated */
  webkitBackgroundSize: null,
  /** @deprecated */
  webkitBorderBottomLeftRadius: null,
  /** @deprecated */
  webkitBorderBottomRightRadius: null,
  /** @deprecated */
  webkitBorderRadius: null,
  /** @deprecated */
  webkitBorderTopLeftRadius: null,
  /** @deprecated */
  webkitBorderTopRightRadius: null,
  /** @deprecated */
  webkitBoxAlign: null,
  /** @deprecated */
  webkitBoxFlex: null,
  /** @deprecated */
  webkitBoxOrdinalGroup: null,
  /** @deprecated */
  webkitBoxOrient: null,
  /** @deprecated */
  webkitBoxPack: null,
  /** @deprecated */
  webkitBoxShadow: null,
  /** @deprecated */
  webkitBoxSizing: null,
  /** @deprecated */
  webkitFilter: null,
  /** @deprecated */
  webkitFlex: null,
  /** @deprecated */
  webkitFlexBasis: null,
  /** @deprecated */
  webkitFlexDirection: null,
  /** @deprecated */
  webkitFlexFlow: null,
  /** @deprecated */
  webkitFlexGrow: null,
  /** @deprecated */
  webkitFlexShrink: null,
  /** @deprecated */
  webkitFlexWrap: null,
  /** @deprecated */
  webkitJustifyContent: null,
  webkitLineClamp: null,
  /** @deprecated */
  webkitMask: null,
  /** @deprecated */
  webkitMaskBoxImage: null,
  /** @deprecated */
  webkitMaskBoxImageOutset: null,
  /** @deprecated */
  webkitMaskBoxImageRepeat: null,
  /** @deprecated */
  webkitMaskBoxImageSlice: null,
  /** @deprecated */
  webkitMaskBoxImageSource: null,
  /** @deprecated */
  webkitMaskBoxImageWidth: null,
  /** @deprecated */
  webkitMaskClip: null,
  /** @deprecated */
  webkitMaskComposite: null,
  /** @deprecated */
  webkitMaskImage: null,
  /** @deprecated */
  webkitMaskOrigin: null,
  /** @deprecated */
  webkitMaskPosition: null,
  /** @deprecated */
  webkitMaskRepeat: null,
  /** @deprecated */
  webkitMaskSize: null,
  /** @deprecated */
  webkitOrder: null,
  /** @deprecated */
  webkitPerspective: null,
  /** @deprecated */
  webkitPerspectiveOrigin: null,
  webkitTapHighlightColor: null,
  /** @deprecated */
  webkitTextFillColor: null,
  /** @deprecated */
  webkitTextSizeAdjust: null,
  /** @deprecated */
  webkitTextStroke: null,
  /** @deprecated */
  webkitTextStrokeColor: null,
  /** @deprecated */
  webkitTextStrokeWidth: null,
  /** @deprecated */
  webkitTransform: null,
  /** @deprecated */
  webkitTransformOrigin: null,
  /** @deprecated */
  webkitTransformStyle: null,
  /** @deprecated */
  webkitTransition: null,
  /** @deprecated */
  webkitTransitionDelay: null,
  /** @deprecated */
  webkitTransitionDuration: null,
  /** @deprecated */
  webkitTransitionProperty: null,
  /** @deprecated */
  webkitTransitionTimingFunction: null,
  /** @deprecated */
  webkitUserSelect: null,
  whiteSpace: null,
  widows: null,
  width: null,
  willChange: null,
  wordBreak: null,
  wordSpacing: null,
  wordWrap: null,
  writingMode: null,
  zIndex: null,
  /** @deprecated */
  zoom: null,
}
