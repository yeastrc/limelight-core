/**
 * defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval.ts
 *
 * Javascript for retrieving Default Filter Cutoff Overrides set at Project Wide
 *
 *
 */


import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 *
 */
export class DefaultFilter_Cutoffs_Overrides_ProjectWide_Root {

    defaultFilter_Cutoffs_Overrides_PSM: DefaultFilter_Cutoffs_Overrides_ProjectWide_PerType_PSM_ReportedPeptide_MatchedProtein
    defaultFilter_Cutoffs_Overrides_ReportedPeptide: DefaultFilter_Cutoffs_Overrides_ProjectWide_PerType_PSM_ReportedPeptide_MatchedProtein
    defaultFilter_Cutoffs_Overrides_MatchedProtein: DefaultFilter_Cutoffs_Overrides_ProjectWide_PerType_PSM_ReportedPeptide_MatchedProtein
    defaultFilter_Cutoffs_Overrides_ModificationPosition: DefaultFilter_Cutoffs_Overrides_ProjectWide_PerType_PSM_ReportedPeptide_MatchedProtein

    private _onlyToForceUseContructor() {}
}

export class DefaultFilter_Cutoffs_Overrides_ProjectWide_PerType_PSM_ReportedPeptide_MatchedProtein {

    defaultFilter_Cutoffs_Overrides_Per_SearchProgramName: Map<string, DefaultFilter_Cutoffs_Overrides_ProjectWide_Per_SearchProgramName> = new Map()

    private _onlyToForceUseContructor() {}
}

export class DefaultFilter_Cutoffs_Overrides_ProjectWide_Per_SearchProgramName {

    searchProgramName: string
    defaultFilter_Cutoffs_Overrides_Per_AnnotationTypeName: Map<string, DefaultFilter_Cutoffs_Overrides_ProjectWide_Per_AnnotationTypeName> = new Map()

    private _onlyToForceUseContructor() {}
}

export class DefaultFilter_Cutoffs_Overrides_ProjectWide_Per_AnnotationTypeName {

    annotationType_Name: string

    defaultValue_ProjectWide_Number: number
    defaultValue_ProjectWide_String: string

    private _onlyToForceUseContructor() {}
}

/**
 *
 *
 * @param projectIdentifier
 */
export const defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval = function (
    {
        projectIdentifier
    } : {
        projectIdentifier : string

    }) : Promise<DefaultFilter_Cutoffs_Overrides_ProjectWide_Root> {

    return new Promise<DefaultFilter_Cutoffs_Overrides_ProjectWide_Root> ( ( resolve, reject ) => {
        try {
            const promise = _defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Get_Data_FromServer({ projectIdentifier });

            promise.catch( reason => {
                reject(reason)
            });

            promise.then( (webserviceResult) => {

                const result = _processWebserviceResult( webserviceResult );

                resolve( result )

            })
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
 */
const _defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Get_Data_FromServer = function (
    {
        projectIdentifier
    } : {
        projectIdentifier : string
    }) : Promise<any> {

    return new Promise ( ( resolve, reject ) => {
        try {

            let requestObj = {
                projectIdentifier: projectIdentifier
            };

            const url = "d/rws/for-page/project-level-filter-default-cutoffs-override-maint--get";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {

                    resolve({ responseData });

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
 * @param response
 */
const _processWebserviceResult = function ( response ) : DefaultFilter_Cutoffs_Overrides_ProjectWide_Root {

    if ( ! response.responseData ) {
        const msg = "_processWebserviceResult: ( ! response.responseData )"
        console.warn( msg)
        throw Error(msg)
    }

    const responseData = response.responseData;
    const cutoffValues = responseData.cutoffValues

    const reportedPeptideEntriesList = cutoffValues.reportedPeptideEntriesList;
    const psmEntriesList = cutoffValues.psmEntriesList;
    const proteinEntriesList = cutoffValues.proteinEntriesList
    const modificationPositionEntriesList = cutoffValues.modificationPositionEntriesList

    const result = new DefaultFilter_Cutoffs_Overrides_ProjectWide_Root();
    result.defaultFilter_Cutoffs_Overrides_ReportedPeptide =
        _processWebserviceResult_Type_PSM_ReportedPeptide_MatchedProtein({ webservice_Response_ForType_List : reportedPeptideEntriesList });
    result.defaultFilter_Cutoffs_Overrides_PSM =
        _processWebserviceResult_Type_PSM_ReportedPeptide_MatchedProtein({ webservice_Response_ForType_List : psmEntriesList });
    result.defaultFilter_Cutoffs_Overrides_MatchedProtein =
        _processWebserviceResult_Type_PSM_ReportedPeptide_MatchedProtein({ webservice_Response_ForType_List : proteinEntriesList });
    result.defaultFilter_Cutoffs_Overrides_ModificationPosition =
        _processWebserviceResult_Type_PSM_ReportedPeptide_MatchedProtein({ webservice_Response_ForType_List : modificationPositionEntriesList });
    return result;
}


/**
 *
 * @param response
 */
const _processWebserviceResult_Type_PSM_ReportedPeptide_MatchedProtein = function (
    {
        webservice_Response_ForType_List
    } : {
        webservice_Response_ForType_List: any

    } ) : DefaultFilter_Cutoffs_Overrides_ProjectWide_PerType_PSM_ReportedPeptide_MatchedProtein {

    let result_ForType : DefaultFilter_Cutoffs_Overrides_ProjectWide_PerType_PSM_ReportedPeptide_MatchedProtein = null;

    if ( webservice_Response_ForType_List ) {
        if ( ! ( webservice_Response_ForType_List instanceof Array ) ) {
            const msg = "result_get_ProjectWide_DefaultFilter_Cutoffs_Overrides_Get_ExistingData_FromServer: ( ! ( webservice_Response_ForType_List instanceof Array ) ): "
            console.warn( msg + "  webservice_Response_ForType_List: ", webservice_Response_ForType_List )
            throw Error(msg)
        }

        if ( webservice_Response_ForType_List.length > 0 ) {

            result_ForType = new DefaultFilter_Cutoffs_Overrides_ProjectWide_PerType_PSM_ReportedPeptide_MatchedProtein();

            for (const webservice_Response_ForType_Entry of webservice_Response_ForType_List) {

                const searchProgramName = webservice_Response_ForType_Entry.searchProgramName;
                const annotationTypeName = webservice_Response_ForType_Entry.annotationTypeName;
                const annotationCutoffValue = webservice_Response_ForType_Entry.annotationCutoffValue;
                const annotationCutoffValueString = webservice_Response_ForType_Entry.annotationCutoffValueString;

                if ( searchProgramName === undefined || annotationTypeName === undefined || annotationCutoffValue === undefined || annotationCutoffValueString === undefined ) {
                    const msg = "webservice_Response_ForType_Entry: ( searchProgramName === undefined || annotationTypeName === undefined || annotationCutoffValue === undefined || annotationCutoffValueString === undefined )"
                    console.warn(msg + "  webservice_Response_ForType_Entry: ", webservice_Response_ForType_Entry)
                    throw Error(msg)
                }
                if ( ! limelight__IsVariableAString( searchProgramName ) ) {
                    const msg = "webservice_Response_ForType_Entry: ( ! limelight__IsVariableAString( searchProgramName ) )"
                    console.warn(msg + "  webservice_Response_ForType_Entry: ", webservice_Response_ForType_Entry)
                    throw Error(msg)
                }
                if ( ! limelight__IsVariableAString( annotationTypeName ) ) {
                    const msg = "webservice_Response_ForType_Entry: ( ! limelight__IsVariableAString( annotationTypeName ) )"
                    console.warn(msg + "  webservice_Response_ForType_Entry: ", webservice_Response_ForType_Entry)
                    throw Error(msg)
                }
                if ( ! limelight__IsVariableAString( annotationCutoffValueString ) ) {
                    const msg = "webservice_Response_ForType_Entry: ( ! limelight__IsVariableAString( annotationCutoffValueString ) )"
                    console.warn(msg + "  webservice_Response_ForType_Entry: ", webservice_Response_ForType_Entry)
                    throw Error(msg)
                }

                if ( ! variable_is_type_number_Check( annotationCutoffValue ) ) {
                    const msg = "webservice_Response_ForType_Entry:  ( ! variable_is_type_number_Check( annotationCutoffValue ) )"
                    console.warn(msg + "  webservice_Response_ForType_Entry: ", webservice_Response_ForType_Entry)
                    throw Error(msg)
                }

                let data_For_SearchProgram = result_ForType.defaultFilter_Cutoffs_Overrides_Per_SearchProgramName.get( searchProgramName );
                if ( ! data_For_SearchProgram ) {
                    data_For_SearchProgram = new DefaultFilter_Cutoffs_Overrides_ProjectWide_Per_SearchProgramName();
                    data_For_SearchProgram.searchProgramName = searchProgramName;
                    result_ForType.defaultFilter_Cutoffs_Overrides_Per_SearchProgramName.set( searchProgramName, data_For_SearchProgram );
                }

                if ( data_For_SearchProgram.defaultFilter_Cutoffs_Overrides_Per_AnnotationTypeName.has( annotationTypeName ) ) {
                    const msg = "webservice_Response_ForType_Entry: ( data_For_SearchProgram.defaultFilter_Cutoffs_Overrides_Per_AnnotationTypeName.has( annotationTypeName ) ). annotationTypeName: " +
                        annotationTypeName + ", searchProgramName: " + searchProgramName;
                    console.warn(msg + "  webservice_Response_ForType_Entry: ", webservice_Response_ForType_Entry)
                    throw Error(msg)
                }

                const data_For_AnnotationType_Name = new DefaultFilter_Cutoffs_Overrides_ProjectWide_Per_AnnotationTypeName();

                data_For_AnnotationType_Name.defaultValue_ProjectWide_Number = annotationCutoffValue
                data_For_AnnotationType_Name.defaultValue_ProjectWide_String = annotationCutoffValueString;
                data_For_AnnotationType_Name.annotationType_Name = annotationTypeName;

                data_For_SearchProgram.defaultFilter_Cutoffs_Overrides_Per_AnnotationTypeName.set( annotationTypeName, data_For_AnnotationType_Name );
            }
        }
    }

    return result_ForType;

}
