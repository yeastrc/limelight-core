/**
 * spectrumRetrieveAndDisplay_Use_lorikeet.ts
 * 
 * Javascript for retrieving Spectrum data for a PSM Id and display on the page using Lorikeet
 * 
 *   Display in new window 
 */



//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

import { lorikeetSpectrumViewer_CreateURL } from 'page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_CreateURL'
import {OpenModPosition_DataType} from "page_js/data_pages/data_pages__common_data_types_typescript/openModPosition_DataType_Typescript";



//  Size of lorikeet spectrum part of viewer
const LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_WIDTH_PARAM = 700;
const LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_HEIGHT_PARAM = 700;

//  add 700px to width to allow for max of 3 b and 3 y ion columns
const LORIKEET_VIEWER_NEW_WINDOW_SIZE_WIDTH = LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_WIDTH_PARAM + 700;

//  add 700px to height for display of PSM data and other PSMs for same scan number
const LORIKEET_VIEWER_NEW_WINDOW_SIZE_HEIGHT = LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_HEIGHT_PARAM + 700;

/**
 * 
 */
export class SpectrumRetrieveAndDisplay_Use_lorikeet {

	/**
	 * 
	 */
	constructor( ) {

	}
	
	/**
	 * 
	 */
	viewSpectrum_NewWindow( { psmId, projectSearchId, openModPosition } : {

		psmId: any
		projectSearchId: any
		openModPosition : OpenModPosition_DataType
	} ) {

		const lorikeetSpectrumViewer_newWindowURL = lorikeetSpectrumViewer_CreateURL({ projectSearchId, psmId, openModPosition });
		

		let lorikeetNewWindowWidth = LORIKEET_VIEWER_NEW_WINDOW_SIZE_WIDTH;
		let lorikeetNewWindowHeight = LORIKEET_VIEWER_NEW_WINDOW_SIZE_HEIGHT;

		//  If computer screen is smaller than chosen width or height, reduce to computer screen size

		// https://developer.mozilla.org/en-US/docs/Web/API/Screen
		// The Screen interface represents a screen, usually the one on which the current window is being rendered, 
		//    and is obtained using window.screen.
		// Note that browsers determine which screen to report as current by detecting which screen has the center of the browser window.

		if ( window.screen ) {

			const availWidth = window.screen.availWidth - 20;
			const availHeight = window.screen.availHeight - 80; // Subtract 80 pixels since on Windows the reported height appears to be wrong

			if ( availWidth && availWidth < lorikeetNewWindowWidth ) {
				//  Reduce lorikeetNewWindowWidth to availWidth
				lorikeetNewWindowWidth = availWidth;
			}
			if ( availHeight && availHeight < lorikeetNewWindowWidth ) {
				//  Reduce lorikeetNewWindowHeight to availHeight
				lorikeetNewWindowHeight = availHeight;
			}
		}


		
		const windowWidthHeight = "width=" + lorikeetNewWindowWidth + ", height=" + lorikeetNewWindowHeight;
		
		const strWindowFeatures = "toolbar=no,status=no,menubar=no,resizable=yes,scrollbars=yes,noopener," + windowWidthHeight;

		const newWindowURL = lorikeetSpectrumViewer_newWindowURL;

		const newWindow = window.open( newWindowURL,
				"_blank",
				strWindowFeatures );
	}
}
