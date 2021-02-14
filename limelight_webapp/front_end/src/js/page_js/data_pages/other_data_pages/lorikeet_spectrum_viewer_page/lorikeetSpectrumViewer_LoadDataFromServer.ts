/**
 * lorikeetSpectrumViewer_LoadDataFromServer.ts
 * 
 * Javascript for  page lorikeetSpectrumViewerView.jsp 
 * 
 * Lorikeet Spectrum Viewer on it's own page
 * 
 * Load data from server
 * 
 */


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


//  module import 

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { DataPageStateManager, AnnotationTypeData_Root, AnnotationTypeItems_PerProjectSearchId, AnnotationTypeItem } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { AnnotationTypeDataRetrieval } from 'page_js/data_pages/data_pages_common/annotationTypeDataRetrieval';

import {AnnotationTypeData_ReturnSpecifiedTypes} from "page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes";


export class LorikeetSpectrumViewer_LoadDataFromServer {

    /**
     * 
     */
    lorikeetSpectrumViewer_LoadDataFromServer({ psmId, projectSearchId, openmodPosition, dataPageStateManager_DataFrom_Server } : {
        
        psmId: any,
        projectSearchId: any,
        openmodPosition: any
        dataPageStateManager_DataFrom_Server  : DataPageStateManager
    }) {

        return new Promise( ( resolve, reject ) => {
            try {
                const loadedDataFromServer = {};

                const loadSpectrumDataPromise = this._loadSpectrumData( { psmId, projectSearchId, openmodPosition, loadedDataFromServer } );

                const loadPSMPeptideDataPromise = this._loadPSMPeptideData( { psmId, projectSearchId, loadedDataFromServer, dataPageStateManager_DataFrom_Server } );
                                
                Promise.all( [ loadSpectrumDataPromise , loadPSMPeptideDataPromise ] ).then(function(value) {
                    try {
                        resolve({ loadedDataFromServer });

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }).catch( function( reason ) {
                    reject();
                })
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }); 
    }

    /**
     * 
     */
    _loadSpectrumData( { psmId, projectSearchId, openmodPosition, loadedDataFromServer }: { psmId: any, projectSearchId: any, openmodPosition: any, loadedDataFromServer: any } ) {
        
        return new Promise( function( resolve, reject ) {
                try {
                        console.log("AJAX Call to get Spectrum Data START, Now: " + new Date() );

                        let requestObject = {
                            psmId,
                            projectSearchId,
                            openmodPosition
                        };

                        const url = "d/rws/for-page/psb/spectrum-for-psm-id";

                        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;
        
                        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
        
                        promise_webserviceCallStandardPost.catch( () => { 
                            try {
                                //  newWindow not defined
                                // if ( newWindow ) {
                                //     newWindow.close(); // close here before call handleAJAXFailure(...) since that may reload the page
                                // }

                                reject();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        } );

                        promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
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
    _loadPSMPeptideData( { psmId, projectSearchId, loadedDataFromServer, dataPageStateManager_DataFrom_Server } : { 
        
        psmId: any,
        projectSearchId: any,
        loadedDataFromServer: any,
        dataPageStateManager_DataFrom_Server  : DataPageStateManager
    }  ) {
        
        return new Promise( ( resolve, reject ) => {
            try {

                // Build dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay for request to 'retrieveSearchAnnotationTypeData(...)'

                const dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = new DataPageStateManager();

                dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( [ projectSearchId ] );

                const annotationTypeDataRetrieval = new AnnotationTypeDataRetrieval();

                const retrieveAnnotationType_Promise =
                    annotationTypeDataRetrieval.retrieveSearchAnnotationTypeData( {
                        dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
                        dataPageStateManager_DataFrom_Server
                    } );

                if ( ! retrieveAnnotationType_Promise ) {
                    throw Error("retrieveAnnotationType_Promise is null or undefined");
                }

                retrieveAnnotationType_Promise.catch( () => { reject() });

                retrieveAnnotationType_Promise.then( () => {
                    try {
  
                        //  Pull Default PSM Ann Type Display 

                        const psmDefaultAnnTypeDisplay : Array<number> = this._get_psmDefaultAnnTypeDisplay({ projectSearchId, dataPageStateManager_DataFrom_Server });

                        const annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes({ dataPageStateManager_DataFrom_Server })

                        let psmAnnotationTypeIdsForSorting = annotationTypeData_ReturnSpecifiedTypes.get_Psm_AnnotationTypeIds_WhereSortOrderPopulated( { projectSearchId } );
                        
                        let requestObject = {
                            psmId : psmId,
                            projectSearchId : projectSearchId,
                            psmAnnTypeDisplay : psmDefaultAnnTypeDisplay,
                            psmAnnotationTypeIdsForSorting : psmAnnotationTypeIdsForSorting,
                        };
                        
                        console.log("AJAX Call to get PSM data for Spectrum Viewer window START, Now: " + new Date() );

                        const url = "d/rws/for-page/psb/psm-peptide-list-display-with-spectrum-viewer";

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

                        promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
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
                })
            } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
            }
        }); 
    }


    _get_psmDefaultAnnTypeDisplay({ projectSearchId, dataPageStateManager_DataFrom_Server } : {
        
        projectSearchId: any,
        dataPageStateManager_DataFrom_Server  : DataPageStateManager
    }) : Array<number> {

        const psmDefaultAnnTypeDisplay : Array<number> = [];
        
        const annotationTypeDataLoaded_Root : AnnotationTypeData_Root = dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

        const annotationTypeDataLoaded_SingleProjectSearchId : AnnotationTypeItems_PerProjectSearchId = annotationTypeDataLoaded_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
        if ( ! annotationTypeDataLoaded_SingleProjectSearchId ) {
            throw Error("No Data for annotationTypeDataLoaded_SingleProjectSearchIds for projectSearchId: " + projectSearchId );
        }
        const psmFilterableAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataLoaded_SingleProjectSearchId.psmFilterableAnnotationTypes;
        if ( psmFilterableAnnotationTypes_Map ) {
            this._add_psmDefaultAnnTypeDisplay_FilterableOrDescriptive({ annotationTypes_Map : psmFilterableAnnotationTypes_Map, psmDefaultAnnTypeDisplay });
        }
        const psmDescriptiveAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataLoaded_SingleProjectSearchId.psmDescriptiveAnnotationTypes;
        if ( psmDescriptiveAnnotationTypes_Map ) {
            this._add_psmDefaultAnnTypeDisplay_FilterableOrDescriptive({ annotationTypes_Map : psmDescriptiveAnnotationTypes_Map, psmDefaultAnnTypeDisplay });
        }

        return psmDefaultAnnTypeDisplay;
    }


    _add_psmDefaultAnnTypeDisplay_FilterableOrDescriptive({ annotationTypes_Map, psmDefaultAnnTypeDisplay } : { 
        
        annotationTypes_Map : Map<number, AnnotationTypeItem>, 
        psmDefaultAnnTypeDisplay : Array<number>
    }) : void {
        for ( const annotationTypes_Map_Entry of annotationTypes_Map.entries() ) {
            const annotationTypeEntry = annotationTypes_Map_Entry[ 1 ]; // value of map entry
            if ( annotationTypeEntry.defaultVisible ) {
                psmDefaultAnnTypeDisplay.push( annotationTypeEntry.annotationTypeId );
            }
        }
    }



	/**
	 * return Promise
	 */
	retrieveSearchNameFromServer({ projectSearchId }:{ projectSearchId: any }) {

        let retrieval = function( resolve: any, reject: any ) {
            try {
                let requestObj = { projectSearchIds : [ projectSearchId ] };

                const url = "d/rws/for-page/psb/search-name-list-from-psi";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => {
                    try { 
                        reject();
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    } 
                });

                promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
                    try {
                        resolve({ responseData });

                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }

        return new Promise( retrieval );
    }

        
	/**
	 * return Promise
	 */
	retrieveProjectTitleFromServer({ projectIdentifier }:{ projectIdentifier: any }) {

        let retrieval = function( resolve: any, reject: any ) {
            try {
                let requestObj = { projectIdentifier : projectIdentifier };

                const url = " d/rws/for-page/project-get-title";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => {
                    try { 
                        reject();
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    } 
                });

                promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
                    try {
                        resolve({ responseData });

                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }

        return new Promise( retrieval );
    }
}
