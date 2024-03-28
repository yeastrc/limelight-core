/**
 * searchNameRetrieval.ts
 *
 * Javascript for managing the Searches Details and Searches Filter block
 * at the top of project search id driven pages
 *
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//module import 

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { limelight__IsVariableAString } from 'page_js/common_all_pages/limelight__IsVariableAString';
import { limelight__variable_is_type_number_Check } from 'page_js/common_all_pages/limelight__variable_is_type_number_Check';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';


/**
 *
 */
export class RetrieveSearchNamesFromServer_Result {

	readonly canEditSearchSubGroups: boolean
	readonly searchList: Array<RetrieveSearchNamesFromServer_Result_SingleSearch>
	readonly searchSubGroupsPerSearchList: Array<RetrieveSearchNamesFromServer_Result_SingleSearch_SubGroupData>
}

export class RetrieveSearchNamesFromServer_Result_SingleSearch {

	readonly name: string
	readonly searchShortName: string
	readonly projectSearchId: number
	readonly searchId: number
	readonly searchHasSubgroups: boolean
}

export class RetrieveSearchNamesFromServer_Result_SingleSearch_SubGroupData {

	readonly projectSearchId: number
	readonly searchId: number

	readonly searchSubgroupItems: Array<RetrieveSearchNamesFromServer_Result_SingleSearch_SubGroup_SingleItem>
}

export class RetrieveSearchNamesFromServer_Result_SingleSearch_SubGroup_SingleItem {

	readonly subgroupName_fromImportFile: string
	readonly subgroupName_Display_FromServer_IfUserEnteredAValue: string
	readonly subgroupName_Display: string
	readonly displayOrder: number
	readonly searchSubGroupId: number
}

/**
 *
 */
export const retrieveSearchNamesFromServer = function(
	{
		projectSearchIds
	} : {
		projectSearchIds: Array<number>
	}
): Promise<RetrieveSearchNamesFromServer_Result> {

	let retrieval = (resolve: any, reject: any) => {
		try {
			let requestObj = { projectSearchIds };

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

			promise_webserviceCallStandardPost.then(({responseData}:{responseData: any}) => {
				try {
					const result = _retrieveSearchNamesResponse(
						responseData
					);

					resolve(result);

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
const _retrieveSearchNamesResponse = function(
	responseData: any, //  Data from webservice
): RetrieveSearchNamesFromServer_Result {

	const retrieveSearchNamesFromServer_Result: RetrieveSearchNamesFromServer_Result = responseData as RetrieveSearchNamesFromServer_Result

	{
		let searchList = retrieveSearchNamesFromServer_Result.searchList;

		if (!searchList) {
			throw Error("Search List return is empty. ");
		}

		for (const searchListItem of searchList) {
			//  Validate searchListItem
			if (!limelight__IsVariableAString(searchListItem.name)) {
				const msg = "SearchNameRetrieval: searchListItem.name is not a string. searchListItem.name: " + searchListItem.name;
				console.warn(msg);
				throw Error(msg);
			}

			if ( searchListItem.searchShortName ) {
				if (!limelight__IsVariableAString(searchListItem.searchShortName)) {
					const msg = "SearchNameRetrieval: searchListItem.searchShortName is not a string. searchListItem.searchShortName: " + searchListItem.searchShortName;
					console.warn(msg);
					throw Error(msg);
				}
			}

			if (!limelight__variable_is_type_number_Check(searchListItem.projectSearchId)) {
				const msg = "SearchNameRetrieval: searchListItem.projectSearchId is not a number. searchListItem.projectSearchId: " + searchListItem.projectSearchId;
				console.warn(msg);
				throw Error(msg);
			}
			if (!limelight__variable_is_type_number_Check(searchListItem.searchId)) {
				const msg = "SearchNameRetrieval: searchListItem.searchId is not a number. searchListItem.searchId: " + searchListItem.searchId;
				console.warn(msg);
				throw Error(msg);
			}
		}
	}
	{
		if (retrieveSearchNamesFromServer_Result.searchSubGroupsPerSearchList) {

			for (const searchSubGroupsPerSearchEntry of retrieveSearchNamesFromServer_Result.searchSubGroupsPerSearchList) {

				//  Validate searchSubGroupsPerSearchEntry
				if (!limelight__variable_is_type_number_Check(searchSubGroupsPerSearchEntry.projectSearchId)) {
					const msg = "SearchNameRetrieval: searchSubGroupsPerSearchEntry.projectSearchId is not a number. searchSubGroupsPerSearchEntry.projectSearchId: " + searchSubGroupsPerSearchEntry.projectSearchId;
					console.warn(msg);
					throw Error(msg);
				}
				if (!limelight__variable_is_type_number_Check(searchSubGroupsPerSearchEntry.searchId)) {
					const msg = "SearchNameRetrieval: searchSubGroupsPerSearchEntry.searchId is not a number. searchSubGroupsPerSearchEntry.searchId: " + searchSubGroupsPerSearchEntry.searchId;
					console.warn(msg);
					throw Error(msg);
				}
				if ( ! searchSubGroupsPerSearchEntry.searchSubgroupItems ) {
					const msg = "SearchNameRetrieval: searchSubGroupsPerSearchEntry.searchSubgroupItems is not a populated.";
					console.warn(msg);
					throw Error(msg);
				}

				const searchSubGroupIds_Set = new Set<number>();

				for ( const searchSubGroupEntry of searchSubGroupsPerSearchEntry.searchSubgroupItems ) {

					//  Validate searchListItem
					if (!limelight__IsVariableAString(searchSubGroupEntry.subgroupName_fromImportFile)) {
						const msg = "SearchNameRetrieval: searchSubGroupEntry.subgroupName_fromImportFile is not a string. searchListItem.subgroupName_fromImportFile: " + searchSubGroupEntry.subgroupName_fromImportFile;
						console.warn(msg);
						throw Error(msg);
					}
					if (searchSubGroupEntry.subgroupName_Display_FromServer_IfUserEnteredAValue) {
						if (!limelight__IsVariableAString(searchSubGroupEntry.subgroupName_Display_FromServer_IfUserEnteredAValue)) {
							const msg = "SearchNameRetrieval: searchSubGroupEntry.subgroupName_Display_FromServer_IfUserEnteredAValue is not a string. searchListItem.subgroupName_Display_FromServer_IfUserEnteredAValue: " + searchSubGroupEntry.subgroupName_Display;
							console.warn(msg);
							throw Error(msg);
						}
					}
					if (searchSubGroupEntry.subgroupName_Display) {
						if (!limelight__IsVariableAString(searchSubGroupEntry.subgroupName_Display)) {
							const msg = "SearchNameRetrieval: searchSubGroupEntry.subgroupName_Display is not a string. searchListItem.subgroupName_Display: " + searchSubGroupEntry.subgroupName_Display;
							console.warn(msg);
							throw Error(msg);
						}
					}
					if ( searchSubGroupEntry.displayOrder ) {
						if (!limelight__variable_is_type_number_Check(searchSubGroupEntry.displayOrder)) {
							const msg = "SearchNameRetrieval: searchSubGroupEntry.displayOrder is not a number. searchListItem.displayOrder: " + searchSubGroupEntry.displayOrder;
							console.warn(msg);
							throw Error(msg);
						}
					}
					if (!limelight__variable_is_type_number_Check(searchSubGroupEntry.searchSubGroupId)) {
						const msg = "SearchNameRetrieval: searchSubGroupEntry.searchSubGroupId is not a number. searchListItem.searchSubGroupId: " + searchSubGroupEntry.searchSubGroupId;
						console.warn(msg);
						throw Error(msg);
					}

					if ( searchSubGroupIds_Set.has( searchSubGroupEntry.searchSubGroupId ) ) {
						const msg = "SearchNameRetrieval: searchSubGroupEntry.searchSubGroupId value found in more than one searchSubGroupEntry. searchListItem.searchSubGroupId: " + searchSubGroupEntry.searchSubGroupId;
						console.warn(msg);
						throw Error(msg);
					}

					searchSubGroupIds_Set.add( searchSubGroupEntry.searchSubGroupId )
				}
			}
		}
	}

	return retrieveSearchNamesFromServer_Result
}
