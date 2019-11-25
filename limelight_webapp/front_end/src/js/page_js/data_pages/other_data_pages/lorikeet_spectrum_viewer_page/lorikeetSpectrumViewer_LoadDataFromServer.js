/**
 * lorikeetSpectrumViewer_LoadDataFromServer.js
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


const Handlebars = require('handlebars/runtime');

//  for DataTable
const _common_template_bundle =
	require("../../../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );


//  module import 

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager.ts';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { AnnotationTypeDataRetrieval } from 'page_js/data_pages/data_pages_common/annotationTypeDataRetrieval.js';

import { PageStateUtils } from 'page_js/data_pages/data_tables/pageStateUtils.js';


export class LorikeetSpectrumViewer_LoadDataFromServer {

    /**
     * 
     */
    lorikeetSpectrumViewer_LoadDataFromServer({ psmId, projectSearchId, dataPageStateManager_DataFrom_Server }) {

        return new Promise( ( resolve, reject ) => {
            try {
                const loadedDataFromServer = {};

                const loadSpectrumDataPromise = this._loadSpectrumData( { psmId, projectSearchId, loadedDataFromServer } );

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
    _loadSpectrumData( { psmId, projectSearchId, loadedDataFromServer } ) {
        
        return new Promise( function( resolve, reject ) {
                try {
                        console.log("AJAX Call to get Spectrum Data START, Now: " + new Date() );

                        let requestObject = {
                                psmId : psmId,
                                projectSearchId : projectSearchId
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
    _loadPSMPeptideData( { psmId, projectSearchId, loadedDataFromServer, dataPageStateManager_DataFrom_Server } ) {
        
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

                        const psmDefaultAnnTypeDisplay = this._get_psmDefaultAnnTypeDisplay({ projectSearchId, dataPageStateManager_DataFrom_Server });

                        let psmAnnotationTypeIdsForSorting = PageStateUtils.getPsmAnnotationTypeIdsWhereSortOrderPopulated( { dataPageStateManager_DataFrom_Server, projectSearchId } );
                        
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
                })
            } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
            }
        }); 
    }


    _get_psmDefaultAnnTypeDisplay({ projectSearchId, dataPageStateManager_DataFrom_Server }) {

        const psmDefaultAnnTypeDisplay = [];
        //  Object, key is project search id
        const annotationTypeDataLoaded_AllProjectSearchIds = dataPageStateManager_DataFrom_Server.get_annotationTypeData()

        const annotationTypeDataLoaded_SingleProjectSearchId = annotationTypeDataLoaded_AllProjectSearchIds[ projectSearchId ];
        if ( ! annotationTypeDataLoaded_SingleProjectSearchId ) {
            throw Error("No Data for annotationTypeDataLoaded_SingleProjectSearchIds for projectSearchId: " + projectSearchId );
        }
        const psmFilterableAnnotationTypes = annotationTypeDataLoaded_SingleProjectSearchId.psmFilterableAnnotationTypes;
        if ( psmFilterableAnnotationTypes ) {
            this._add_psmDefaultAnnTypeDisplay_FilterableOrDescriptive({ annotationTypes : psmFilterableAnnotationTypes, psmDefaultAnnTypeDisplay });
        }
        const psmDescriptiveAnnotationTypes = annotationTypeDataLoaded_SingleProjectSearchId.psmDescriptiveAnnotationTypes;
        if ( psmDescriptiveAnnotationTypes ) {
            this._add_psmDefaultAnnTypeDisplay_FilterableOrDescriptive({ annotationTypes : psmDescriptiveAnnotationTypes, psmDefaultAnnTypeDisplay });
        }

        return psmDefaultAnnTypeDisplay;
    }

    _add_psmDefaultAnnTypeDisplay_FilterableOrDescriptive({ annotationTypes, psmDefaultAnnTypeDisplay }) {
        const annotationTypesKeys = Object.keys( annotationTypes );
        for ( const objKey of annotationTypesKeys ) {
            const annotationTypeEntry = annotationTypes[ objKey ];
            if ( annotationTypeEntry.defaultVisible ) {
                psmDefaultAnnTypeDisplay.push( annotationTypeEntry.annotationTypeId );
            }
        }
    }



	/**
	 * return Promise
	 */
	retrieveSearchNameFromServer({ projectSearchId }) {

        let retrieval = function( resolve, reject ) {
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

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
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
	retrieveProjectTitleFromServer({ projectIdentifier }) {

        let retrieval = function( resolve, reject ) {
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

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
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
