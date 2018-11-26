/**
 * userSelection_q_OnURL_Update_UpdateJSobjectFromURL.js
 * 
 * 	!!!!!!!!!!!!!!!!    NOT USED   !!!!!!!!!!!!!!!!!!!!!!!!!!
 * 
 * Javascript for:
 * 
 * Update the string after the /q/ in the URL
 *   which is the user's selection 
 * 
 * Update _dataPageStateManager for DisplayData For User Selection from the URL 
 * 
 * Uses:
 * 	compressDecompressString.js
 * 	parseAndStringifyDelimitedProjectSearchIds_InURLPath.js
 * 
 */

//
//
////JavaScript directive:   all variables have to be declared with "var", maybe other things
//"use strict";
//
/////////////////////////////////////////////
//
//
//import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';
//
//import { StringCompressDecompress }  from './compressDecompressString.js';

//import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM.js';

///**
// * 
// */
//class UserSelection_q_OnURL_Update {
//
//	/**
//	 * 
//	 */
//	constructor( dataPageStateManager_DisplayData_UserSelection ) {
//		this._dataPageStateManager_DisplayData_UserSelection = dataPageStateManager_DisplayData_UserSelection;
//		
//		this._stringCompressDecompress = new StringCompressDecompress();
//
//		this._PATH_SEPARATOR = "/";
//		
//		let objectThis = this;
//		
//		let dataPageStateManagerChangeListener = function() {
//			
//			objectThis.updateURLforUserSelectionChange();
//		}
//		
//		this._dataPageStateManager_DisplayData_UserSelection.addChangeListener( dataPageStateManagerChangeListener );
//	}
//	
//	/**
//	 * 
//	 */
//	updateURLforUserSelectionChange() {
//
//		let projectSearchIds = this._dataPageStateManager_DisplayData_UserSelection.getPageState( 
//				dataPageStateManager_Keys.PROJECT_SEARCH_IDS_DPSM );
//
//
//		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//		console.log("!!!!!!                                                                                             !!!!!!" );
//		console.log("!!!!!!  Skipping window.history.replaceState(...) since data format of data to URL is not correct  !!!!!!" );
//		console.log("!!!!!!                                                                                             !!!!!!" );
//		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//		
//		return;  //  TODO  !!!!!  REmove this and throw when update this
//		
//		throw Error("Needs update for projectSearchIdsForURLString");
//
//		// WAS
////		let projectSearchIdsForURLString =
////			this._parseAndStringifyDelimitedProjectSearchIds_InURLPath.stringifyProjectSearchIdentifiers( projectSearchIds )
//		
//		//  TODO  The Blunt approach, need to update
//		let stateAsJSON = this._dataPageStateManager_DisplayData_UserSelection.getStateForURL() ;
//		
//		let stateAsJSON_Compressed = this._stringCompressDecompress.compress( stateAsJSON );
//
//		let pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();
//		
//		let newURL = 
//			pageControllerPath  + this._PATH_SEPARATOR + projectSearchIdsForURLString + this._PATH_SEPARATOR +
//			"q" + this._PATH_SEPARATOR +
//			stateAsJSON_Compressed;
//		
//		window.history.replaceState(null, null, newURL );
//		
//	}
//	
//
//	/**
//	 * Used on page load
//	 */
//	replaceUserSelectionFromURL( userSelectionStringFromURL ) {
//
//		let stateAsJSON = undefined;
//		try {
//			stateAsJSON = this._stringCompressDecompress.decompress( userSelectionStringFromURL );
//		} catch( e ) {
//			throw Error("replaceUserSelectionFromURL: Failed to decompress: " + userSelectionStringFromURL );
//		}
//		if ( ! stateAsJSON ) {
//			throw Error("replaceUserSelectionFromURL: Failed to decompress (returned null): " + userSelectionStringFromURL );
//		}
//		
//		let stateFromURLasObject = undefined;
//		try {
//			stateFromURLasObject = JSON.parse( stateAsJSON );
//		} catch( e ) {
//			throw Error("replaceUserSelectionFromURL: Failed to decompress then parse: " + userSelectionStringFromURL );
//		}
//
//		this._dataPageStateManager_DisplayData_UserSelection.replaceStateWithObjectFromURL( stateFromURLasObject );
//		
//	}
//	
////		/**
////		 * 
////		 */
////		replaceStateWithJSONFromURL( newStateAsJSON ) {
////			let newState = JSON.parse( newStateAsJSON );
////			this._pageState = newState;
////		}
////		
////		
////		//  LZString.decompressFromEncodedURIComponent(...) returns null if unable to decompress
////		let dataStringDecompressedDecodeURIComponent = LZString.decompressFromEncodedURIComponent( dataStringCompressed );
////		return dataStringDecompressedDecodeURIComponent;
////	}
////	
//	
//}
//
//
//export { UserSelection_q_OnURL_Update }
