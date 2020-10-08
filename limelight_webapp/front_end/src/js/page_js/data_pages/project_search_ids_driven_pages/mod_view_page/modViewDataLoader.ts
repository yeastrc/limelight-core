/*
 * Load initial data required for mod page.
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { PageStateUtils } from 'page_js/data_pages/data_tables/pageStateUtils';

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
	}
	
	/**
	 * Get Mod List To Render For Single Project Search Id
	 */
	getModDataForSingleProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId, loadedData } ) {

        let objectThis = this;

		return new Promise( function( resolve, reject ) {
        try {
            let createRequestData_SingleProjectSearchId_For_getModData_Result = objectThis.__createRequestForModDataForSingleProjectSearchId( searchDetailsBlockDataMgmtProcessing, projectSearchId );

            let requestObject = createRequestData_SingleProjectSearchId_For_getModData_Result.requestObject;
                  
            const url = "d/rws/for-page/psb/protein-mod-info-searchcriteria-list";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    loadedData.modData = responseData;
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
	 * Get total number of PSMs for search
	 */
	getTotalPSMCountForSingleProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId } ) {

        let objectThis = this;

		return new Promise( function( resolve, reject ) {
          try {
            let createRequestData_SingleProjectSearchId_For_getModData_Result = objectThis.__createRequestForModDataForSingleProjectSearchId( searchDetailsBlockDataMgmtProcessing, projectSearchId );

            let requestObject = createRequestData_SingleProjectSearchId_For_getModData_Result.requestObject;

			const url = "d/rws/for-page/psb/psm-count-searchcriteria";

          const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

          const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    resolve(responseData);

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
     * Get psm-level mod data
     */
    getScanModDataForSingleProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId, loadedData } ) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let createRequestData_SingleProjectSearchId_For_getModData_Result = objectThis.__createRequestForModDataForSingleProjectSearchId( searchDetailsBlockDataMgmtProcessing, projectSearchId );

                let requestObject = createRequestData_SingleProjectSearchId_For_getModData_Result.requestObject;

                const url = "d/rws/for-page/psb/mod-page-special-get-mods-per-scans-single-project-search-id";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { reject() }  );

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {
                        loadedData.scanModData = responseData;
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
     * Get scan-level mod data
     */
    getPSMModDataForSingleProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId, loadedData } ) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let createRequestData_SingleProjectSearchId_For_getModData_Result = objectThis.__createRequestForModDataForSingleProjectSearchId( searchDetailsBlockDataMgmtProcessing, projectSearchId );

                let requestObject = createRequestData_SingleProjectSearchId_For_getModData_Result.requestObject;

                const url = "d/rws/for-page/psb/mod-page-special-get-mods-per-psms-single-project-search-id";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { reject() }  );

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {
                        loadedData.psmModData = responseData;
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
     * Get total number of scans for search
     */
    getTotalScanCountForSingleProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId } ) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let createRequestData_SingleProjectSearchId_For_getModData_Result = objectThis.__createRequestForModDataForSingleProjectSearchId( searchDetailsBlockDataMgmtProcessing, projectSearchId );

                let requestObject = createRequestData_SingleProjectSearchId_For_getModData_Result.requestObject;

                const url = "d/rws/for-page/psb/scan-count-searchcriteria";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { reject() }  );

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {
                        resolve(responseData);

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

	//////

	/**
	 * Called by getProteinInfoList_SingleProjectSearchId to create a request.
	 */
	__createRequestForProteinDataForSingleProjectSearchId( { projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay } ) {


		// Validate that only 1 project search id since that is what this supports
		
		let projectSearchIds = // array
            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		let searchDataLookupParams_For_Single_ProjectSearchId = 
			searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId : projectSearchId } );

		let requestObject = {
				searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
				projectSearchId : projectSearchId
		};
		
		return {
			requestObject : requestObject
		};
	}
		
	/**
	 * Get Protein Info List For Single Project Search Id
	 */
	getProteinAnnotationDataForSingleProjectSearchId( { projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, loadedData } ) {
		
		let objectThis = this;
        
		return new Promise( function( resolve, reject ) {
          try {
            let createRequestData_For_getProteinInfoList_Result = objectThis.__createRequestForProteinDataForSingleProjectSearchId( { projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay } );
            let requestObject = createRequestData_For_getProteinInfoList_Result.requestObject;
 
			const url = "d/rws/for-page/psb/protein-info-searchcriteria-list";

      const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

      const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    loadedData.proteinData = responseData;                        
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
	}

	getProteinPositionResidues( { projectSearchId, proteinsAndPositions, loadedData } ) {
		
		let objectThis = this;
        
        
		return new Promise( function( resolve, reject ) {
          try {
            let createRequestData_For_getProteinInfoList_Result = objectThis.__createRequestForProteinPositionResidues( { projectSearchId, proteinsAndPositions } );
            let requestObject = createRequestData_For_getProteinInfoList_Result.requestObject;

			const url = "d/rws/for-page/psb/protein-residues-for-prot-seq-ver-ids-positions";

      const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

      const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    loadedData.proteinPositionResidues = responseData.proteinSeqVId_Position_Residue;
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
  }
    
    getAminoAcidModStatsForSearch( { projectSearchId, searchDetailsBlockDataMgmtProcessing, residueArray, loadedData } ) {
        
		let objectThis = this;
                
		return new Promise( function( resolve, reject ) {
          try {
            let createRequestData_For_getProteinInfoList_Result = objectThis.__createRequestForAminoAcidModStatsForSearch( { projectSearchId, searchDetailsBlockDataMgmtProcessing, residueArray } );
            let requestObject = createRequestData_For_getProteinInfoList_Result.requestObject;

			const url = "d/rws/for-page/psb/psm-count-for-residues-searchcriteria";

      const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

      const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    loadedData.aminoAcidModStats = responseData;
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
  }

    getReportedPeptideInfoForReportedPeptideIdList( { dataPageStateManager_DataFrom_Server, searchDetailsBlockDataMgmtProcessing, projectSearchId, reportedPeptideIds, loadedData } ) {        

		let objectThis = this;
                
		return new Promise( function( resolve, reject ) {
          try {
            let requestObject = objectThis.__createRequestForReportedPeptideInfoForReportedPeptideIdList( { dataPageStateManager_DataFrom_Server, searchDetailsBlockDataMgmtProcessing, projectSearchId, reportedPeptideIds } );

			const url = "d/rws/for-page/psb/peptide-list-reported-peptide-ids-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;
            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    loadedData.peptideList = responseData.peptideList;
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

    __createRequestForOpenModDataForProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId } ) {

        let searchDataLookupParams_For_Single_ProjectSearchId =
            searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId : projectSearchId } );

        let requestObject = {
            projectSearchId : projectSearchId,
            searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId
        };

        return requestObject;
    }

    getPSMModDataForProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId } ) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let requestObject = objectThis.__createRequestForOpenModDataForProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId } );

                const url = "d/rws/for-page/psb/mod-page-special-get-mods-per-psms-single-project-search-id";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;
                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { reject() }  );

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {
                        resolve(responseData.resultRoot);

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

    getScanModDataForProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId } ) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let requestObject = objectThis.__createRequestForOpenModDataForProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId } );

                const url = "d/rws/for-page/psb/mod-page-special-get-mods-per-scans-single-project-search-id";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;
                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { reject() }  );

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {
                        resolve(responseData.resultRoot);

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

