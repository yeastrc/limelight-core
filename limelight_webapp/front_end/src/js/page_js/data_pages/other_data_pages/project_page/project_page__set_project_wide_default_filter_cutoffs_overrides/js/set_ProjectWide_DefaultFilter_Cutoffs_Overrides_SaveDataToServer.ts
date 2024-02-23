/**
 * set_ProjectWide_DefaultFilter_Cutoffs_Overrides_SaveDataToServer.ts
 *
 *      Save Data To Server
 *
 * User enters Search Annotation default filter cutoffs that override the values from the imported file.
 *
 *    These are applied every time a search or searches are opened from the project page.
 *    These are applied every time a search is added to a new or existing experiment.
 *
 * Currently on Project Page - Opened from
 *
 */

import {
    Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result,
    Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_Type_PSM_Peptide_Protein
} from "page_js/data_pages/other_data_pages/project_page/project_page__set_project_wide_default_filter_cutoffs_overrides/js/set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";


/**
 * @throws Error if IsInvalid flag set on any entries
 */
export const set_ProjectWide_DefaultFilter_Cutoffs_Overrides_SaveDataToServer = function (
    {
        projectIdentifierFromURL,
        set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result
    } : {
        projectIdentifierFromURL: string
        set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result

    }) : Promise<void> {

    const cutoffValues = _create_saveObject({ set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result });

    return new Promise<void> ( ( resolve, reject ) => {
        try {

            let requestObj = {
                projectIdentifier: projectIdentifierFromURL,
                cutoffValues
            };

            const url = "d/rws/for-page/project-level-filter-default-cutoffs-override_MAINT--save";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {
                    if ( ! responseData.status ) {
                        reject("( ! responseData.status ). url: " + url )
                    }
                    resolve();

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException: e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException: e
            });
            throw e;
        }
    });
}

/**
 *
 * @param set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result
 *
 * @returns - foundInvalid true if any invalid, else cutoffValues object to send to server
 */
const _create_saveObject = function (
    {
        set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result
    } : {
        set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result
    }) : any {

    const cutoffValues = {
        reportedPeptideEntriesList: [],
        psmEntriesList: [],
        proteinEntriesList: []
    }

    for (const data_For_SearchProgram of set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result.data_Per_SearchProgram_Array) {

        const searchProgram_name = data_For_SearchProgram.searchProgram_name

        { //  Process PSM
            _create_saveObject_PerType_PSM_Peptide({
                    searchProgram_name,
                    data_PerType_Input: data_For_SearchProgram.data_PerType_PSM,
                    entriesList_Output: cutoffValues.psmEntriesList
                });
        }
        {//  Process Reported Peptide
            _create_saveObject_PerType_PSM_Peptide({
                    searchProgram_name,
                    data_PerType_Input: data_For_SearchProgram.data_PerType_Peptide,
                    entriesList_Output: cutoffValues.reportedPeptideEntriesList
                });
        }
        { //  Process Protein
            _create_saveObject_PerType_PSM_Peptide({
                searchProgram_name,
                data_PerType_Input: data_For_SearchProgram.data_PerType_Protein,
                entriesList_Output: cutoffValues.proteinEntriesList
            });
        }
    }

    return cutoffValues;
}

/**
 *
 * @param searchProgram_name
 * @param data_PerType_Input
 * @param entriesList_Output
 *
 * @returns foundInvalid true if any invalid
 */
const _create_saveObject_PerType_PSM_Peptide = function (
    {
        searchProgram_name,
        data_PerType_Input,
        entriesList_Output
    } : {
        searchProgram_name: string
        data_PerType_Input: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_Type_PSM_Peptide_Protein
        entriesList_Output: Array<any>

    }) : void {

    if ( ! data_PerType_Input ) {

        //  NO data for type so skip

        return; // EARLY RETURN
    }

    for ( const data_For_AnnotationType_Name of data_PerType_Input.data_Per_AnnotationType_Name_Array ) {

        if ( data_For_AnnotationType_Name.defaultValue_ProjectWide_Value_Is_Invalid ) {
            //  !!  Found entry with invalid value flag set
            const msg = "Found entry with invalid value: _create_saveObject_PerType_PSM_Peptide: ";
            console.warn( msg + " data_For_AnnotationType_Name: ", data_For_AnnotationType_Name );
            throw Error(msg)
        }

        if ( ! data_For_AnnotationType_Name.defaultValue_ProjectWide_String_InProgress ) {
            //  No value entered so skip
            continue;  // EARLY CONTINUE
        }

        const userEntered_GlobalDefault_String = data_For_AnnotationType_Name.defaultValue_ProjectWide_String_InProgress.trim();

        if ( userEntered_GlobalDefault_String === "" ) {
            //  No value entered so skip
            continue;  // EARLY CONTINUE
        }

        const userEntered_GlobalDefault_Number = Number.parseFloat( userEntered_GlobalDefault_String );
        if ( Number.isNaN( userEntered_GlobalDefault_Number ) ) {
            //  !!  Failed to parse
            const msg = " userEntered_GlobalDefault_String failed to parse: _create_saveObject_PerType_PSM_Peptide: userEntered_GlobalDefault_String: " + userEntered_GlobalDefault_String;
            console.warn( msg + ". data_For_AnnotationType_Name: ", data_For_AnnotationType_Name );
            throw Error(msg)
        }

        const outputEntry = {
            searchProgramName: searchProgram_name,
            annotationTypeName: data_For_AnnotationType_Name.annotationType_Name,
            annotationCutoffValue: userEntered_GlobalDefault_Number,
            annotationCutoffValueString: userEntered_GlobalDefault_String,
        };

        entriesList_Output.push( outputEntry );
    }
}

// private List<WebserviceRequestEntry>  reportedPeptideEntriesList;
// private List<WebserviceRequestEntry> psmEntriesList;
//
//
// private String searchProgramName;
// private String annotationTypeName;
// private double annotationCutoffValue;
// private String annotationCutoffValueString;
