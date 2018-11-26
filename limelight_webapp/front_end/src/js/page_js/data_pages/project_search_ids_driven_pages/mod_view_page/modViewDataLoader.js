/*
 * Load initial data required for mod page.
 */

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';
import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager.js';
import { PageStateUtils } from 'page_js/data_pages/data_tables/pageStateUtils.js';

export class ModViewPage_DataLoader {

	/**
	 * Called by getModData_SingleProjectSearchId to create a request
	 */
	__createRequestForModDataForSingleProjectSearchId( searchDetailsBlockDataMgmtProcessing, projectSearchId ) {

		let searchDataLookupParams_For_Single_ProjectSearchId = 
			searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId : projectSearchId } );
		
		let requestObject = {
				projectSearchId : projectSearchId,
				searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId
		};
		
		return {
			requestObject : requestObject
		};
	};
	
	/**
	 * Get Mod List To Render For Single Project Search Id
	 */
	getModDataForSingleProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId, loadedData } ) {

        let objectThis = this;

		return new Promise( function( resolve, reject ) {
            
            let createRequestData_SingleProjectSearchId_For_getModData_Result = objectThis.__createRequestForModDataForSingleProjectSearchId( searchDetailsBlockDataMgmtProcessing, projectSearchId );

            let requestObject = createRequestData_SingleProjectSearchId_For_getModData_Result.requestObject;
            
            let _URL = "d/rws/for-page/psb/protein-mod-info-searchcriteria-list/" + getWebserviceSyncTrackingCode();

            let requestData = JSON.stringify( requestObject );            

            // let request =
            $.ajax({
                type : "POST",
                url : _URL,
                data : requestData,
                contentType: _AJAX_POST_JSON_CONTENT_TYPE,
                dataType : "json",
                success : function(responseData) {
                    try {

                        loadedData.modData = responseData;
                        resolve();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                },
                failure: function(errMsg) {
                    handleAJAXFailure( errMsg );
                },
                error : function(jqXHR, textStatus, errorThrown) {

                    handleAJAXError(jqXHR, textStatus, errorThrown);

                    // alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
                    // textStatus: " + textStatus );
                }
            });
        });
	};


	/**
	 * Get total number of PSMs for search
	 */
	getTotalPSMCountForSingleProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId, loadedData } ) {

        let objectThis = this;

		return new Promise( function( resolve, reject ) {
            
            let createRequestData_SingleProjectSearchId_For_getModData_Result = objectThis.__createRequestForModDataForSingleProjectSearchId( searchDetailsBlockDataMgmtProcessing, projectSearchId );

            let requestObject = createRequestData_SingleProjectSearchId_For_getModData_Result.requestObject;
            
            let _URL = "d/rws/for-page/psb/psm-count-searchcriteria/" + getWebserviceSyncTrackingCode();

            let requestData = JSON.stringify( requestObject );            

            // let request =
            $.ajax({
                type : "POST",
                url : _URL,
                data : requestData,
                contentType: _AJAX_POST_JSON_CONTENT_TYPE,
                dataType : "json",
                success : function(responseData) {
                    try {

                        loadedData.totalPSMCount = responseData;

                        resolve();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                },
                failure: function(errMsg) {
                    handleAJAXFailure( errMsg );
                },
                error : function(jqXHR, textStatus, errorThrown) {

                    handleAJAXError(jqXHR, textStatus, errorThrown);

                    // alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
                    // textStatus: " + textStatus );
                }
            });
        });
	};

	//////

	/**
	 * Called by getProteinInfoList_SingleProjectSearchId to create a request.
	 */
	__createRequestForProteinDataForSingleProjectSearchId( { projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay } ) {


		// Validate that only 1 project search id since that is what this supports
		
		let projectSearchIds = // array
            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.getPageState( dataPageStateManager_Keys.PROJECT_SEARCH_IDS_DPSM );

		let searchDataLookupParams_For_Single_ProjectSearchId = 
			searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId : projectSearchId } );

		let requestObject = {
				searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
				projectSearchId : projectSearchId
		};
		
		return {
			requestObject : requestObject
		};
	};
		
	/**
	 * Get Protein Info List For Single Project Search Id
	 */
	getProteinAnnotationDataForSingleProjectSearchId( { projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, loadedData } ) {
		
		let objectThis = this;
        
        
		return new Promise( function( resolve, reject ) {

            let createRequestData_For_getProteinInfoList_Result = objectThis.__createRequestForProteinDataForSingleProjectSearchId( { projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay } );
            let requestObject = createRequestData_For_getProteinInfoList_Result.requestObject;
            let _URL = "d/rws/for-page/psb/protein-info-searchcriteria-list/" + getWebserviceSyncTrackingCode();
            let requestData = JSON.stringify( requestObject );            

            // let request =
            $.ajax({
                type : "POST",
                url : _URL,
                data : requestData,
                contentType: _AJAX_POST_JSON_CONTENT_TYPE,
                dataType : "json",
                success : function(data) {
                    try {

                        loadedData.proteinData = data;                        
                        resolve();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                },
                failure: function(errMsg) {
                    handleAJAXFailure( errMsg );
                },
                error : function(jqXHR, textStatus, errorThrown) {

                    handleAJAXError(jqXHR, textStatus, errorThrown);

                }
            });
        
        });

    };



	/**
	 * Called by getProteinPositionResidues to create a request
	 */
	__createRequestForProteinPositionResidues( { proteinsAndPositions, projectSearchId } ) {

		let requestObject = {
				projectSearchIds : [ projectSearchId ],
				proteinSequenceVersionIdsPositions : proteinsAndPositions
		};
        
		return {
			requestObject : requestObject
        };
	};

	getProteinPositionResidues( { projectSearchId, proteinsAndPositions, loadedData } ) {
		
		let objectThis = this;
        
        
		return new Promise( function( resolve, reject ) {

            let createRequestData_For_getProteinInfoList_Result = objectThis.__createRequestForProteinPositionResidues( { projectSearchId, proteinsAndPositions } );
            let requestObject = createRequestData_For_getProteinInfoList_Result.requestObject;
            let _URL = "d/rws/for-page/psb/protein-residues-for-prot-seq-ver-ids-positions/" + getWebserviceSyncTrackingCode();
            let requestData = JSON.stringify( requestObject );            

            // let request =
            $.ajax({
                type : "POST",
                url : _URL,
                data : requestData,
                contentType: _AJAX_POST_JSON_CONTENT_TYPE,
                dataType : "json",
                success : function(data) {
                    try {

                        loadedData.proteinPositionResidues = data.proteinSeqVId_Position_Residue;                        ;

                        resolve();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                },
                failure: function(errMsg) {
                    handleAJAXFailure( errMsg );
                },
                error : function(jqXHR, textStatus, errorThrown) {

                    handleAJAXError(jqXHR, textStatus, errorThrown);

                }
            });
        
        });

    };
    
    	/**
	 * Called by getModData_SingleProjectSearchId to create a request
	 */
	__createRequestForAminoAcidModStatsForSearch( { searchDetailsBlockDataMgmtProcessing, projectSearchId, residueArray } ) {

		let searchDataLookupParams_For_Single_ProjectSearchId = 
			searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId : projectSearchId } );
		
		let requestObject = {
				projectSearchId : projectSearchId,
                searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
                residues : residueArray
		};
		
		return {
			requestObject : requestObject
		};
    };
    
    getAminoAcidModStatsForSearch( { projectSearchId, searchDetailsBlockDataMgmtProcessing, residueArray, loadedData } ) {
        
		let objectThis = this;
                
		return new Promise( function( resolve, reject ) {

            let createRequestData_For_getProteinInfoList_Result = objectThis.__createRequestForAminoAcidModStatsForSearch( { projectSearchId, searchDetailsBlockDataMgmtProcessing, residueArray } );
            let requestObject = createRequestData_For_getProteinInfoList_Result.requestObject;
            let _URL = "d/rws/for-page/psb/psm-count-for-residues-searchcriteria/" + getWebserviceSyncTrackingCode();
            let requestData = JSON.stringify( requestObject );            

            // let request =
            $.ajax({
                type : "POST",
                url : _URL,
                data : requestData,
                contentType: _AJAX_POST_JSON_CONTENT_TYPE,
                dataType : "json",
                success : function(data) {
                    try {

                        loadedData.aminoAcidModStats = data;                        ;

                        resolve();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                },
                failure: function(errMsg) {
                    handleAJAXFailure( errMsg );
                },
                error : function(jqXHR, textStatus, errorThrown) {

                    handleAJAXError(jqXHR, textStatus, errorThrown);

                }
            });
        
        });

    };

	__createRequestForReportedPeptideInfoForReportedPeptideIdList( { dataPageStateManager_DataFrom_Server, searchDetailsBlockDataMgmtProcessing, projectSearchId, reportedPeptideIds } ) {

		let searchDataLookupParams_For_Single_ProjectSearchId = 
			searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId : projectSearchId } );
        
        let reportedPeptideAnnotationTypeIdsForSorting =
			PageStateUtils.getReportedPeptideAnnotationTypeIdsWhereSortOrderPopulated( { dataPageStateManager_DataFrom_Server, projectSearchId } );
		

		let requestObject = {
				projectSearchId : projectSearchId,
                searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
                reportedPeptideIds : reportedPeptideIds,
                returnModData : false,
                returnProteinData : false,
                reportedPeptideAnnotationTypeIdsForSorting : reportedPeptideAnnotationTypeIdsForSorting,
		};
		
		return requestObject;
    };

    getReportedPeptideInfoForReportedPeptideIdList( { dataPageStateManager_DataFrom_Server, searchDetailsBlockDataMgmtProcessing, projectSearchId, reportedPeptideIds, loadedData } ) {        

		let objectThis = this;
                
		return new Promise( function( resolve, reject ) {

            let requestObject = objectThis.__createRequestForReportedPeptideInfoForReportedPeptideIdList( { dataPageStateManager_DataFrom_Server, searchDetailsBlockDataMgmtProcessing, projectSearchId, reportedPeptideIds } );
            
            let _URL = "d/rws/for-page/psb/peptide-list-reported-peptide-ids-single-project-search-id/" + getWebserviceSyncTrackingCode();
            let requestData = JSON.stringify( requestObject );            

            // let request =
            $.ajax({
                type : "POST",
                url : _URL,
                data : requestData,
                contentType: _AJAX_POST_JSON_CONTENT_TYPE,
                dataType : "json",
                success : function(data) {
                    try {
                        loadedData.peptideList = data.peptideList;
                        resolve();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                },
                failure: function(errMsg) {
                    handleAJAXFailure( errMsg );
                },
                error : function(jqXHR, textStatus, errorThrown) {

                    handleAJAXError(jqXHR, textStatus, errorThrown);

                }
            });
        });
    }

}

