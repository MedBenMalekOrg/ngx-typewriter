# ngx-typewriter
![enter image description here](https://raw.githubusercontent.com/MedBenMalek/ngx-typewriter/main/images/tpw.gif)

A small angular library for typewriter effect with styling.

## [**DEMO**](https://medbenmalek.github.io/ngx-typewriter/)


## Installation

    npm i ngx-typewriter 


## Setup

    import {NgxTypewriterModule} from "ngx-typewriter";  
      
    @NgModule({  
    declarations: [ ... ],  
    imports: [  ...,  
    NgxTypewriterModule  
    ],  
    providers: [],  
    bootstrap: []  
    })  
    export class MyModule { }  

## Usage

1. You have to add **tp-writer** component with the **options** and the **selector**.

       <tp-writer [selector]="'twp'" [options]="options"></tp-writer>
       ---
       NOTE: If selector is not provided the default selector will be 'tpw', if you are planning to add multiple tpwriter components you have to provide the selector to differentiate. 

2. Define the options

   	public options: TPWInterface = { 
   		textList: ['ngx-typewriter'], 
   		speed: 80,    
   		loop: true,    
   		delay: 200,  
   	}

3. If you want to make changes (like adding text, change speed, activate/deactivate looping...) you have to call **NgxTypewriterService** in the constructor then get the **TPW** instance by the **selector**.


		import {NgxTypewriterService, TPW, TPWInterface} from "ngx-typewriter";

		export class MyComponent {

			public options: TPWInterface = { 
				 textList: ['ngx-typewriter'], 
				 speed: 80,    
		        loop: true,    
		        delay: 200,  
			}
			constructor(private typewriterService: NgxTypewriterService) {}
		
			addText() {  
			  const tpw: TPW = this.typewriterService.getTPW('tpw');  
			  tpw.speed = 200;  
			  await tpw.addText('adding another text');  
			}
		}


## Component Properties

|Property|Type|Default|Description
|--|--|--|--|
|options|`TPWInterface`|`undefined`|List of options of the typewiter effect|
|selector|`string`|`'tpw'`|The selector is a unique identifier useful in case of the existing of multiple typewriting components|
|marker|`string`|`'\|'`|The marker displayed next the words|


## Options

List of properties in the options object

|Property|Type|Default|Description
|--|--|--|--|
|textList|`string[]`|`[]`|List text to be displayed|
|speed|`string`|`70`|Speed of writing|
|loop|`boolean`|`false`|Set to `true` f you want to shoe the effect if loop|
|delay|`number`|`1000`|Delay between phrases|
|classList|`{[className: string]: {[cssProperty: string]: string}}`|`{}`|List of CSS classes to be set in the text with `#tpw-key(word, class:class-name)#`|

# Functions

Call TPW instance

    constructor(private typewriterService: NgxTypewriterService) {}
    const tpw: TPW = this.typewriterService.getTPW('tpw');  
Add text

    await tpw.addText('adding another text');  
Add css class

    const slyle = {  
      'color': 'red',  
      'font-weight': 'bold'  
    }  
    tpw.addClass('my-class', slyle)

# Update options properties

You have the call TPW instance eith the selector then you will have access to the properties.

Example: Update the loop to true

    const tpw: TPW = this.typewriterService.getTPW('tpw');  
    tpw.loop = true;

# Styling

To style words in the text you have to use a **special syntax** in the text which id pretty easy to use, all you have to do is to add `#tpw-key(text, ...styles)#` (exemple `#tpw-key(text, color:red, font-weight:bold)#`), this "function" should have the **text as the first parameter** then you can add the list of styles or classes.

**Using CSS classes**: you only have to set the class name with the key class `#tpw-key(text, class:my-class)#`
