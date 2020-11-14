/*
 * Load initial data required for mod page.
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import {
    ReportedPeptide,
    ReportedPeptideVariableMod
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ReportedPeptide";

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
     * Get reported peptides for a search
     */
    getReportedPeptidesForProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId } ) : Promise<Map<number, ReportedPeptide>> {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let createRequestData_SingleProjectSearchId_For_getModData_Result = objectThis.__createRequestForModDataForSingleProjectSearchId( searchDetailsBlockDataMgmtProcessing, projectSearchId );

                let requestObject = createRequestData_SingleProjectSearchId_For_getModData_Result.requestObject;

                const url = "d/rws/for-page/psb/mod-page-special-protein-positions-var-mods-per-reported-peptide-single-project-search-id";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { reject() }  );

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {

                        console.log('responseData', responseData);

                        const responseMap = new Map<number, ReportedPeptide>();
                        for( const reportedPeptideId of Object.keys(responseData.resultRoot_Key_ReportedPeptideId) ) {
                            const dataOb = responseData.resultRoot_Key_ReportedPeptideId[reportedPeptideId];

                            const reportedPeptideString = dataOb.reportedPeptide;
                            const sequence = dataOb.sequence;

                            const proteinMatches = new Map<number, Array<number>>();
                            for( const proteinId of Object.keys(dataOb.proteinMatches)) {
                                proteinMatches.set(parseInt(proteinId), dataOb.proteinMatches[proteinId]);
                            }

                            const variableMods = new Map<number, ReportedPeptideVariableMod>();

                            if(dataOb.variable_mods !== null && dataOb.variable_mods !== undefined) {
                                for (const modMass of Object.keys(dataOb.variable_mods)) {
                                    const mod = new ReportedPeptideVariableMod({
                                        isNTerm: dataOb.variable_mods[modMass].nterm,
                                        isCTerm: dataOb.variable_mods[modMass].cterm,
                                        positions: dataOb.variable_mods[modMass].positions
                                    });

                                    variableMods.set(parseInt(modMass), mod);
                                }
                            }

                            const reportedPeptide = new ReportedPeptide({
                                reportedPeptideId:parseInt(reportedPeptideId),
                                reportedPeptideString:reportedPeptideString,
                                sequence:sequence,
                                proteinMatches:proteinMatches,
                                variableMods:variableMods
                            });

                            responseMap.set(parseInt(reportedPeptideId), reportedPeptide);
                        }

                        resolve(responseMap);

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
	__createRequestForProteinDataForSingleProjectSearchId( { projectSearchId, searchDetailsBlockDataMgmtProcessing } ) {


		// Validate that only 1 project search id since that is what this supports

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
	getProteinAnnotationDataForSingleProjectSearchId( { projectSearchId, searchDetailsBlockDataMgmtProcessing } ) {
		
		let objectThis = this;
        
		return new Promise( function( resolve, reject ) {
          try {
            let createRequestData_For_getProteinInfoList_Result = objectThis.__createRequestForProteinDataForSingleProjectSearchId( { projectSearchId, searchDetailsBlockDataMgmtProcessing } );
            let requestObject = createRequestData_For_getProteinInfoList_Result.requestObject;
 
			const url = "d/rws/for-page/psb/protein-info-searchcriteria-list";

      const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

      const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    console.log('got protein data', responseData);
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


    __createRequestForPSMDataForProjectSearchIdModMass( { searchDetailsBlockDataMgmtProcessing, projectSearchId, modMass } ) {

        let searchDataLookupParams_For_Single_ProjectSearchId =
            searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId : projectSearchId } );

        let requestObject = {
            projectSearchId : projectSearchId,
            searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
            modMassInteger : modMass
        };

        return requestObject;
    }

    getPSMDataForProjectSearchIdModMass( { searchDetailsBlockDataMgmtProcessing, projectSearchId, modMass } ) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let requestObject = objectThis.__createRequestForPSMDataForProjectSearchIdModMass( { searchDetailsBlockDataMgmtProcessing, projectSearchId, modMass } );

                const url = "d/rws/for-page/psb/mod-page-special-get-mod-info-per-rounded-mod-mass-cutoffs-single-project-search-id";

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

