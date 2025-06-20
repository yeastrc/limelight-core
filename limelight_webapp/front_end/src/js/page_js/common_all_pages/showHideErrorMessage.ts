/**
 * showHideErrorMessage.ts
 * 
 * Javascript for showing an error message and hiding all error messages   
 * 
 * 
 * Exported Javascript 
 * 
 * export { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage }
 * 
 */

/**
 * JavaScript directive:   all variables have to be declared with "var", maybe other things
 */
"use strict";


////////////////////////////


var SHOW_ERROR_MSG_CLEAR_MSG_TRUE = true;
var SHOW_ERROR_MSG_CLEAR_MSG_FALSE = false;


var ERROR_MESSAGE_CONSTANTS = {
		
//		ERROR_MESSAGE_VERTICAL_MOVEMENT : -50 // number of pixels for moving error message when showing it.
		
		ERROR_MESSAGE_VERTICAL_START_POSITION : 20,
		
		ERROR_MESSAGE_HIDE_DELAY : 8000,  // in Milliseconds
		
		ERROR_MESSAGE_FADEOUT_OPTIONS : { duration : 1000 },  // duration in Milliseconds 
		
		ERROR_MESSAGE_SET_TIMEOUT_DATA_KEY : "ERROR_MESSAGE_SET_TIMEOUT_DATA_KEY"
		
};


////////////

function showErrorMsg( $element: any, clearMsg?: any ) {
	
	if ( clearMsg === undefined ) { //  If no value passed, default to true;
		
		clearMsg = SHOW_ERROR_MSG_CLEAR_MSG_TRUE;
	}
	
	clearErrorMsg( $element );
	
	$element.css( { top: ERROR_MESSAGE_CONSTANTS.ERROR_MESSAGE_VERTICAL_START_POSITION } );
	
	$element.show();
	
	var height = $element.outerHeight( true /* includeMargin */ );
	
	var animateMovement = -height;
	
	$element.animate( { top: animateMovement }, { duration: 500 } );

//	$element.animate( { top: ERROR_MESSAGE_CONSTANTS.ERROR_MESSAGE_VERTICAL_MOVEMENT }, { duration: 500 } );

	if ( clearMsg ) {

		var timerId = setTimeout( function() {

			clearErrorMsg( $element, true /* fade */ );

		}, ERROR_MESSAGE_CONSTANTS.ERROR_MESSAGE_HIDE_DELAY );

		$element.data( ERROR_MESSAGE_CONSTANTS.ERROR_MESSAGE_SET_TIMEOUT_DATA_KEY, timerId );
	}
};



/////////////

function hideAllErrorMessages() {
	
	//  Hides all error messages

	var $error_message_container_jq = $(".error_message_container_jq");

	$error_message_container_jq.each( function( index, element ) {
		
		var $this = $( this );
		
		clearErrorMsg( $this );
	});
}



////////////

function clearErrorMsg( $element: any, fadeErrorMsg?: any ) {

	$element.stop( true /* [clearQueue ] */ /*  [, jumpToEnd ] */ );
	
	var setTimeoutId = $element.data( ERROR_MESSAGE_CONSTANTS.ERROR_MESSAGE_SET_TIMEOUT_DATA_KEY );
	
	if ( setTimeoutId ) {
	
		clearTimeout( setTimeoutId );
	}
	
	$element.data( ERROR_MESSAGE_CONSTANTS.ERROR_MESSAGE_SET_TIMEOUT_DATA_KEY, null );
	
	
	
	if ( fadeErrorMsg ) {
		
		$element.fadeOut( 400 /* [duration ] */  /* [, complete ] */ );  //  OR ( options_object )  duration (default: 400)
		
	} else {
		
		$element.hide();
	}
	
};




////////////

function initShowHideErrorMessage( ) {


	var $error_message_close_x_jq  = $(".error_message_close_x_jq");

	initShowHideErrorMessageSpecificElements( $error_message_close_x_jq );
};


////////////

function initShowHideErrorMessageSpecificElements( $elements: any ) {

	//  Added Typescript Config: enable: "noImplicitThis": true,

	$elements.click( function(eventObject: any) { //  Another option is to change parameters to:  (this: HTMLElement, eventObject)
		
		//  Add click hander to the "X" in the error message to close the error message

		//  Added Typescript Config: enable: "noImplicitThis": true,

		// @ts-ignore
		var clickThis = this;  //  'this' is passed to function as element clicked on
		
		var $clickThis = $( clickThis );
		
		var $error_message_container_jq =  $clickThis.closest(".error_message_container_jq");
		
		clearErrorMsg( $error_message_container_jq );

		return false;  // stop click bubble up.
	});
	
}

export { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage }

