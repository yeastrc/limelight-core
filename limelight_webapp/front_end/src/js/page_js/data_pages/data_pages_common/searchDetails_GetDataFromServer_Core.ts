/**
 * searchDetails_GetDataFromServer_Core.ts
 * 
 * Javascript for Getting the Searches Details from the server webservice as HTML - Core HTML for Project Page and Search Details section on data pages
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////


//  module import 

// @ts-ignore
import Handlebars = require('handlebars/runtime');

// @ts-ignore
import _search_detail_section_bundle = require("../../../../../handlebars_templates_precompiled/search_detail_section_main_page/search_detail_section_main_page_template-bundle.js" );

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

/**
 * 
 */
export class SearchDetails_GetCoreDataFromServer {

	/**
	 * Getting the Searches Details from the server webservice as HTML - Core HTML for Project Page and Search Details section on data pages
     *
     * @param projectSearchIds - array of projectSearchIds to get details for
     * @returns Promise - Promise.resolve(...) is passed Map( <project search id>, <HTML> )
	 */
    getSearchDetails_CoreDataFromServer({ projectSearchIds }: { projectSearchIds: any }) : Promise<any> {

    	return _overall_getSearchDetails_CoreDataFromServer({ projectSearchIds });
	}
}

class Overall_AJAX_Response_Holder {

	coreDataFromServer: any
	searchNamesAndSubGroups: any
}

/**
 * Getting the Searches Details from the server webservice as HTML - Core HTML for Project Page and Search Details section on data pages
 *
 * @param projectSearchIds - array of projectSearchIds to get details for
 * @returns Promise - Promise.resolve(...) is passed Map( <project search id>, <HTML> )
 */
const _overall_getSearchDetails_CoreDataFromServer = function ({ projectSearchIds }: { projectSearchIds: any }) : Promise<any> {

	return new Promise((resolve,reject) => {
		try {
			const overall_AJAX_Response_Holder : Overall_AJAX_Response_Holder = {
				coreDataFromServer : undefined,
				searchNamesAndSubGroups : undefined
			}

			const promises : Array<Promise<any>> = [];

			{
				const promise = _getSearchDetails_CoreDataFromServer({ projectSearchIds, overall_AJAX_Response_Holder });
				promises.push( promise );
			}
			{
				const promise = _retrieveSearchNamesAndSubGroupsFromAJAX({ projectSearchIds, overall_AJAX_Response_Holder });
				promises.push( promise );
			}


			const promise_All = Promise.all( promises );

			promise_All.catch( reason => {
				reject( reason )
			})

			promise_All.then( (data) => {
				const promiseResponse = _getHTMLFromAJAXResponse( { overall_AJAX_Response_Holder } );

				resolve( { coreSearchDetails : promiseResponse } );
			})

		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );

			throw e;
		}
	});
}

/**
 * Getting the Searches Details from the server webservice - Core HTML for Project Page and Search Details section on data pages
 *
 * @param projectSearchIds - array of projectSearchIds to get data for
 */
const _getSearchDetails_CoreDataFromServer = function ({ projectSearchIds, overall_AJAX_Response_Holder } : {
	projectSearchIds: any
	overall_AJAX_Response_Holder : Overall_AJAX_Response_Holder
}) : Promise<any> {

	return new Promise<void>((resolve,reject) => {
		try {
			const requestObj = { projectSearchIds : projectSearchIds };

			const url = "d/rws/for-page/psb/get-search-details-core";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
				try {
					overall_AJAX_Response_Holder.coreDataFromServer = responseData

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
 * Getting the Searches Details from the server webservice - Core HTML for Project Page and Search Details section on data pages
 *
 * @param projectSearchIds - array of projectSearchIds to get data for
 */
const _retrieveSearchNamesAndSubGroupsFromAJAX = function ({ projectSearchIds, overall_AJAX_Response_Holder } : {
	projectSearchIds: any
	overall_AJAX_Response_Holder : Overall_AJAX_Response_Holder
}) : Promise<any> {

	let retrieval = (resolve: any, reject: any) => {
		try {
			let requestObj = {projectSearchIds};

			const url = "d/rws/for-page/psb/search-name-list-from-psi";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch(() => {
				try {
					reject();
				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
					throw e;
				}
			});

			promise_webserviceCallStandardPost.then(({responseData}: {responseData: any}) => {
				try {
					overall_AJAX_Response_Holder.searchNamesAndSubGroups = responseData;

					resolve();

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
					throw e;
				}

			});
		} catch (e) {
			reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
			throw e;
		}
	}

	return new Promise(retrieval);
}

/**
 *
 */
const _getHTMLFromAJAXResponse = function ( { overall_AJAX_Response_Holder } : { overall_AJAX_Response_Holder : Overall_AJAX_Response_Holder } ) {

	//  Template Bundle _search_detail_section_bundle

	if ( ! _search_detail_section_bundle.searchDetails_ExpandSearchContents ) {
		throw Error("Nothing in _search_detail_section_bundle.searchDetails_ExpandSearchContents");
	}
	const _searchDetails_ExpandSearchContents = _search_detail_section_bundle.searchDetails_ExpandSearchContents;

	const responseData = overall_AJAX_Response_Holder.coreDataFromServer;
	const searchNamesAndSubGroups = overall_AJAX_Response_Holder.searchNamesAndSubGroups;


	const searchNamesAndSubGroups_searchSubGroupsPerSearchList = searchNamesAndSubGroups.searchSubGroupsPerSearchList;
	const canEditSearchSubGroups = searchNamesAndSubGroups.canEditSearchSubGroups;

	const ajaxResults = responseData.results;

	const returnValue = new Map();

	for ( const ajaxResult of ajaxResults) {

		ajaxResult.canEditSearchSubGroups = canEditSearchSubGroups;

		const projectSearchId = ajaxResult.projectSearchId;

		if ( searchNamesAndSubGroups_searchSubGroupsPerSearchList ) {
			for (  const searchSubGroupsPerSearchList_Item of searchNamesAndSubGroups_searchSubGroupsPerSearchList ) {

				if ( searchSubGroupsPerSearchList_Item.projectSearchId === projectSearchId ) {

					//  Java Def: List<WebserviceResult_SearchSubgroupItem>
					const searchSubgroupItems = searchSubGroupsPerSearchList_Item.searchSubgroupItems;

					ajaxResult.subGroups = {
						searchSubgroupItems
					}
				}
			}
		}

		const html = _searchDetails_ExpandSearchContents( ajaxResult );

		returnValue.set( ajaxResult.projectSearchId, { data : ajaxResult, html : html } );
	}

	return returnValue;
}
