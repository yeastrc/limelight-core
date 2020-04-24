/**
 * spinner.js
 * 
 * Code that uses Spinner Library code
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

import { Spinner } from 'libs/spinner/spin.min.js';


var SPINNER_OPTIONS = {
		  lines: 13, // The number of lines to draw
		  length: 20, // The length of each line
		  width: 10, // The line thickness
		  radius: 30, // The radius of the inner circle
		  corners: 1, // Corner roundness (0..1)
		  rotate: 0, // The rotation offset
		  direction: 1, // 1: clockwise, -1: counterclockwise
		  color: '#000', // #rgb or #rrggbb or array of colors
		  speed: 1, // Rounds per second
		  trail: 60, // Afterglow percentage
		  shadow: false, // Whether to render a shadow
		  hwaccel: false, // Whether to use hardware acceleration
		  className: 'spinner', // The CSS class to assign to the spinner
		  zIndex: 2e9, // The z-index (defaults to 2000000000)
		  top: 'auto', // Top position relative to parent in px
		  left: 'auto' // Left position relative to parent in px
		};

/**
 * Static Single Instance of Spinner
 *
 * Set to Instance of Spinner in createSpinner() and reset to undefined in destroySpinner() after calling loadingSpinner.stop();
 */
var loadingSpinner;


/**
 *
 */
const createSpinner = function () {

	var $spinnerContainer = $( "div#main_spinner_block" );

	$spinnerContainer.show();

	var $spinnerDiv = $("div#main_spinner_block");
	if ( $spinnerDiv.length === 0 ) {
		throw Error("In createSpinner: No DOM element found for selector 'div#main_spinner_block'");
	}
	if ( $spinnerDiv.length > 1 ) {
		throw Error("In createSpinner: > 1 DOM elements found for selector 'div#main_spinner_block'");
	}
	var spinnerDiv = $spinnerDiv.get( 0 );

	const spinnerObj = new Spinner( SPINNER_OPTIONS );

	loadingSpinner = spinnerObj.spin( spinnerDiv );

	return loadingSpinner;
};

/**
 *
 */
 const destroySpinner = function() {
	
	if ( loadingSpinner ) {
		loadingSpinner.stop();
	}
	
	loadingSpinner = undefined;

	var $spinnerContainer = $("div#main_spinner_block");

	$spinnerContainer.hide();

};

/**
 *
 */
const incrementSpinner = function() {
	if( !loadingSpinner || !loadingSpinner.numSpinners ) {
		createSpinner();
		loadingSpinner.numSpinners = 1;
	} else {
		loadingSpinner.numSpinners += 1;
	}	
};

/**
 *
 */
const decrementSpinner = function() {
	if ( ! loadingSpinner ) { return; }
	var numSpinners = loadingSpinner.numSpinners;
	if( !numSpinners ) { return; }
	
	numSpinners--;
	
	if( !numSpinners ) {
		destroySpinner();
	}
	if( numSpinners ) {
		loadingSpinner.numSpinners = numSpinners;
	}
};

////////

const constructorCheckSpinnerManagerClass_CONST = "dfauioyewnvmzhifaqh";

/**
 *  Create Instance of SpinnerManagerClass
 */
const create_SpinnerManagerClass_Limelight = function({ dom_DivElementToInsertInto } : { dom_DivElementToInsertInto : HTMLDivElement }) : SpinnerManagerClass_Limelight {

	if ( ! dom_DivElementToInsertInto ) {
		const msg = "create_SpinnerManagerClass: No value for dom_DivElementToInsertInto"
		console.warn( msg )
		throw Error( msg )
	}
	const spinnerManagerClass = new SpinnerManagerClass_Limelight({ dom_DivElementToInsertInto, constructorCheckSpinnerManagerClass : constructorCheckSpinnerManagerClass_CONST });
	return spinnerManagerClass;
}

/**
 * !!!!  Only create using create_SpinnerManagerClass(...) function
 *
 * Class based Spinner Instance Manager
 */
class SpinnerManagerClass_Limelight {

	private readonly _dom_DivElementToInsertInto : HTMLDivElement
	private _spinnerInstance : any

	constructor({ dom_DivElementToInsertInto, constructorCheckSpinnerManagerClass } : {
		dom_DivElementToInsertInto : HTMLDivElement
		constructorCheckSpinnerManagerClass : string
	}) {
		if ( constructorCheckSpinnerManagerClass !== constructorCheckSpinnerManagerClass_CONST ) {
			const msg = "SpinnerManagerClass: constructor: constructorCheckSpinnerManagerClass !== constructorCheckSpinnerManagerClass_CONST"
			console.warn( msg )
			throw Error( msg )
		}
		this._dom_DivElementToInsertInto = dom_DivElementToInsertInto
	}

	/**
	 *
	 */
	createSpinner() {

		if ( this._spinnerInstance ) {
			const msg = "SpinnerManagerClass: createSpinner: createSpinner() already called. this._spinnerInstance already assigned"
			console.warn( msg )
			throw Error( msg )
		}

		const spinnerObj = new Spinner( SPINNER_OPTIONS );

		this._spinnerInstance = spinnerObj.spin( this._dom_DivElementToInsertInto );

		return loadingSpinner;
	};

	/**
	 *
	 */
	destroySpinner() {

		if ( this._spinnerInstance ) {
			this._spinnerInstance.stop();
		}

		this._spinnerInstance = undefined;
	};

}



export { createSpinner, destroySpinner, incrementSpinner, decrementSpinner, create_SpinnerManagerClass_Limelight, SpinnerManagerClass_Limelight } // export something for import to get onto page
