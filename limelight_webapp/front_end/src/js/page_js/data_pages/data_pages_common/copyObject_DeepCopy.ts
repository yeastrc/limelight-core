/**
 * copyObject_DeepCopy.ts
 * 
 * Javascript:  Utility to make deep copy of object
 * 
 * 
 * 
 */

//////////////////////////////////
//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

/**
 * Make deep copy of object parameter
 */
export const copyObject_DeepCopy_Limelight = function( objectToCopy: any ) {
	
	if ( objectToCopy === undefined || objectToCopy === null ) {
		throw Error("copyObject_DeepCopy_Limelight: invalid parameter, is undefined or null");
	}


	try {
		//  NEW Option for Deep Clone.  Added 2022:   'window.structuredClone'  Copies the sub objects putting them in generic  Object

		const cloneUsing_StructuredClone = window.structuredClone( objectToCopy )

		return cloneUsing_StructuredClone

	} catch ( e ) {

		//  Remove when time to remove jQuery from main data pages

		//  OLD CODE:  'jQuery.extend'  Copies the sub objects putting them in the same classes as the original objects

		const cloneUsingJQuery =  jQuery.extend( true /* [deep ] */, {}, objectToCopy )

		return cloneUsingJQuery
	}
};
