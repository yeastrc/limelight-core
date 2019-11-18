/**
 * lorikeetSpectrumViewer_createDataFor_PsmPeptideTable.js
 * 
 * Javascript for Creating the URL to open Lorikeet Viewer in it's own window
 * 
 * Create the data for displaying the Table of PSM/Peptide data
 * 
 */

import { TableDataUtils } from 'page_js/data_pages/data_tables/tableDataUtils.js';

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes.js';


//   !!!  Constants visible in this file/module


const LOCAL__PRECURSOR_M_OVER_Z_DIGITS_AFTER_DECIMAL_POINT = 4;

const LOCAL__RETENTION_TIME_MINUTES_DIGITS_AFTER_DECIMAL_POINT = 2;


/**
 * 
 */
export class CreatePsmPeptideTable_HeadersAndData {

	/**
	 * 
	 */
	createPsmPeptideTable_HeadersAndData( { psmId, projectSearchId, loadedDataFromServer, dataPageStateManager_DataFrom_Server } ) {

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
        let anyPsmsHave_reporterIonMassesDisplay = false;

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
				if ( dataObjectItem.reporterIonMassesDisplay !== undefined && dataObjectItem.reporterIonMassesDisplay !== null ) {
					anyPsmsHave_reporterIonMassesDisplay = true;
					break;
				}
            }
		}

    	
        let columns = [ ];
        
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
     * return dataObjectArray created using the data returned from a web service call for PSMs
     * 
     * @param {*} param0 
     */
    _createDataTableDataObjectArrayFromWebServiceResponse( { sorted_psmPeptideData, loadedDataFromServer } ) {

    	const dataTableDataObjectArray = [];
    	
		const primaryLorikeetData = loadedDataFromServer.primaryLorikeetData.data;
		const lorikeet_ScanData_RetentionTime_PrecursorMZ = loadedDataFromServer.primaryLorikeetData.lorikeet_ScanData_RetentionTime_PrecursorMZ;
    	
        for ( const psmObject of sorted_psmPeptideData ) {

            let dataObject = { };
            
            dataObject.uniqueId = psmObject.psmId;
            dataObject.id = psmObject.psmId;

            dataObject.reportedPeptideString = psmObject.reportedPeptideString;
            
            dataObject.scanNumber = primaryLorikeetData.scanNum;
            
			dataObject.charge = psmObject.charge;
			
			// 			psm_precursor_MZ: 5913.5679
			// psm_precursor_RetentionTime

			{
				let outputPrecursorMZ_Number = undefined;
				if ( psmObject.psm_precursor_MZ !== undefined && psmObject.psm_precursor_MZ !== null ) {
					//  Have value from PSM so use that
					outputPrecursorMZ_Number = psmObject.psm_precursor_MZ;

				} else if ( primaryLorikeetData.precursorMz !== undefined && primaryLorikeetData.precursorMz !== null ) {
					//  Have value from Scan so use that
					outputPrecursorMZ_Number = lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_precursorMZ;
				}
				if ( outputPrecursorMZ_Number !== undefined ) {
					dataObject.precursor_M_Over_Z_Display = outputPrecursorMZ_Number.toFixed( LOCAL__PRECURSOR_M_OVER_Z_DIGITS_AFTER_DECIMAL_POINT );
				}
			}
			
			{
				let outputRetentionTime_Number_Seconds = undefined;
				if ( psmObject.psm_precursor_RetentionTime !== undefined && psmObject.psm_precursor_RetentionTime !== null ) {
					//  Have value from PSM so use that
					outputRetentionTime_Number_Seconds = psmObject.psm_precursor_RetentionTime;

				} else if ( primaryLorikeetData.retentionTimeSeconds !== undefined && primaryLorikeetData.retentionTimeSeconds !== null ) {

					outputRetentionTime_Number_Seconds = lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_retentionTimeSeconds;
				}
				if ( outputRetentionTime_Number_Seconds !== undefined ) {
					const retentionTimeMinutesNumber = outputRetentionTime_Number_Seconds / 60;
					dataObject.retentionTimeMinutesDisplay = retentionTimeMinutesNumber.toFixed( LOCAL__RETENTION_TIME_MINUTES_DIGITS_AFTER_DECIMAL_POINT );
				}
			}
			{
				if ( psmObject.reporterIonMassList ) {

					const reporterIonMassAsString_List = [];
					for ( const reporterIonMass of psmObject.reporterIonMassList ) {
						const reporterIonMass_String = reporterIonMass.toString();
						reporterIonMassAsString_List.push( reporterIonMass_String );
					}
					const reporterIonMassesDisplay = reporterIonMassAsString_List.join(", ");
					dataObject.reporterIonMassesDisplay = reporterIonMassesDisplay;
				}
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
    
}
