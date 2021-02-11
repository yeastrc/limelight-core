/*
 * Load initial data required for mod page.
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import {
    ReportedPeptide,
    ReportedPeptideVariableMod
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ReportedPeptide";
import {PsmScanInfo} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/PsmScanInfo";
import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";

export class ModViewPage_DataLoader {

    /**
     * Called by getModData_SingleProjectSearchId to create a request
     */
    __createRequestForSingleProjectSearchIdCutoffs( searchDataLookupParams : SearchDataLookupParams_For_Single_ProjectSearchId, projectSearchId: number ) {

        let requestObject = {
            projectSearchId : projectSearchId,
            searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams
        };

        return requestObject;
    }

    /**
     * Get scan data (scan numbers, scan file names, etc) for all psms for this project search id that meet
     * the passed-in filters
     */
    getScanDataForSingleProjectSearchId(
        {
            searchDataLookupParams,
            projectSearchId
        } : {
            searchDataLookupParams : SearchDataLookupParams_For_Single_ProjectSearchId
            projectSearchId: number
        } ) : Promise<Map<number, PsmScanInfo>> {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let createRequestData_SingleProjectSearchId_For_getModData_Result = objectThis.__createRequestForSingleProjectSearchIdCutoffs( searchDataLookupParams, projectSearchId );

                let requestObject = createRequestData_SingleProjectSearchId_For_getModData_Result;

                const url = "d/rws/for-page/psb/psm-info-per-reported-peptide-id-for-searchcriteria-single-project-search-id";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { reject() }  );

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {

                        console.log('responseData', responseData);

                        const scanFileIdNameMap:Map<number, string> = new Map();
                        if(responseData.scanFileInfo) {
                            for(const dataObject of responseData.scanFileInfo) {
                                scanFileIdNameMap.set(dataObject.scanFilenameId, dataObject.scanFilename);
                            }
                        }

                        const psmScanInfoMap:Map<number, PsmScanInfo> = new Map();

                        for(const dataObject of responseData.reportedPeptideId_psmIdList_List) {
                            for(const psmItem of dataObject.psms) {
                                const psmId = psmItem.psmId;
                                const scanNumber = psmItem.scanNumber;
                                const scanFilenameId = psmItem.scanFilenameId;
                                const scanFilename = (scanFilenameId && scanFileIdNameMap.has(scanFilenameId)) ? scanFileIdNameMap.get(scanFilenameId) : null;

                                psmScanInfoMap.set(psmId, new PsmScanInfo({psmId, scanNumber, scanFilenameId, scanFilename}));
                            }
                        }

                        console.log('psmScanInfoMap', psmScanInfoMap);
                        resolve(psmScanInfoMap);

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
    getTotalPSMCountForSingleProjectSearchId(
        {
            searchDataLookupParams,
            projectSearchId
        } : {
            searchDataLookupParams : SearchDataLookupParams_For_Single_ProjectSearchId
            projectSearchId: number
        } ) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let createRequestData_SingleProjectSearchId_For_getModData_Result = objectThis.__createRequestForSingleProjectSearchIdCutoffs( searchDataLookupParams, projectSearchId );

                let requestObject = createRequestData_SingleProjectSearchId_For_getModData_Result;

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
            searchDataLookupParams,
            projectSearchId
        } : {
            searchDataLookupParams : SearchDataLookupParams_For_Single_ProjectSearchId
            projectSearchId: number
        } ) : Promise<Map<number, ReportedPeptide>> {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let createRequestData_SingleProjectSearchId_For_getModData_Result = objectThis.__createRequestForSingleProjectSearchIdCutoffs( searchDataLookupParams, projectSearchId );

                let requestObject = createRequestData_SingleProjectSearchId_For_getModData_Result;

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
            searchDataLookupParams,
            projectSearchId
        } : {
            searchDataLookupParams : SearchDataLookupParams_For_Single_ProjectSearchId
            projectSearchId: number
        } ) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let createRequestData_SingleProjectSearchId_For_getModData_Result = objectThis.__createRequestForSingleProjectSearchIdCutoffs( searchDataLookupParams, projectSearchId );

                let requestObject = createRequestData_SingleProjectSearchId_For_getModData_Result;

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

    /**
     * Get Protein Info List For Single Project Search Id
     */
    getProteinAnnotationDataForSingleProjectSearchId(
        {
            projectSearchId,
            searchDataLookupParams
        } : {
            projectSearchId: number
            searchDataLookupParams : SearchDataLookupParams_For_Single_ProjectSearchId
        } ) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let createRequestData_For_getProteinInfoList_Result = objectThis.__createRequestForSingleProjectSearchIdCutoffs( searchDataLookupParams, projectSearchId );
                let requestObject = createRequestData_For_getProteinInfoList_Result;

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

    getPSMModDataForProjectSearchId(
        {
            searchDataLookupParams,
            projectSearchId
        } : {
            searchDataLookupParams : SearchDataLookupParams_For_Single_ProjectSearchId
            projectSearchId: number
        }) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let requestObject = objectThis.__createRequestForSingleProjectSearchIdCutoffs( searchDataLookupParams, projectSearchId );

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
            searchDataLookupParams,
            projectSearchId
        } : {
            searchDataLookupParams : SearchDataLookupParams_For_Single_ProjectSearchId
            projectSearchId: number
        } ) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let requestObject = objectThis.__createRequestForSingleProjectSearchIdCutoffs( searchDataLookupParams, projectSearchId );

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
            searchDataLookupParams,
            projectSearchId,
            modMasses
        } : {
            searchDataLookupParams : SearchDataLookupParams_For_Single_ProjectSearchId,
            projectSearchId: number,
            modMasses:Array<number>
        } ) {

        let requestObject = {
            projectSearchId : projectSearchId,
            searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams,
            modMassesInteger : modMasses
        };

        return requestObject;
    }

    getPSMDataForProjectSearchIdModMasses(
        {
            searchDataLookupParams,
            projectSearchId,
            modMasses
        } : {
            searchDataLookupParams : SearchDataLookupParams_For_Single_ProjectSearchId,
            projectSearchId: number,
            modMasses : Array<number>
        } ) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let requestObject = objectThis.__createRequestForPSMDataForProjectSearchIdModMasses( { searchDataLookupParams, projectSearchId, modMasses } );

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
            searchDataLookupParams,
            projectSearchId,
            modMass
        } : {
            searchDataLookupParams : SearchDataLookupParams_For_Single_ProjectSearchId,
            projectSearchId: number,
            modMass
        } ) {

        let objectThis = this;

        return new Promise( function( resolve, reject ) {
            try {
                let requestObject = objectThis.__createRequestForPSMDataForProjectSearchIdModMasses( { searchDataLookupParams, projectSearchId, modMasses:[modMass] } );

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

    getOpenModPSMDataForProjectSearchId(
        {
            searchDataLookupParams,
            projectSearchId
        } : {
            searchDataLookupParams : SearchDataLookupParams_For_Single_ProjectSearchId,
            projectSearchId: number
        } ): Promise<Map<number, Map<number, Map<number, any>>>> {

        console.log('called getOpenModPSMDataForProjectSearchId()');

        let objectThis = this;

        return new Promise<Map<number, Map<number, Map<number, any>>>>( function( resolve, reject ) {
            try {
                let requestObject = objectThis.__createRequestForSingleProjectSearchIdCutoffs( searchDataLookupParams, projectSearchId );

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

