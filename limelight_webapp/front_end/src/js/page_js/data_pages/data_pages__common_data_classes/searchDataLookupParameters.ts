/**
 * searchDataLookupParameters.ts
 * 
 * Typescript Class and child classes for the SearchDataLookupParameters data connected to the SearchDataLookupParameters Code
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { limelight__IsVariableAString } from 'page_js/common_all_pages/limelight__IsVariableAString'
import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';


//  !!!!!!!   This Full Object Graph needs to be able to serialize to JSON and Deserialize and match the Java code   !!!!!!!

//  Only use primitives (string, number) and Array

/**
 * Matches Java class SearchDataLookupParamsRoot
 */
class SearchDataLookupParameters_Root {


	versionNumber : number;

	/**
	 * Populate if the params are for project Search Ids
	 */
	paramsForProjectSearchIds : SearchDataLookupParams_For_ProjectSearchIds;
}


/**
 * For requests for Project Search Ids
 *
 */
class SearchDataLookupParams_For_ProjectSearchIds {

	paramsForProjectSearchIdsList : Array<SearchDataLookupParams_For_Single_ProjectSearchId> ;
}

/**
 * For requests for Single Project Search Id
 *
 */
class SearchDataLookupParams_For_Single_ProjectSearchId {

	projectSearchId : number;
	
	//  Filter values (cutoffs per annotation type)
	psmFilters : Array<SearchDataLookupParams_Filter_Per_AnnotationType>;
	reportedPeptideFilters : Array<SearchDataLookupParams_Filter_Per_AnnotationType>;
	matchedProteinFilters : Array<SearchDataLookupParams_Filter_Per_AnnotationType>;

	//  Annotation Type Ids to Display
	psmAnnTypeDisplay : Array<number>;
	reportedPeptideAnnTypeDisplay : Array<number>;
	matchedProteinAnnTypeDisplay : Array<number>;
}


/**
 * For requests for Single "Filter" per Annotation Type
 *
 * order on annotationTypeId
 */
class SearchDataLookupParams_Filter_Per_AnnotationType {

	/**
	 * Annotation Type Id
	 */
	annTypeId : number;
	value : number;
}

/////////////////

/**
 * Accept inputParsedJSON and validate all data and return Object Graph of Objects from classes starting at  
 * @param inputParsedJSON
 * @returns SearchDataLookupParameters_Root
 */
const copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root = function( inputParsedJSON : any ) : SearchDataLookupParameters_Root {

    if ( ! inputParsedJSON.versionNumber ) {
        const msg = "copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root: No value in inputParsedJSON.versionNumber: " + inputParsedJSON.versionNumber;
        console.warn( msg );
        throw Error( msg );
    }
    if ( ! variable_is_type_number_Check( inputParsedJSON.versionNumber ) ) {
        const msg = "copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root: No value in inputParsedJSON.versionNumber: " + inputParsedJSON.versionNumber;
        console.warn( msg );
        throw Error( msg );
    }

    const searchDataLookupParameters_Root = new SearchDataLookupParameters_Root();

    searchDataLookupParameters_Root.versionNumber = inputParsedJSON.versionNumber;

	const paramsForProjectSearchIds_Input = inputParsedJSON.paramsForProjectSearchIds;
    if ( paramsForProjectSearchIds_Input ) {
        
        const paramsForProjectSearchIds_Output = new SearchDataLookupParams_For_ProjectSearchIds();
        searchDataLookupParameters_Root.paramsForProjectSearchIds = paramsForProjectSearchIds_Output;

        const paramsForProjectSearchIdsList_Input = paramsForProjectSearchIds_Input.paramsForProjectSearchIdsList;
        if ( paramsForProjectSearchIdsList_Input ) {

            const paramsForProjectSearchIdsList_Output : Array<SearchDataLookupParams_For_Single_ProjectSearchId> = [];
            paramsForProjectSearchIds_Output.paramsForProjectSearchIdsList = paramsForProjectSearchIdsList_Output;

            for ( const paramsForProjectSearchIdsList_Entry_Input of paramsForProjectSearchIdsList_Input ) {

                const searchDataLookupParams_For_Single_ProjectSearchId_Output = new SearchDataLookupParams_For_Single_ProjectSearchId();
                paramsForProjectSearchIdsList_Output.push( searchDataLookupParams_For_Single_ProjectSearchId_Output );

                if ( ! paramsForProjectSearchIdsList_Entry_Input.projectSearchId ) {
                    const msg = "copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root: No value in paramsForProjectSearchIdsList_Entry_Input.projectSearchId: " 
                    + paramsForProjectSearchIdsList_Entry_Input.projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }
                if ( ! variable_is_type_number_Check( paramsForProjectSearchIdsList_Entry_Input.projectSearchId ) ) {
                    const msg = "copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root: No value in paramsForProjectSearchIdsList_Entry_Input.projectSearchId: " 
                    + paramsForProjectSearchIdsList_Entry_Input.projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                searchDataLookupParams_For_Single_ProjectSearchId_Output.projectSearchId = paramsForProjectSearchIdsList_Entry_Input.projectSearchId;

                searchDataLookupParams_For_Single_ProjectSearchId_Output.reportedPeptideFilters = _copyFilters( paramsForProjectSearchIdsList_Entry_Input.reportedPeptideFilters, "reportedPeptideFilters" );
                searchDataLookupParams_For_Single_ProjectSearchId_Output.psmFilters = _copyFilters( paramsForProjectSearchIdsList_Entry_Input.psmFilters, "psmFilters" );
                searchDataLookupParams_For_Single_ProjectSearchId_Output.matchedProteinFilters = _copyFilters( paramsForProjectSearchIdsList_Entry_Input.matchedProteinFilters, "matchedProteinFilters" );

                searchDataLookupParams_For_Single_ProjectSearchId_Output.reportedPeptideAnnTypeDisplay = _copyAnnTypeDisplay( paramsForProjectSearchIdsList_Entry_Input.reportedPeptideAnnTypeDisplay, "reportedPeptideAnnTypeDisplay" );
                searchDataLookupParams_For_Single_ProjectSearchId_Output.psmAnnTypeDisplay = _copyAnnTypeDisplay( paramsForProjectSearchIdsList_Entry_Input.psmAnnTypeDisplay, "psmAnnTypeDisplay" );
                searchDataLookupParams_For_Single_ProjectSearchId_Output.matchedProteinAnnTypeDisplay = _copyAnnTypeDisplay( paramsForProjectSearchIdsList_Entry_Input.matchedProteinAnnTypeDisplay, "matchedProteinAnnTypeDisplay" );
            }
        }
    }

    return searchDataLookupParameters_Root;
}

/**
 * Internal
 */
const _copyFilters = function( filters_Input : any, typeLabel : string ) : Array<SearchDataLookupParams_Filter_Per_AnnotationType> {

    if ( ! filters_Input ) {
        return undefined;
    }
    if ( ! ( filters_Input instanceof Array ) ) {
        const msg = "copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root: Filter is not type Array: typeLabel: " + typeLabel;
        console.warn( msg );
        throw Error( msg );
    }

    const filters_Output : Array<SearchDataLookupParams_Filter_Per_AnnotationType> = [];

    for ( const filterEntry_Input of filters_Input ) {

        if ( filterEntry_Input.annTypeId === undefined || filterEntry_Input.annTypeId === null ) {
            const msg = "copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root: No value in filterEntry_Input.annTypeId: " 
            + filterEntry_Input.annTypeId
            + ", typeLabel: " + typeLabel;
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! variable_is_type_number_Check( filterEntry_Input.annTypeId ) ) {
            const msg = "copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root: Not a Number: filterEntry_Input.annTypeId: " 
            + filterEntry_Input.annTypeId
            + ", typeLabel: " + typeLabel;
            console.warn( msg );
            throw Error( msg );
        }
        if ( filterEntry_Input.value === undefined || filterEntry_Input.value === null ) {
            const msg = "copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root: No value in filterEntry_Input.value: " 
            + filterEntry_Input.value
            + ", typeLabel: " + typeLabel;
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! variable_is_type_number_Check( filterEntry_Input.value ) ) {
            const msg = "copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root: Not a Number: filterEntry_Input.value: " 
            + filterEntry_Input.value
            + ", typeLabel: " + typeLabel;
            console.warn( msg );
            throw Error( msg );
        }

        const filterEntry_Output = new SearchDataLookupParams_Filter_Per_AnnotationType();

        filterEntry_Output.annTypeId = filterEntry_Input.annTypeId;
        filterEntry_Output.value = filterEntry_Input.value;

        filters_Output.push( filterEntry_Output );
    }

    return filters_Output;
}

/**
 * Internal
 */
const _copyAnnTypeDisplay = function( annTypeDisplays_Input : any, typeLabel : string ) : Array<number> {

    if ( ! annTypeDisplays_Input ) {
        return undefined;
    }
    if ( ! ( annTypeDisplays_Input instanceof Array ) ) {
        const msg = "copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root: Filter is not type Array: typeLabel: " + typeLabel;
        console.warn( msg );
        throw Error( msg );
    }

    const annTypeDisplays_Output : Array<number> = [];

    for ( const annTypeDisplayEntry_Input of annTypeDisplays_Input ) {

        if ( annTypeDisplayEntry_Input === undefined || annTypeDisplayEntry_Input === null ) {
            const msg = "copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root: No value in annTypeDisplayEntry_Input: " 
            + annTypeDisplayEntry_Input
            + ", typeLabel: " + typeLabel;
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! variable_is_type_number_Check( annTypeDisplayEntry_Input ) ) {
            const msg = "copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root: Not a Number: annTypeDisplayEntry_Input: " 
            + annTypeDisplayEntry_Input
            + ", typeLabel: " + typeLabel;
            console.warn( msg );
            throw Error( msg );
        }

        annTypeDisplays_Output.push( annTypeDisplayEntry_Input );
    }

    return annTypeDisplays_Output;
}


export { 
    SearchDataLookupParameters_Root, SearchDataLookupParams_For_ProjectSearchIds, SearchDataLookupParams_For_Single_ProjectSearchId, SearchDataLookupParams_Filter_Per_AnnotationType,
    copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root
}

