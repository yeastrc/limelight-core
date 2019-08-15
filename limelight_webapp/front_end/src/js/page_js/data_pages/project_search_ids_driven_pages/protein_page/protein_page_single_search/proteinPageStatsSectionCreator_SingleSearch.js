/**
 * proteinPageStatsSectionCreator_SingleSearch.js
 * 
 * Javascript for proteinView.jsp page - Holds Loaded Data Per Project Search Id  
 * 
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost.js';

import { ProteinViewPage_StatsSection } from './proteinPageStatsSection.jsx';

/**
 * 
 */
export class ProteinViewPage_StatsSectionCreator_SingleSearch {

	/**
	 * 
	 */
	constructor({ loadedDataPerProjectSearchIdHolder }) {

        this._loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;

        this._show_status_linkClick_BindThis = this._show_status_linkClick.bind(this);
    }

	/**
	 * Called from ProteinViewPage_Display_SingleSearch._renderToPageProteinList(...)  in proteinViewPage_DisplayData_SingleSearch.js
     * 
     * @param proteinListData - computed data when generate protein list
	 */
    setProteinListData({ projectSearchId, proteinListData }) {

        this._projectSearchId = projectSearchId;

        this._proteinListData = proteinListData;

    }

	/**
	 * Will be called repeatedly so either track or remove and add
	 */
    addDisplayClickHandler() {

        const show_status_linkDOM = document.getElementById("show_status_link");

        if ( show_status_linkDOM === undefined || show_status_linkDOM === null ) {
            throw Error("No DOM element with id 'show_status_link'");
        }

        show_status_linkDOM.removeEventListener( "click", this._show_status_linkClick_BindThis );

        show_status_linkDOM.addEventListener("click", this._show_status_linkClick_BindThis );

        // const $show_status_linkDOM = $( show_status_linkDOM );

        // $show_status_linkDOM.show();

        show_status_linkDOM.style.display = ""; // show


        const containerDOMElement = document.getElementById("stats_data_container");

        if ( containerDOMElement === undefined || containerDOMElement === null ) {
            throw Error("No DOM element with id 'stats_data_container'");
        }

        containerDOMElement.style.display = "none"; // hide

    }

    _show_status_linkClick(event) {

        event.preventDefault();

        this._getDataAndPopulateStatsSection();

    }

	/**
	 * 
	 */
    _getDataAndPopulateStatsSection( ) {

        const promise_getDataStatsSection = this._getDataStatsSection();

        promise_getDataStatsSection.then( ({ statsDataFromServer }) => {
            try {
                this._populateStatsSection({ statsDataFromServer });

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    }
    
	/**
	 * 
	 */
    _getDataStatsSection( ) {
        return new Promise( ( resolve, reject ) => {
            try {
                const promisesArray = [];

                const ms2ScanCounts_ForSearchCached = this._loadedDataPerProjectSearchIdHolder.get_ms2ScanCounts_ForSearch();

                if ( ! ms2ScanCounts_ForSearchCached ) {

                    const promise_getMS2CountsFromServer = this._getMS2CountsFromServer();

                    promisesArray.push( promise_getMS2CountsFromServer );
                }

                const reportedPeptideIds = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

                const promise_getReportedPeptideIdsHaveDynamicModifications_FromServer = this._getReportedPeptideIdsHaveDynamicModifications_FromServer({ reportedPeptideIds });

                promisesArray.push( promise_getReportedPeptideIdsHaveDynamicModifications_FromServer );

                const promisesAll = Promise.all( promisesArray );
                promisesAll.catch( (reason) => { 
                    try {
                        reject( reason ) 
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                } );

                promisesAll.then( (results) => {
                    try {
                        const statsDataFromServer = { ms2CountsFromServerResponse : ms2ScanCounts_ForSearchCached };
                        if ( results ) {
                            //  Process promise resolve values from the promises
                            for ( const result of results ) {
                                if ( result.ms2CountsFromServerResponse ) {
                                    statsDataFromServer.ms2CountsFromServerResponse = result.ms2CountsFromServerResponse;
                                }
                                if ( result.reportedPeptideIdsHaveDynamicModificationsResult ) {
                                    statsDataFromServer.reportedPeptideIdsHaveDynamicModificationsResult = result.reportedPeptideIdsHaveDynamicModificationsResult;
                                }
                            }
                        }
                        resolve({ statsDataFromServer });
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
    _getMS2CountsFromServer( ) {
		return new Promise( ( resolve, reject ) => {
            try {
                let requestObject = {
                    projectSearchId : this._projectSearchId
                };

                console.log("AJAX Call to get ms2 count START, Now: " + new Date() );

                const url = "d/rws/for-page/psb/ms2-count-single-project-search-id";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { reject() }  );

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {
                        console.log("AJAX Call to get ms2 count END, Now: " + new Date() );

                        this._loadedDataPerProjectSearchIdHolder.set_ms2ScanCounts_ForSearch( responseData );

                        resolve({ ms2CountsFromServerResponse : responseData });

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
    _getReportedPeptideIdsHaveDynamicModifications_FromServer({ reportedPeptideIds }) {
		return new Promise( ( resolve, reject ) => {
            try {
                let requestObject = {
                    projectSearchId : this._projectSearchId,
                    reportedPeptideIds
                };

                console.log("AJAX Call to get reported peptides have dynamic mods START, Now: " + new Date() );

                const url = "d/rws/for-page/psb/reported-peptides-have-dynamic-mods";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { reject() }  );

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {
                        console.log("AJAX Call to get reported peptides have dynamic mods END, Now: " + new Date() );

                        resolve({ reportedPeptideIdsHaveDynamicModificationsResult : responseData.data });

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

    ///////////////////////////

	/**
	 * 
	 */
    _populateStatsSection({ statsDataFromServer }) {


        const containerDOMElement = document.getElementById("stats_data_container");

        if ( containerDOMElement === undefined || containerDOMElement === null ) {
            throw Error("No DOM element with id 'stats_data_container'");
        }

        const ms2CountsFromServerResponse = statsDataFromServer.ms2CountsFromServerResponse;
        const reportedPeptideIdsHaveDynamicModificationsResult = statsDataFromServer.reportedPeptideIdsHaveDynamicModificationsResult;

        const { psmCount_Modified, psmCount_NOT_Modified } = this._getPSMCountsModifiedUnModified({ reportedPeptideIdsHaveDynamicModificationsResult })

        const data = Object.assign( {}, this._proteinListData ); // create new object, copying all properties 

        if ( ms2CountsFromServerResponse.searchHasScanData ) {
            data.ms2ScanCount = ms2CountsFromServerResponse.ms2Count;
        } else {
            data.ms2ScanCount = "NA";
        }
        data.psmsNoVariableModsCount = psmCount_NOT_Modified;
        data.psmsYesVariableModsCount = psmCount_Modified;
        
        const callbackFcn = undefined;

        const renderedReactComponent = ReactDOM.render( 
            <ProteinViewPage_StatsSection data={ data } />, 
            containerDOMElement,
            callbackFcn 
        );

        containerDOMElement.style.display = ""; // show

    }

	/**
	 * 
	 */
    _getPSMCountsModifiedUnModified({ reportedPeptideIdsHaveDynamicModificationsResult }) {

        let psmCount_Modified = 0;
        let psmCount_NOT_Modified = 0;

        const numPsmsForReportedPeptideIdMap = this._loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

        for ( const reportedPeptideIdsHaveDynamicModificationsEntry of reportedPeptideIdsHaveDynamicModificationsResult ) {
            const reportedPeptideId = reportedPeptideIdsHaveDynamicModificationsEntry.reportedPeptideId;
            const hasDynamicMods = reportedPeptideIdsHaveDynamicModificationsEntry.hasDynamicMods;

            const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
            if ( numPsmsForReportedPeptideId === undefined || numPsmsForReportedPeptideId === null ) {
                throw Error("No value in numPsmsForReportedPeptideIdMap for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + this._projectSearchId );
            }
            if ( hasDynamicMods ) {
                psmCount_Modified += numPsmsForReportedPeptideId;
            } else {
                psmCount_NOT_Modified += numPsmsForReportedPeptideId;
            }
        }

        return { psmCount_Modified, psmCount_NOT_Modified };
    }
}

