
/**
 * Static utility methods used to display PSM lists under
 * reported peptides.
 */

"use strict";

let Handlebars = require('handlebars/runtime');

let _common_template_bundle = 
	require("../../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
    
import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler.js';
import { TableDataUtils } from 'page_js/data_pages/data_tables/tableDataUtils.js';
import { PageStateUtils } from 'page_js/data_pages/data_tables/pageStateUtils.js';
import { SpectrumRetrieveAndDisplay_Use_lorikeet } from 'page_js/data_pages/data_pages_subparts_other/spectrumRetrieveAndDisplay_Use_lorikeet.js';


const LOCAL__PRECURSOR_M_OVER_Z_DIGITS_AFTER_DECIMAL_POINT = 4;

const LOCAL__RETENTION_TIME_MINUTES_DIGITS_AFTER_DECIMAL_POINT = 2;


export class PSMListingUtilsSingleSearch {

    /**
     * Get the reported peptide id that was clicked on by querying the actual dom
     * element that was clicked on
     * 
     * @param {*} param0 
     */
    static getReportedPeptideIdFromClickedRow( { $clickedRow } ) {
        return parseInt( $clickedRow.data( 'id' ) );
    }

    /**
     * Get a new jquery element that is the div into which we are placing the new
     * table
     */
    static getNewJQueryContainerDiv() {
		let template = Handlebars.templates.psmListingExpansionDiv;
        return $( template() );
    }

    /**
     * Create and populate a new jquery element with a table of PSMs based on the input data.
     * 
     * Exactly 1 of searchDetailsBlockDataMgmtProcessing or psmIds must be populated.  Not Both.  Not Neither
     * 
     * @param {*} param0 
     */
    static createJQueryElementForPSMListing( { 
        $clickedRow, 
        projectSearchId, 
        alwaysShow_ReporterIonMasses_Column,  //  Optional to indicate show Reporter Ions Column
        psmIds,  //  PSM Ids to list.  Overrides the ones from the search cutoffs. reportedPeptideId and projectSearchId  still apply
        searchDetailsBlockDataMgmtProcessing, 
        dataPageStateManager_DataFrom_Server } ) {

        let $containerDiv = PSMListingUtilsSingleSearch.getNewJQueryContainerDiv();

        let reportedPeptideId = PSMListingUtilsSingleSearch.getReportedPeptideIdFromClickedRow( { $clickedRow } );

        PSMListingUtilsSingleSearch.populateListingDiv( { $containerDiv, alwaysShow_ReporterIonMasses_Column, psmIds, reportedPeptideId, searchDetailsBlockDataMgmtProcessing, projectSearchId, dataPageStateManager_DataFrom_Server } );

        return $containerDiv;        
    }

    /**
     * Add the table of the PSM data to the supplied container div using the supplied reported peptide ID
     * 
     * @param {*} param0 
     */
    static populateListingDiv( { $containerDiv, alwaysShow_ReporterIonMasses_Column, psmIds, reportedPeptideId, searchDetailsBlockDataMgmtProcessing, projectSearchId, dataPageStateManager_DataFrom_Server } ) {

        const loadedData = { };
        let dataObjectArray = [ ];



        PSMListingUtilsSingleSearch.getPSMDataObjectArrayForReportedPeptideId({ loadedData, dataObjectArray, searchDetailsBlockDataMgmtProcessing, psmIds, reportedPeptideId, projectSearchId, dataPageStateManager_DataFrom_Server }).then( function( result ) {
            try {
                PSMListingUtilsSingleSearch.createAndAddTableSingleSearch( { $containerDiv, alwaysShow_ReporterIonMasses_Column, loadedData, dataObjectArray, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    /**
     * Populate the supplied dataObjectArray using the data returned from a web
     * service call for PSMs
     * 
     * @param {*} param0 
     */
    static populateDataObjectArrayFromWebServiceResponse( { dataObjectArray, loadedData } ) {

        for (let psmObject of loadedData.psmList) {

            let dataObject = { };

            dataObject.hasScanData = loadedData.searchHasScanData;

            dataObject.uniqueId = psmObject.psmId;
            dataObject.id = psmObject.psmId;

            dataObject.scanNumber = psmObject.scanNumber;
            dataObject.viewScanLink = 'View Scan';
			
            dataObject.charge = psmObject.charge;
            if ( psmObject.precursor_M_Over_Z !== undefined && psmObject.precursor_M_Over_Z !== null ) {
                dataObject.precursor_M_Over_Z_Display = psmObject.precursor_M_Over_Z.toFixed( LOCAL__PRECURSOR_M_OVER_Z_DIGITS_AFTER_DECIMAL_POINT );
			}
			if ( psmObject.retentionTimeSeconds !== undefined && psmObject.retentionTimeSeconds !== null ) {
				const retentionTimeMinutesNumber = psmObject.retentionTimeSeconds / 60;
				dataObject.retentionTimeMinutesDisplay = retentionTimeMinutesNumber.toFixed( LOCAL__RETENTION_TIME_MINUTES_DIGITS_AFTER_DECIMAL_POINT );
            }
            
            if ( psmObject.reporterIonMassList ) {

                const reporterIonMassAsString_List = [];
                for ( const reporterIonMass of psmObject.reporterIonMassList ) {
                    const reporterIonMass_String = reporterIonMass.toString();
                    reporterIonMassAsString_List.push( reporterIonMass_String );
                }
                const reporterIonMassesDisplay = reporterIonMassAsString_List.join(", ");
                dataObject.reporterIonMassesDisplay = reporterIonMassesDisplay;
            }

            dataObject.loadedData = psmObject;

            for( let annoId of Object.keys( psmObject.psmAnnotationMap ) ) {
                dataObject[ annoId ] = psmObject.psmAnnotationMap[ annoId ][ 'valueString' ];
            }

            dataObjectArray.push( dataObject );
        }
	}

	/**
	 * Create and add a table to the supplied container div using the supplied dataObjectArray
	 * 
	 * @param {*} param0 
	 */
	static createAndAddTableSingleSearch( { alwaysShow_ReporterIonMasses_Column, loadedData, dataObjectArray, projectSearchId, $containerDiv, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) {

        let tableDisplayHandler = new TableDisplayHandler();

        let tableObject = { };
        tableObject.columns = PSMListingUtilsSingleSearch.getColumnsSingleSearch( { alwaysShow_ReporterIonMasses_Column, loadedData, dataObjectArray, dataPageStateManager_DataFrom_Server, projectSearchId } );
        tableObject.dataObjects = dataObjectArray;
        tableDisplayHandler.addGraphWidths( { dataObjects : dataObjectArray, columns : tableObject.columns } );

        tableObject.expandableRows = false;

        let template = Handlebars.templates.dataTable;
        let html = template( { tableObject } );
        let $tableContainerDiv = $( html );

        let $myContentDiv = $containerDiv.children( 'div.psm-list-content' );

        $myContentDiv.empty();
        $myContentDiv.append( $tableContainerDiv );

        tableDisplayHandler.addSortHandlerToHeader( $tableContainerDiv );
        tableDisplayHandler.addHoverHandlerToRows( { $tableContainerDiv } );
        tableDisplayHandler.addNoExpansionHandlerToRows( { $tableContainerDiv } );

        // add click handlers for viewing spectra
        PSMListingUtilsSingleSearch.addClickHandlerForViewingSpectra( { $tableContainerDiv, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );
    }

    static handleScanLinkClick( { $clickedElement, projectSearchId, clickEvent, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) {

        const psmId = PSMListingUtilsSingleSearch.getPSMIdForClickedScanLink( $clickedElement );

        const lorikeetDisplay = new SpectrumRetrieveAndDisplay_Use_lorikeet();

        lorikeetDisplay.viewSpectrum_NewWindow( { psmId, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );
    }

    static getPSMIdForClickedScanLink( $clickedElement ) {

        return $clickedElement.parent().data( 'id' );
    }

    static addClickHandlerForViewingSpectra( { $tableContainerDiv, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) {

        $tableContainerDiv.find( 'div.div-table-data-row' ).children('div.column-viewScan').click( function(clickEvent) {
            clickEvent.preventDefault();
            PSMListingUtilsSingleSearch.handleScanLinkClick( { $clickedElement : $(this), projectSearchId, clickEvent, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );
            return false;
        });
    }

    /**
     * Get the columns for the PSM table.
     * 
     * @param {*} param0 
     */
    static getColumnsSingleSearch( { alwaysShow_ReporterIonMasses_Column, loadedData, dataObjectArray, dataPageStateManager_DataFrom_Server, projectSearchId } ) {

		//  Determine anyPsmsHave_precursor_M_Over_Z and anyPsmsHave_retentionTime
		
		let anyPsmsHave_precursor_M_Over_Z = false; 
        let anyPsmsHave_retentionTime = false;

        let anyPsmsHave_reporterIonMassesDisplay = false;
        
        if ( alwaysShow_ReporterIonMasses_Column ) {  //  Input parameter from outside this class/file
            anyPsmsHave_reporterIonMassesDisplay = true;
        }

        if ( loadedData.search_anyPsmHas_ReporterIons ) { //  from search_tbl flag
            anyPsmsHave_reporterIonMassesDisplay = true;
        }

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

			for ( const dataObjectItem of dataObjectArray ) {
				if ( dataObjectItem.reporterIonMassesDisplay !== undefined ) {
					anyPsmsHave_reporterIonMassesDisplay = true;
					break;
				}
            }
		}

	
        let columns = [ ];
        
        if( dataObjectArray && dataObjectArray.length > 0 && dataObjectArray[ 0 ].hasScanData ) {

            let column = {
				id :           'viewScan',
				width :        '70px',
                displayName :  '',
                hideColumnHeader : true,
                dataProperty : 'viewScanLink',
                sort : false,
                style_override : 'font-size:12px;',
                css_class : 'fake-link selector_view_scan_item',
			};

			columns.push( column );
        }

		{
			let column = {
				id :           'sn',
				width :        '100px',
				displayName :  'Scan Number',
				dataProperty : 'scanNumber',
                sort : 'number',
                style_override : 'font-size:12px;',
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
        
        if ( anyPsmsHave_reporterIonMassesDisplay ) {
            let column = {
                id :           'reporterIons',
                width :        '60px',
                displayName :  'Reporter Ions',
                dataProperty : 'reporterIonMassesDisplay',
                sort : 'string',
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
     * Populate the supplied dataObjectArray for the supplied reportedPeptideId and projectSearchId
     * 
     * @param {*} param0 
     */
    static getPSMDataObjectArrayForReportedPeptideId({ loadedData, dataObjectArray, searchDetailsBlockDataMgmtProcessing, psmIds, reportedPeptideId, projectSearchId, dataPageStateManager_DataFrom_Server }) {

        if ( loadedData && ( ! ( typeof loadedData === 'object' ) ) ) {
            const msg = "getPSMDataObjectArrayForReportedPeptideId: parameter 'loadedData' is set and not an object";
            console.warn( msg );
            throw Error( msg );
        }

        let loadedData_Local = undefined;

        if ( loadedData ) {
            loadedData_Local = loadedData;
        } else {
            loadedData_Local = { };
        }

        return new Promise(function (resolve, reject) {
            try {
                // make ajax call to load the peptides, then load peptide object
                PSMListingUtilsSingleSearch.getPSMInfoForReportedPeptideFromWebService( { dataPageStateManager_DataFrom_Server, searchDetailsBlockDataMgmtProcessing, projectSearchId, psmIds,reportedPeptideId, loadedData : loadedData_Local } ).then( function( result ) {
                    try {
                        PSMListingUtilsSingleSearch.populateDataObjectArrayFromWebServiceResponse( { dataObjectArray, loadedData : loadedData_Local } )

                        resolve();
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
     * Create the request object needed to query PSM data from the web service.
     * 
     * @param {*} param0 
     */
    static __createRequestForPSMInfoForReportedPeptideId( { dataPageStateManager_DataFrom_Server, searchDetailsBlockDataMgmtProcessing, projectSearchId, psmIds, reportedPeptideId } ) {

		let searchDataLookupParams_For_Single_ProjectSearchId = 
			searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId : projectSearchId } );
        
        let psmAnnotationTypeIdsForSorting = PageStateUtils.getPsmAnnotationTypeIdsWhereSortOrderPopulated( { dataPageStateManager_DataFrom_Server, projectSearchId } );
        
        let requestObject = {
            projectSearchId : projectSearchId,
            psmIds, // Optional.  If provided, override psmIds retrieved based on searchDataLookupParams_For_Single_ProjectSearchId
            reportedPeptideId : reportedPeptideId,
            searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
            psmAnnotationTypeIdsForSorting : psmAnnotationTypeIdsForSorting,
        };
		
		return requestObject;
    }

    /**
     * Query the web serivice for PSM data for the supplied reported peptide id, populate
     * the supplied loadedData object
     * 
     * @param {*} param0 
     */
    static getPSMInfoForReportedPeptideFromWebService( { dataPageStateManager_DataFrom_Server, searchDetailsBlockDataMgmtProcessing, projectSearchId, psmIds,reportedPeptideId, loadedData } ) {        

		let objectThis = this;
                
		return new Promise( function( resolve, reject ) {
            try {
                let requestObject = objectThis.__createRequestForPSMInfoForReportedPeptideId( { dataPageStateManager_DataFrom_Server, searchDetailsBlockDataMgmtProcessing, projectSearchId, psmIds, reportedPeptideId } );

                const url = "d/rws/for-page/psb/psm-list";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { 
                    try { 
                        reject(); 
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {
                        loadedData.psmList = responseData.resultList;
                        loadedData.searchHasScanData = responseData.searchHasScanData;
                        loadedData.search_anyPsmHas_DynamicModifications = responseData.search_anyPsmHas_DynamicModifications;
                        loadedData.search_anyPsmHas_ReporterIons = responseData.search_anyPsmHas_ReporterIons;
                        loadedData.search_hasIsotopeLabel = responseData.search_hasIsotopeLabel;
                        loadedData.search_hasScanFilenames = responseData.search_hasScanFilenames;
                        loadedData.xxx = responseData.xxx;

                        resolve();

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
}