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


var loadingSpinner;

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

 const destroySpinner = function() {
	
	if ( loadingSpinner ) {
		loadingSpinner.stop();
	}
	
	loadingSpinner = undefined;

	var $spinnerContainer = $("div#main_spinner_block");

	$spinnerContainer.hide();

};

const incrementSpinner = function() {
	if( !loadingSpinner || !loadingSpinner.numSpinners ) {
		createSpinner();
		loadingSpinner.numSpinners = 1;
	} else {
		loadingSpinner.numSpinners += 1;
	}	
};

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

export { createSpinner, destroySpinner, incrementSpinner, decrementSpinner } // export something for import to get onto page
