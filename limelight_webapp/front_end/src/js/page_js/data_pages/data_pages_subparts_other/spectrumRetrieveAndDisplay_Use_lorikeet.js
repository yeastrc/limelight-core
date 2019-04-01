/**
 * spectrumRetrieveAndDisplay_Use_lorikeet.js
 * 
 * Javascript for retrieving Spectrum data for a PSM Id and display on the page using Lorikeet
 * 
 * 2 options:
 * 
 *   1)  Display in Overlay    - function: viewSpectrum_InOverlay
 *   2)  Display in new window - function: viewSpectrum_NewWindow
 */



//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////


let Handlebars = require('handlebars/runtime');

let _lorikeet_overlay_template_bundle = 
	require("../../../../../handlebars_templates_precompiled/lorikeet_overlay/lorikeet_overlay_template-bundle.js" );


//  module import 

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost.js';

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes.js';

import { TableDataUtils } from 'page_js/data_pages/data_tables/tableDataUtils.js';
import { PageStateUtils } from 'page_js/data_pages/data_tables/pageStateUtils.js';



// import { addFlotToJquery } from 'libs/Lorikeet/jquery.flot.js';
// import { addFlotSelectionToJquery } from 'libs/Lorikeet/jquery.flot.selection.js';

// import { addLorikeetToJquery } from 'libs/Lorikeet/specview.js';

//   !!!  Constants visible in this file/module


const LOCAL__PRECURSOR_M_OVER_Z_DIGITS_AFTER_DECIMAL_POINT = 5;

const LOCAL__RETENTION_TIME_MINUTES_DIGITS_AFTER_DECIMAL_POINT = 2;



//  Size of lorikeet spectrum part of viewer
const LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_WIDTH_PARAM = 700;
const LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_HEIGHT_PARAM = 700;

//  add 700px to width to allow for max of 3 b and 3 y ion columns
const LORIKEET_VIEWER_NEW_WINDOW_SIZE_WIDTH = LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_WIDTH_PARAM + 700;

//  add 700px to height for display of PSM data and other PSMs for same scan number
const LORIKEET_VIEWER_NEW_WINDOW_SIZE_HEIGHT = LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_HEIGHT_PARAM + 700;

//  Following not currently used

//  Size of lorikeet spectrum part of viewer
// const LORIKEET_VIEWER_SIZE_PARAM_FOR_OVERLAY_WIDTH_PARAM = 500;
// const LORIKEET_VIEWER_SIZE_PARAM_FOR_OVERLAY_HEIGHT_PARAM = 500;



//  Variables visible in this file/module  
let itemsAddedTo_jQuery = false;


/**
 * 
 */
export class SpectrumRetrieveAndDisplay_Use_lorikeet {

	/**
	 * 
	 */
	constructor( params ) {

//		console.log( "Handlebars: " + Handlebars );
//		console.log( "_psm_list_template_bundle: " + _psm_list_template_bundle );

		// if ( ! _lorikeet_overlay_template_bundle.lorikeet_overlay_background_template ) {
		// 	throw Error("Nothing in _lorikeet_overlay_template_bundle.lorikeet_overlay_background_template");
		// }
		// if ( ! _lorikeet_overlay_template_bundle.lorikeet_overlay_main_template ) {
		// 	throw Error("Nothing in _lorikeet_overlay_template_bundle.lorikeet_overlay_main_template");
		// }

		// this._lorikeet_overlay_background_template_Template = 
		// 	_lorikeet_overlay_template_bundle.lorikeet_overlay_background_template;

		// this._lorikeet_overlay_main_template_Template = 
		// 	_lorikeet_overlay_template_bundle.lorikeet_overlay_main_template;
		
		// if ( ! itemsAddedTo_jQuery ) {
			
		// 	let jquery = window.jQuery;
			
		// 	addFlotToJquery( jquery );
		// 	addFlotSelectionToJquery( jquery );
		// 	addLorikeetToJquery( jquery );
			
		// 	itemsAddedTo_jQuery = true;
		// }
	}
	
	// /**
	//  * 
	//  */
	// viewSpectrum_InOverlay( { psmId, projectSearchId } ) {

	// 	let objectThis = this;
		
	// 	//  Maybe need visual indication that retrieving the data??

	// 	const loadSpectrumDataPromise = this._loadSpectrumData( { psmId, projectSearchId } );
		
	// 	loadSpectrumDataPromise.catch(function(reason) {
			
	// 	})
		
	// 	loadSpectrumDataPromise.then( function( loadSpectrumDataResponse ) {
			
	// 		const primaryLorikeetData = loadSpectrumDataResponse.primaryLorikeetData;
			
	// 		objectThis._createLorikeetViewerInOverlay( { psmId, projectSearchId, primaryLorikeetData } );
	// 	})
	// }

	/**
	 * 
	 */
	viewSpectrum_NewWindow( { psmId, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) {

		let objectThis = this;
		
		//  Maybe need visual indication that retrieving the data??
		
		const windowWidthHeight = "width=" + LORIKEET_VIEWER_NEW_WINDOW_SIZE_WIDTH + ", height=" + LORIKEET_VIEWER_NEW_WINDOW_SIZE_HEIGHT;
		
		const strWindowFeatures = 
			"toolbar=no,status=no,menubar=no,resizable=yes,scrollbars=yes," + windowWidthHeight;

		const newWindowURL = "d/pg/spectrum-viewer";
		
		 // MUST open window before make AJAX Call.  This is a Browser Security requirement
		//  window.open(...): Must run in code directly triggered by click event
		
		const newWindow = window.open( newWindowURL,
				"_blank",
				strWindowFeatures );
		
		const loadedDataFromServer = {};

		const loadSpectrumDataPromise = this._loadSpectrumData( { psmId, projectSearchId, loadedDataFromServer, newWindow } );

		loadSpectrumDataPromise.catch( function( reason ) {
			
		})
		
		const loadPSMPeptideDataPromise = this._loadPSMPeptideData( { psmId, projectSearchId, loadedDataFromServer, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server, newWindow } );
		
		loadPSMPeptideDataPromise.catch( function( reason ) {
			
		})
		
		Promise.all( [ loadSpectrumDataPromise, loadPSMPeptideDataPromise ] ).then(function(value) {
			
			const psmPeptideTable_HeadersAndData = objectThis._createPsmPeptideTable_HeadersAndData( { psmId, projectSearchId, newWindow, loadedDataFromServer, dataPageStateManager_DataFrom_Server } );
			
			objectThis._createLorikeetViewerInNewWindow( { psmId, projectSearchId, newWindow, loadedDataFromServer, psmPeptideTable_HeadersAndData } );
		})
	}

	/**
	 * 
	 */
	_loadSpectrumData( { psmId, projectSearchId, loadedDataFromServer, newWindow } ) {
		
		//  Maybe need visual indication that retrieving the data??

		return new Promise( function( resolve, reject ) {
		  try {
			console.log("AJAX Call to get Spectrum Data START, Now: " + new Date() );

			let requestObject = {
					psmId : psmId,
					projectSearchId : projectSearchId
			};

			const url = "d/rws/for-page/psb/spectrum-for-psm-id";

			const promise_webserviceCallStandardPost = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

			promise_webserviceCallStandardPost.catch( () => { 
				try {
					if ( newWindow ) {
						newWindow.close(); // close here before call handleAJAXFailure(...) since that may reload the page
					}

					reject();

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			} );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
				try {
					console.log("AJAX Call to get Spectrum Data END, Now: " + new Date() );

					if ( loadedDataFromServer ) {
						loadedDataFromServer.primaryLorikeetData = responseData;
					}
					
					resolve( { primaryLorikeetData : responseData } );

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}

			});
		  } catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		  }
		}); 
	}
	
	/**
	 * 
	 */
	_loadPSMPeptideData( { psmId, projectSearchId, loadedDataFromServer, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server, newWindow } ) {
		
		//  Maybe need visual indication that retrieving the data??

		let searchDataLookupParams_For_Single_ProjectSearchId = 
			searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId : projectSearchId } );
        
        let psmAnnotationTypeIdsForSorting = PageStateUtils.getPsmAnnotationTypeIdsWhereSortOrderPopulated( { dataPageStateManager_DataFrom_Server, projectSearchId } );
        
        let requestObject = {
                psmId : psmId,
            projectSearchId : projectSearchId,
            searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
            psmAnnotationTypeIdsForSorting : psmAnnotationTypeIdsForSorting,
        };
		
		return new Promise( function( resolve, reject ) {
		  try {
			console.log("AJAX Call to get PSM data for Spectrum Viewer window START, Now: " + new Date() );

			const url = "d/rws/for-page/psb/psm-peptide-list-display-with-spectrum-viewer";

			const promise_webserviceCallStandardPost = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

			promise_webserviceCallStandardPost.catch( () => { 
				try {
					if ( newWindow ) {
						newWindow.close(); // close here before call handleAJAXFailure(...) since that may reload the page
					}
								
					reject();

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
				try {
					console.log("AJAX Call to get PSM data for Spectrum Viewer window END, Now: " + new Date() );

					loadedDataFromServer.psmPeptideData = responseData;
					
					resolve( { psmPeptideData : responseData } );

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
		  } catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		  }
		}); 
	}
	
	////////

	/**
	 * 
	 */
	_createPsmPeptideTable_HeadersAndData( { psmId, projectSearchId, newWindow, loadedDataFromServer, dataPageStateManager_DataFrom_Server } ) {

        const psmPeptideData = loadedDataFromServer.psmPeptideData.resultList;
        
		const sorted_psmPeptideData = this._sortPsmPeptideListOnSortOrder( { psmPeptideData, projectSearchId, dataPageStateManager_DataFrom_Server } );
		
		const dataTableDataObjectArray = this._createDataTableDataObjectArrayFromWebServiceResponse( { sorted_psmPeptideData, loadedDataFromServer } );
		
		const dataTableColumns = this._getDataTableColumns( { dataObjectArray : dataTableDataObjectArray, dataPageStateManager_DataFrom_Server, projectSearchId } );
		
		return {
			dataTableDataObjectArray,
			dataTableColumns,
			initialPsmId : psmId
		}
	}
	

    /**
     * Get the columns for the PSM table.
     * 
     * @param {*} param0 
     */
    _getDataTableColumns( { dataObjectArray, dataPageStateManager_DataFrom_Server, projectSearchId } ) {

		//  Determine anyPsmsHave_precursor_M_Over_Z and anyPsmsHave_retentionTime
		
		let anyPsmsHave_precursor_M_Over_Z = false; 
		let anyPsmsHave_retentionTime = false;

		if( dataObjectArray && dataObjectArray.length > 0 ) {
			for ( const dataObjectItem of dataObjectArray ) {
				if ( dataObjectItem.precursor_M_Over_Z_Display !== undefined ) {
					anyPsmsHave_precursor_M_Over_Z = true;
					break;
				}
			}

			for ( const dataObjectItem of dataObjectArray ) {
				if ( dataObjectItem.retentionTimeMinutesDisplay !== undefined ) {
					anyPsmsHave_retentionTime = true;
					break;
				}
			}
		}

    	
        let columns = [ ];
        
        {
            let column = {
				id :           'viewPsm',
				width :        '70px',
                displayName :  '',
                hideColumnHeader : true,
                dataProperty : 'viewPsmLink',
                sort : false,
                style_override : 'font-size:12px;',
                css_class : 'fake-link selector_view_psm_item',
			};

			columns.push( column );
        }
//
//		{
//			let column = {
//				id :           'sn',
//				width :        '100px',
//				displayName :  'Scan Number',
//				dataProperty : 'scanNumber',
//                sort : 'number',
//                style_override : 'font-size:12px;',
//			};
//
//			columns.push( column );
//        }

		{
			let column = {
				id :           'sequence',
				width :        '500px',
				displayName :  'Sequence',
				dataProperty : 'reportedPeptideString',
                sort : 'string',
                style_override : 'white-space:nowrap;overflow-x:auto;font-size:12px;',   //prevent line breaks and scroll if too long
			};

			columns.push( column );
        }

		if ( anyPsmsHave_precursor_M_Over_Z ) {
			let column = {
					id :           'mz',
					width :        '100px',
					displayName :  'Obs. m/z',
					dataProperty : 'precursor_M_Over_Z_Display',
					sort : 'number',
					style_override : 'font-size:12px;',
			};

			columns.push( column );
		} 
		
		{
			let column = {
					id :           'Charge',
					width :        '55px',
					displayName :  'Charge',
					dataProperty : 'charge',
					sort : 'number',
					style_override : 'font-size:12px;',
			};

			columns.push( column );
		} 
		
		if ( anyPsmsHave_retentionTime ) {
			let column = {
					id :           'rt',
					width :        '60px',
					displayName :  'RT(min)',
					dataProperty : 'retentionTimeMinutesDisplay',
					sort : 'number',
					style_override : 'font-size:12px;',
			};

			columns.push( column );
		} 

        let sortedPSMAnnotationsToShow = TableDataUtils.getOrderedPSMAnnotationsToShowForSearch( { dataObjectArray, dataPageStateManager_DataFrom_Server, projectSearchId } );

        for( let annotation of sortedPSMAnnotationsToShow ) {

            let column = {
				id :           annotation.annotationTypeId,
				width :        '100px',
				displayName :  annotation.name,
				dataProperty : annotation.annotationTypeId,
                sort : annotation.sorttype,
                style_override : 'font-size:12px;',
			};

			columns.push( column );
        }

        columns[ columns.length - 1 ].lastItem = true;
        return columns;
    }


    /**
     * return dataObjectArray created using the data returned from a web service call for PSMs
     * 
     * @param {*} param0 
     */
    _createDataTableDataObjectArrayFromWebServiceResponse( { sorted_psmPeptideData, loadedDataFromServer } ) {

    	const dataTableDataObjectArray = [];
    	
    	const primaryLorikeetData = loadedDataFromServer.primaryLorikeetData.data;
    	
        for ( const psmObject of sorted_psmPeptideData ) {

            let dataObject = { };
            
            dataObject.uniqueId = psmObject.psmId;
            dataObject.id = psmObject.psmId;

            dataObject.reportedPeptideString = psmObject.reportedPeptideString;
            
            dataObject.scanNumber = primaryLorikeetData.scanNum;
            dataObject.viewPsmLink = 'View PSM';
			
            dataObject.charge = psmObject.charge;
            if ( primaryLorikeetData.precursorMz !== undefined && primaryLorikeetData.precursorMz !== null ) {
            	dataObject.precursor_M_Over_Z_Display = primaryLorikeetData.precursorMz.toFixed( LOCAL__PRECURSOR_M_OVER_Z_DIGITS_AFTER_DECIMAL_POINT );
			}
            
			if ( primaryLorikeetData.retentionTimeSeconds !== undefined && primaryLorikeetData.retentionTimeSeconds !== null ) {
				const retentionTimeMinutesNumber = primaryLorikeetData.retentionTimeSeconds / 60;
				dataObject.retentionTimeMinutesDisplay = retentionTimeMinutesNumber.toFixed( LOCAL__RETENTION_TIME_MINUTES_DIGITS_AFTER_DECIMAL_POINT );
			}

            dataObject.loadedData = psmObject;

            for( let annoId of Object.keys( psmObject.psmAnnotationMap ) ) {
                dataObject[ annoId ] = psmObject.psmAnnotationMap[ annoId ][ 'valueString' ];
            }

            dataTableDataObjectArray.push( dataObject );
        }
        return dataTableDataObjectArray;
	}
    

	/**
	 * Sort PSM Peptide Array on PSM Sort order then Psm Id
	 */
	_sortPsmPeptideListOnSortOrder( { psmPeptideData, projectSearchId, dataPageStateManager_DataFrom_Server } ) {

		const sorted_psmPeptideData = psmPeptideData;
		
        const annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes( { dataPageStateManager_DataFrom_Server } );

		//  First get all Unique PSM Annotation Type Ids in the List
		
		let uniquePSMAnnotationTypeIds_InList = new Set();

		for ( const sorted_psmPeptideDataItem of sorted_psmPeptideData ) {
			const psmAnnotationMap = sorted_psmPeptideDataItem.psmAnnotationMap;
			if ( psmAnnotationMap ) {
				for ( const psmAnnotationMapKeyItem of Object.keys ( psmAnnotationMap ) ) {
					const psmAnnotationDTOItem = psmAnnotationMap[ psmAnnotationMapKeyItem ];
					uniquePSMAnnotationTypeIds_InList.add( psmAnnotationDTOItem.annotationTypeId );
				}
			}
		}
		
		//  Get AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names
		
		let psmAnnotationTypesForListEntries = 
			annotationTypeData_ReturnSpecifiedTypes.get_Psm_AnnotationTypeRecords_InDisplayOrder( { 
				projectSearchId, uniqueAnnotationTypeIds : uniquePSMAnnotationTypeIds_InList } );
		
		let psmAnnotationTypesForListEntriesLength = psmAnnotationTypesForListEntries.length;

		sorted_psmPeptideData.sort( function( a, b ) {

			//  Compare PSM Ann Type Values match
			let a_psmAnnotationMap = a.psmAnnotationMap;
			let b_psmAnnotationMap = b.psmAnnotationMap;
			if ( a_psmAnnotationMap && b_psmAnnotationMap ) {

				for ( let psmAnnotationTypesForListEntriesLength_Index = 0; psmAnnotationTypesForListEntriesLength_Index < psmAnnotationTypesForListEntriesLength; psmAnnotationTypesForListEntriesLength_Index++ ) {
					let psmAnnotationTypesForListEntries_Entry = psmAnnotationTypesForListEntries[ psmAnnotationTypesForListEntriesLength_Index ];
					let annotationTypeId = psmAnnotationTypesForListEntries_Entry.annotationTypeId;
					let a_psmAnnotationMap_ForAnnType = a_psmAnnotationMap[ annotationTypeId ];
					let b_psmAnnotationMap_ForAnnType = b_psmAnnotationMap[ annotationTypeId ];

					if ( a_psmAnnotationMap_ForAnnType && b_psmAnnotationMap_ForAnnType ) {
						if ( psmAnnotationTypesForListEntries_Entry.filterDirectionBelow ) {
							if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return -1;
							}
							if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return 1;
							}
							//  Values match so go to next ann type values
						} else if ( psmAnnotationTypesForListEntries_Entry.filterDirectionAbove ) {
							if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return -1;
							}
							if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return 1;
							}
							//  Values match so go to next ann type values
						} else {
							throw Error( "filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
						}
					}
				}
			}

			//  All PSM Ann Type Values match so order on psm id
			if ( a.psmId < b.psmId ) {
				return -1;
			}
			if ( a.psmId > b.psmId ) {
				return 1;
			}
			return 0;

		});
		
		return sorted_psmPeptideData;
	}
	


	////////

	/**
	 * 
	 */
	_createLorikeetViewerInNewWindow( { psmId, newWindow, loadedDataFromServer, psmPeptideTable_HeadersAndData } ) {
		
		if ( ! newWindow || newWindow.closed ) {
			return;
		}

		var lorikeetOptions = loadedDataFromServer.primaryLorikeetData.data;

		if ( lorikeetOptions === undefined || lorikeetOptions === null ) {

			try {
				newWindow.close();
			} catch ( e) {
				
			}
			
			var msg = "Error retrieving data.  lorikeetOptions === undefined || lorikeetOptions === null";

//			handleGeneralServerError( { msg: msg  });
			
			alert( msg );
		}
		
		//  Add these items to the lorikeetOptions variable
		lorikeetOptions.height = LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_HEIGHT_PARAM;
		lorikeetOptions.width =  LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_WIDTH_PARAM;
		
		this._addLorikeetToPageInNewWindow( { newWindow, lorikeetOptions, loadedDataFromServer, psmPeptideTable_HeadersAndData, retryCount : 0 } );
	}

	/**
	 * 
	 */
	_addLorikeetToPageInNewWindow( { newWindow, lorikeetOptions, loadedDataFromServer, psmPeptideTable_HeadersAndData, retryCount } ) {

		try {
			if ( ! newWindow || newWindow.closed ) {
				return;
			}
			
			if ( ( ! newWindow.lorikeetSpectrumViewer_OwnPage_Root ) || ( ! newWindow.lorikeetSpectrumViewer_OwnPage_Root.addLorikeetToPage ) ) {

				const objectThis = this;

				if ( ! retryCount ) {
					retryCount = 1;
				}
				retryCount++;

				if ( retryCount > 10 ) {

					const msg = "Failed to add Lorikeet Spectrum viewer to child window.  Cannot find object property 'newWindow.lorikeetSpectrumViewer_OwnPage_Root'.";
					console.log( msg + "  Error msg next: " )
					console.log( e );
					
					try {
						throw Error( msg + "  Exception/Error caught will be logged to server next" );
					} catch( e2 ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e2 } );
					}
					
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					alert( msg );
					throw e;
				}
				
				console.log( "Cannot find object property 'newWindow.lorikeetSpectrumViewer_OwnPage_Root'.  Call objectThis._addLorikeetToPageInNewWindow(...): retryCount: " + retryCount );
				
				window.setTimeout(function() {
					objectThis._addLorikeetToPageInNewWindow( { newWindow, lorikeetOptions, loadedDataFromServer, psmPeptideTable_HeadersAndData, retryCount } );
				}, 500 )
				
				return;  // Exit since don't have function in object on new window yet
			}
		} catch( e ) {

			if ( retryCount > 10 ) {

				const msg = "Failed to add Lorikeet Spectrum viewer to child window.  Exception find object property 'newWindow.lorikeetSpectrumViewer_OwnPage_Root'.";
				console.log( msg + "  Error msg next: " )
				console.log( e );
				
				try {
					throw Error( msg + "  Exception/Error caught will be logged to server next" );
				} catch( e2 ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e2 } );
				}
				
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				alert( msg );
				throw e;
			}
			
			const objectThis = this;
			
			if ( ! retryCount ) {
				retryCount = 1;
			}
			retryCount++;

			console.log( "Exception find object property 'newWindow.lorikeetSpectrumViewer_OwnPage_Root'.  Call objectThis._addLorikeetToPageInNewWindow(...): retryCount: " + retryCount );
			
			window.setTimeout(function() {
				objectThis._addLorikeetToPageInNewWindow( { newWindow, lorikeetOptions, loadedDataFromServer, psmPeptideTable_HeadersAndData, retryCount } );
			}, 500 )
		}
		
		//   Convert objects to pass in to a single JSON string. 
		//      Required to pass JSON only for MS Edge, when pass JS objects like Array, could not use 'for of' on them.
		
		const addLorikeetToPage_Params = {
				lorikeetOptions,
				loadedDataFromServer,
				psmPeptideTable_HeadersAndData
		}
		
		const addLorikeetToPage_Params_JSON = JSON.stringify( addLorikeetToPage_Params ); 
		
		try {
			//  Pass Single JSON String to function
			newWindow.lorikeetSpectrumViewer_OwnPage_Root.addLorikeetToPage( addLorikeetToPage_Params_JSON )

		} catch( e ) {

			console.log( "Exception call newWindow.lorikeetSpectrumViewer_OwnPage_Root.addLorikeetToPage(...): retryCount: " + retryCount );
			
			const msg = "Failed to add Lorikeet Spectrum viewer to child window.  Call to 'newWindow.lorikeetSpectrumViewer_OwnPage_Root.addLorikeetToPage(...)' failed.";
			console.log( msg + "  Error msg next: " )
			console.log( e );
			
			try {
				throw Error( msg + "  Exception/Error caught will be logged to server next" );
			} catch( e2 ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e2 } );
			}
			
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			alert( msg );
			throw e;
		}
	}



	///////////////////////////////////////////////

	/////    !!!!!!!!     WARNING

	////////     This following function _createLorikeetViewerInOverlay is like out of date.  Update it if use it.

	/**
	 * 
	 */
// 	_createLorikeetViewerInOverlay( { psmId, primaryLorikeetData } ) {
		
// 		let objectThis = this;
		
// 		//  Attach Lorikeet Overlay and it's background to the body
		
// 		let $body = $("body");
		
// 		let backgroundHTML = this._lorikeet_overlay_background_template_Template( {} );
// 		let $background = $( backgroundHTML ).appendTo( $body );

// 		let overlayHTML = this._lorikeet_overlay_main_template_Template( {} );
// 		let $overlayRoot = $( overlayHTML ).appendTo( $body );
		
// 		let $view_spectra_overlay_X_for_exit_overlay = $("#view_spectra_overlay_X_for_exit_overlay");
		
// 		//  Add Close Click handlers
		
// 		$background.click( function(eventObject) {
// 			try {
// 				eventObject.preventDefault();
// 				objectThis._removeLorikeetSpectrumOverlay();
// 			} catch( e ) {
// 				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 				throw e;
// 			}
// 		});
		
// 		$view_spectra_overlay_X_for_exit_overlay.click( function(eventObject) {
// 			try {
// 				eventObject.preventDefault();
// 				objectThis._removeLorikeetSpectrumOverlay();
// 			} catch( e ) {
// 				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 				throw e;
// 			}
// 		});

// 		var lorikeetOptions = primaryLorikeetData.data;

// 		if ( lorikeetOptions === undefined || lorikeetOptions === null ) {

// 			var msg = "Error retrieving data.  lorikeetOptions === undefined || lorikeetOptions === null";

// //			handleGeneralServerError( { msg: msg  });
			
// 			alert( msg );
// 		}
		
// 		//  Set Lorikeet options
		
// 		lorikeetOptions.peakDetect = false;
		
		
// 		//  Need to at least set lorikeetOptions.ms1scanLabel to something to get the "MS1 Scan:" to show up on the MS1 scan
// //		lorikeetOptions.ms1scanLabel = "ms1scanLabel";  //  TODO  set this to something else
// 		lorikeetOptions.ms1scanLabel = " ";  //  TODO  set this to something else

// 		//  Add these items to the lorikeetOptions variable
// 		lorikeetOptions.height = LORIKEET_VIEWER_SIZE_PARAM_FOR_OVERLAY_HEIGHT_PARAM;
// 		lorikeetOptions.width =  LORIKEET_VIEWER_SIZE_PARAM_FOR_OVERLAY_WIDTH_PARAM;


// 		//  Adjust the overlay positon to be within the viewport
// 		var scrollTopWindow = $(window).scrollTop();
// 		if ( scrollTopWindow > 0 ) {
// 			//  User has scrolled down
// 			var overlayTop = scrollTopWindow + 10;
// 			$overlayRoot.css( { top: overlayTop + "px" } );
// 		} else {

// 			$overlayRoot.css( { top: "10px" } );
// 		}

// 		lorikeetOptions.sizeChangeCallbackFunction = function() {
// 			objectThis._resizeLorikeetOverlayBackgroundToLorikeetSize();
// 		};

// 		var overlayZIndex = $overlayRoot.css("z-index");

// 		//  overlayZIndex is a string so this is the equivalent to ( overlayZIndex * 10 ) + 2
// 		//   which achieves the desired affect of lorikeetOptions.tooltipZIndex > overlayZIndex

// 		lorikeetOptions.tooltipZIndex = overlayZIndex + 2; // set higher than overlay z index so the tooltip will display

// 		let $lorikeet_holder_div = $("#lorikeet_holder_div");

// 		$lorikeet_holder_div.specview( lorikeetOptions );

// 		this._resizeLorikeetOverlayBackgroundToLorikeetSize();
// 	}
	
	/**
	 * 
	 */
// 	_resizeLorikeetOverlayBackgroundToLorikeetSize() {
		
// 		//  Adjust width of overlay as necessary

// 		var $lorikeetOuterTable = $("#lorikeet_holder_div table.lorikeet-outer-table");

// 		if ( $lorikeetOuterTable.length === 0 ) {
// 			//  did not find the element on the page
// 			return;  ///  EXIT Function
// 		}

// 		var lorikeetOuterTableOuterWidth = $lorikeetOuterTable.outerWidth();
		
// 		//  Fix the width of the overlay to match the width of the lorikeet viewer

// 		var $view_spectra_overlay_div = $("#view_spectra_overlay_div");

// 		//  The width of the overall overlay
// //		var view_spectra_overlay_div_outerWidth = $view_spectra_overlay_div.outerWidth();

// 		var $view_spectra_overlay_body = $("#view_spectra_overlay_body");

// 		var paddingLeft = parseInt( $view_spectra_overlay_body.css("padding-left"), 10);
// 		var paddingRight = parseInt( $view_spectra_overlay_body.css("padding-right"), 10);

// 		var newOverlayDivWidth = lorikeetOuterTableOuterWidth + paddingLeft + paddingRight + 10;

// 		$view_spectra_overlay_div.width( newOverlayDivWidth );

// //		var readOverlayDivWidth = $view_spectra_overlay_div.width( );

// 	};

	/**
	 * 
	 */
// 	_removeLorikeetSpectrumOverlay() {
		
// 		let $view_spectra_overlay_div = $("#view_spectra_overlay_div");
// 		let $lorikeet_modal_dialog_overlay_background = $("#lorikeet_modal_dialog_overlay_background");
		
// 		$view_spectra_overlay_div.remove();
// 		$lorikeet_modal_dialog_overlay_background.remove();
// 	}

}
