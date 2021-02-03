/*
 * Load initial data required for mod page.
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import {
    ReportedPeptide,
    ReportedPeptideVariableMod
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ReportedPeptide";
import {SearchDetailsBlockDataMgmtProcessing} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";

export class ModViewPage_DataLoader {

    /**
     * Called by getModData_SingleProjectSearchId to create a request
     */
    __createRequestForModDataForSingleProjectSearchId( searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing, projectSearchId: number ) {

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
    getTotalPSMCountForSingleProjectSearchId(
        {
            searchDetailsBlockDataMgmtProcessing,
            projectSearchId
        } : {
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            projectSearchId: number
        } ) {

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
    getReportedPeptidesForProjectSearchId(
        {
            searchDetailsBlockDataMgmtProcessing,
            projectSearchId
        } : {
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            projectSearchId: number
        } ) : Promise<Map<number, ReportedPeptide>> {

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
    getTotalScanCountForSingleProjectSearchId(
        {
            searchDetailsBlockDataMgmtProcessing,
            projectSearchId
        } : {
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            projectSearchId: number
        } ) {

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
    __createRequestForProteinDataForSingleProjectSearchId(
        {
            projectSearchId,
            searchDetailsBlockDataMgmtProcessing
        } : {
            projectSearchId: number
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
        } ) {

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
    getProteinAnnotationDataForSingleProjectSearchId(
        {
            projectSearchId,
            searchDetailsBlockDataMgmtProcessing
        } : {
            projectSearchId: number
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
        } ) {

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


    __createRequestForOpenModDataForProjectSearchId(
        {
            searchDetailsBlockDataMgmtProcessing,
            projectSearchId
        } : {
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            projectSearchId: number
        }
    ) {

        let searchDataLookupParams_For_Single_ProjectSearchId =
            searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId : projectSearchId } );

        let requestObject = {
            projectSearchId : projectSearchId,
            searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId
        };

        return requestObject;
    }

    getPSMModDataForProjectSearchId(
        {
            searchDetailsBlockDataMgmtProcessing,
            projectSearchId
        } : {
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            projectSearchId: number
        }) {

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

    getScanModDataForProjectSearchId(
        {
            searchDetailsBlockDataMgmtProcessing,
            projectSearchId
        } : {
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            projectSearchId: number
        } ) {

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

    __createRequestForPSMDataForProjectSearchIdModMasses(
        {
            searchDetailsBlockDataMgmtProcessing,
            projectSearchId,
            modMasses
        } : {
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            projectSearchId: number,
            modMasses:Array<number>
        } ) {

        let searchDataLookupParams_For_Single_ProjectSearchId =
            searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId : projectSearchId } );

        let requestObject = {
            projectSearchId : projectSearchId,
            searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
            modMassesInteger : modMasses
        };

        return requestObject;
    }

    getPSMDataForProjectSearchIdModMasses(
        {
            searchDetailsBlockDataMgmtProcessing,
            projectSearchId,
            modMasses
        } : {
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            projectSearchId: number,
            modMasses : Array<number>
        } ) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let requestObject = objectThis.__createRequestForPSMDataForProjectSearchIdModMasses( { searchDetailsBlockDataMgmtProcessing, projectSearchId, modMasses } );

                const url = "d/rws/for-page/psb/mod-page-special-get-mod-info-per-rounded-mod-masses-cutoffs-single-project-search-id";

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

    getPSMDataForProjectSearchIdModMass(
        {
            searchDetailsBlockDataMgmtProcessing,
            projectSearchId,
            modMass
        } : {
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            projectSearchId: number,
            modMass
        } ) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let requestObject = objectThis.__createRequestForPSMDataForProjectSearchIdModMasses( { searchDetailsBlockDataMgmtProcessing, projectSearchId, modMasses:[modMass] } );

                const url = "d/rws/for-page/psb/mod-page-special-get-mod-info-per-rounded-mod-masses-cutoffs-single-project-search-id";

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

    __createRequestForOpenModPSMDataForProjectSearchId(
        {
            searchDetailsBlockDataMgmtProcessing,
            projectSearchId
        } : {
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            projectSearchId: number
        } ) {

        let searchDataLookupParams_For_Single_ProjectSearchId =
            searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId : projectSearchId } );

        let requestObject = {
            projectSearchId : projectSearchId,
            searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId
        };

        return requestObject;
    }
    getOpenModPSMDataForProjectSearchId(
        {
            searchDetailsBlockDataMgmtProcessing,
            projectSearchId
        } : {
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            projectSearchId: number
        } ): Promise<Map<number, Map<number, Map<number, any>>>> {

        console.log('called getOpenModPSMDataForProjectSearchId()');

        let objectThis = this;

        return new Promise<Map<number, Map<number, Map<number, any>>>>( function( resolve, reject ) {
            try {
                let requestObject = objectThis.__createRequestForOpenModPSMDataForProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId } );

                const url = "d/rws/for-page/psb/mod-page-special-get-open-mod-info-for-cutoffs-single-project-search-id";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;
                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { reject() }  );

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {

                        console.log('responseData', responseData);

                        // keyed on mod mass, reported peptide id
                        const myResponse = new Map<number, Map<number, Map<number, any>>>();

                        for(const modMass of Object.keys(responseData.resultRoot)) {
                            const modMassInt = parseInt(modMass);
                            myResponse.set(modMassInt, new Map());

                            for(const psmItem of responseData.resultRoot[modMass]) {
                                const reportedPeptideId = psmItem.reportedPeptideId;
                                const psmId = psmItem.psmId;
                                if(!(myResponse.get(modMassInt).has(reportedPeptideId))) {
                                    myResponse.get(modMassInt).set(reportedPeptideId, new Map());
                                }

                                myResponse.get(modMassInt).get(reportedPeptideId).set(psmId, psmItem);
                            }
                        }

                        console.log('myresponse', myResponse);
                        resolve(myResponse);

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

