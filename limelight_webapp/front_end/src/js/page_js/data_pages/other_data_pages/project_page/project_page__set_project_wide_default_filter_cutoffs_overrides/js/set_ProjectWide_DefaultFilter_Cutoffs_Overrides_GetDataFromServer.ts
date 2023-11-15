/**
 * set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer.ts
 *
 *      Get Data From Server
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
    AnnotationTypeData_Root,
    DataPageStateManager,
    SearchProgramsPerSearchData_Root
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {AnnotationTypeDataRetrieval} from "page_js/data_pages/data_pages_common/annotationTypeDataRetrieval";
import {SearchProgramsPerSearchDataRetrieval} from "page_js/data_pages/data_pages_common/searchProgramsPerSearchDataRetrieval";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval,
    DefaultFilter_Cutoffs_Overrides_ProjectWide_PerType_PSM_ReportedPeptide_MatchedProtein,
    DefaultFilter_Cutoffs_Overrides_ProjectWide_Root
} from "page_js/data_pages/data_pages_common/defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval";
import {getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";

/**
 *
 */
export class Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result {

    data_Per_SearchProgram_Array: Array<Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_SearchProgram>

    data_Per_SearchProgram_Map_Key_searchProgramName : Map<string, Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_SearchProgram>

    private _onlyToForceUseContructor() {}
}

/**
 *
 */
export class Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_SearchProgram {

    searchProgram_name: string
    data_PerType_PSM: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_Type_PSM_Peptide_Protein
    data_PerType_Peptide: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_Type_PSM_Peptide_Protein

    private _onlyToForceUseContructor() {}
}

/**
 *
 */
export class Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_Type_PSM_Peptide_Protein {

    data_Per_AnnotationType_Name_Array: Array<Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_AnnotationType_Name>

    data_Per_AnnotationType_Name_Map_Key_AnnotationName: Map<string, Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_AnnotationType_Name>

    private _onlyToForceUseContructor() {}
}

/**
 *
 */
export class Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_AnnotationType_Name {

    defaultValue_ProjectWide_Value_Is_Invalid: boolean

    annotationType_Name: string

    defaultValue_ProjectWide_Number_FromDB: number
    defaultValue_ProjectWide_String_FromDB: string

    defaultValue_ProjectWide_String_InProgress: string

    defaultValues_From_AnnotationType_Records_DisplayString: string
    defaultValues_From_AnnotationType_Records_Set: Set<number>

    private _onlyToForceUseContructor() {}
}

/////////

class Internal_Intermediate_GetFromServer_Result {
    annotationTypeData_Root: AnnotationTypeData_Root
    searchProgramsPerSearchData_Root: SearchProgramsPerSearchData_Root
    defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result: DefaultFilter_Cutoffs_Overrides_ProjectWide_Root
}

/**
 *
 */
export const set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer = function (
    {
        projectIdentifierFromURL
    } : {
        projectIdentifierFromURL: string
    }) : Promise<Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result> {


    return new Promise<Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result>((resolve,reject) => {
        try {
            const promise_getSearches = getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds({ projectIdentifier: projectIdentifierFromURL });

            promise_getSearches.catch( (reason) => {
                reject( reason )
            })

            promise_getSearches.then( searchesSearchTagsFolders_Result_Root => {

                const projectSearchIds : Array<number> = Array.from( searchesSearchTagsFolders_Result_Root.get_all_Searches_ProjectSearchIds_Set() );

                const promise_primary = _getPrimaryData({ projectIdentifierFromURL, projectSearchIds });

                promise_primary.catch( reason => {
                    reject(reason);
                })

                promise_primary.then( (internal_Intermediate_GetFromServer_Result) => {

                    const result = _create_Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result( internal_Intermediate_GetFromServer_Result );

                    //  NEED:  Add in existing Default Cutoff Overrides

                    _populate_Arrays_From_Maps_And_Sort__ROOT(  result )

                    resolve( result )
                });
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    } );
}

/**
 *
 */
const _getPrimaryData = function (
    {
        projectIdentifierFromURL,
        projectSearchIds
    } : {
        projectIdentifierFromURL: string
        projectSearchIds: Array<number>

    }) : Promise<Internal_Intermediate_GetFromServer_Result> {

    return new Promise<Internal_Intermediate_GetFromServer_Result>((resolve,reject) => {
        try {
            //  Build DataPageStateManager instances to use existing code to retrieve data

            const dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = new DataPageStateManager();

            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( projectSearchIds );

            //  Data retrieved will be placed here
            const dataPageStateManager_DataFrom_Server = new DataPageStateManager();

            const annotationTypeDataRetrieval = new AnnotationTypeDataRetrieval();

            const promise_retrieveSearchAnnotationTypeData =
                annotationTypeDataRetrieval.retrieveSearchAnnotationTypeData({
                    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
                    dataPageStateManager_DataFrom_Server
                });

            const searchProgramsPerSearchDataRetrieval = new SearchProgramsPerSearchDataRetrieval();

            const promise_retrieveSearchProgramsPerSearchData =
                searchProgramsPerSearchDataRetrieval.retrieveSearchProgramsPerSearchData(
                    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
                    dataPageStateManager_DataFrom_Server
                );

            const promise_defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result =
                defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval({ projectIdentifier: projectIdentifierFromURL });

            const promiseAll = Promise.all([ promise_retrieveSearchAnnotationTypeData, promise_retrieveSearchProgramsPerSearchData, promise_defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result ] );
            promiseAll.catch( (reason) => {
                reject(reason)
            })
            promiseAll.then( ([ result1, result2, defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result ]) => {

                resolve({
                    annotationTypeData_Root: dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root(),
                    searchProgramsPerSearchData_Root: dataPageStateManager_DataFrom_Server.get_searchProgramsPerSearchData_Root(),
                    defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result
                })
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    } );
}


/**
 * Process values from webservice calls into data for the Page Component
 */
const _create_Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result = function ( internal_Intermediate_GetFromServer_Result : Internal_Intermediate_GetFromServer_Result )

    : Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result {

    const set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result = new Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result();

    add_AnnotationType_SearchProgram_Data__To__Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result({
        internal_Intermediate_GetFromServer_Result,
        set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result
    })

    return set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result;
}


/**
 * Process values from webservice calls into data for the Page Component
 */
const add_AnnotationType_SearchProgram_Data__To__Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result = function (
    {
        internal_Intermediate_GetFromServer_Result,
        set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result
    } : {
        internal_Intermediate_GetFromServer_Result : Internal_Intermediate_GetFromServer_Result
        set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result : Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result

    }): void {

    const data_Per_SearchProgram_Map_Key_searchProgramName = new Map<string, Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_SearchProgram>()

    set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result.data_Per_SearchProgram_Map_Key_searchProgramName = data_Per_SearchProgram_Map_Key_searchProgramName;

    const annotationTypeData_Root = internal_Intermediate_GetFromServer_Result.annotationTypeData_Root
    const searchProgramsPerSearchData_Root = internal_Intermediate_GetFromServer_Result.searchProgramsPerSearchData_Root
    const defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result = internal_Intermediate_GetFromServer_Result.defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result;

    const searchProgramsPerSearchItems_PerProjectSearchId_Map = searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map
    const annotationTypeItems_PerProjectSearchId_Map = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map

    for ( const annotationTypeItems_PerProjectSearchId_Map_Entry of annotationTypeItems_PerProjectSearchId_Map.entries() ) {

        const annotationTypeItems_ForProjectSearchId = annotationTypeItems_PerProjectSearchId_Map_Entry[ 1 ];

        const projectSearchId = annotationTypeItems_ForProjectSearchId.projectSearchId

        const searchProgramsPerSearchItems_ForProjectSearchId = searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId )
        if ( ! searchProgramsPerSearchItems_ForProjectSearchId ) {
            const msg = "searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId;
            console.warn( msg + ", searchProgramsPerSearchItems_PerProjectSearchId_Map: ", searchProgramsPerSearchItems_PerProjectSearchId_Map )
            throw Error(msg)
        }
        const searchProgramsPerSearchItem_Map = searchProgramsPerSearchItems_ForProjectSearchId.searchProgramsPerSearchItem_Map

        //  Process PSM Annotation Type Entries

        if ( annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes ) {

            for ( const psmFilterableAnnotationTypes_Entry of annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.entries() ) {

                const psmFilterableAnnotationType = psmFilterableAnnotationTypes_Entry[ 1 ];

                const searchProgramsPerSearchItem = searchProgramsPerSearchItem_Map.get( psmFilterableAnnotationType.searchProgramsPerSearchId);
                if ( ! searchProgramsPerSearchItem ) {
                    const msg = "searchProgramsPerSearchItem_Map.get( psmFilterableAnnotationType.searchProgramsPerSearchId); returned nothing. psmFilterableAnnotationType.searchProgramsPerSearchId: " +
                        psmFilterableAnnotationType.searchProgramsPerSearchId + ", projectSearchId: " + projectSearchId;
                    console.warn( msg + ", searchProgramsPerSearchItem_Map: ", searchProgramsPerSearchItem_Map )
                    throw Error(msg)
                }

                let data_Per_SearchProgram = data_Per_SearchProgram_Map_Key_searchProgramName.get( searchProgramsPerSearchItem.name )
                if ( ! data_Per_SearchProgram ) {
                    data_Per_SearchProgram = new Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_SearchProgram()
                    data_Per_SearchProgram.searchProgram_name = searchProgramsPerSearchItem.name
                    data_Per_SearchProgram_Map_Key_searchProgramName.set( searchProgramsPerSearchItem.name, data_Per_SearchProgram )
                }
                if ( ! data_Per_SearchProgram.data_PerType_PSM ) {
                    data_Per_SearchProgram.data_PerType_PSM = new Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_Type_PSM_Peptide_Protein();
                }
                if ( ! data_Per_SearchProgram.data_PerType_PSM.data_Per_AnnotationType_Name_Map_Key_AnnotationName ) {
                    data_Per_SearchProgram.data_PerType_PSM.data_Per_AnnotationType_Name_Map_Key_AnnotationName = new Map()
                }
                let data_Per_AnnotationType_Name = data_Per_SearchProgram.data_PerType_PSM.data_Per_AnnotationType_Name_Map_Key_AnnotationName.get( psmFilterableAnnotationType.name );
                if ( ! data_Per_AnnotationType_Name ) {
                    data_Per_AnnotationType_Name = new Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_AnnotationType_Name();
                    data_Per_AnnotationType_Name.annotationType_Name = psmFilterableAnnotationType.name
                    data_Per_AnnotationType_Name.defaultValue_ProjectWide_String_InProgress = "" // initialize to empty string
                    data_Per_SearchProgram.data_PerType_PSM.data_Per_AnnotationType_Name_Map_Key_AnnotationName.set( psmFilterableAnnotationType.name, data_Per_AnnotationType_Name );
                }
                if ( psmFilterableAnnotationType.defaultFilterValue !== undefined && psmFilterableAnnotationType.defaultFilterValue !== null ) {

                    if (!data_Per_AnnotationType_Name.defaultValues_From_AnnotationType_Records_Set) {
                        data_Per_AnnotationType_Name.defaultValues_From_AnnotationType_Records_Set = new Set()
                    }
                    data_Per_AnnotationType_Name.defaultValues_From_AnnotationType_Records_Set.add(psmFilterableAnnotationType.defaultFilterValue);
                }
            }
        }

        //  Process Reported Peptide Annotation Type Entries

        if ( annotationTypeItems_ForProjectSearchId.reportedPeptideFilterableAnnotationTypes ) {

            for ( const reportedPeptideFilterableAAnnotationTypes_Entry of annotationTypeItems_ForProjectSearchId.reportedPeptideFilterableAnnotationTypes.entries() ) {

                const reportedPeptideFilterableAAnnotationType = reportedPeptideFilterableAAnnotationTypes_Entry[ 1 ];

                const searchProgramsPerSearchItem = searchProgramsPerSearchItem_Map.get( reportedPeptideFilterableAAnnotationType.searchProgramsPerSearchId);
                if ( ! searchProgramsPerSearchItem ) {
                    const msg = "searchProgramsPerSearchItem_Map.get( reportedPeptideFilterableAAnnotationType.searchProgramsPerSearchId); returned nothing. reportedPeptideFilterableAAnnotationType.searchProgramsPerSearchId: " +
                        reportedPeptideFilterableAAnnotationType.searchProgramsPerSearchId + ", projectSearchId: " + projectSearchId;
                    console.warn( msg + ", searchProgramsPerSearchItem_Map: ", searchProgramsPerSearchItem_Map )
                    throw Error(msg)
                }

                let data_Per_SearchProgram = data_Per_SearchProgram_Map_Key_searchProgramName.get( searchProgramsPerSearchItem.displayName )
                if ( ! data_Per_SearchProgram ) {
                    data_Per_SearchProgram = new Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_SearchProgram()
                    data_Per_SearchProgram_Map_Key_searchProgramName.set( searchProgramsPerSearchItem.displayName, data_Per_SearchProgram )
                }
                if ( ! data_Per_SearchProgram.data_PerType_Peptide ) {
                    data_Per_SearchProgram.data_PerType_Peptide = new Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_Type_PSM_Peptide_Protein();
                }
                if ( ! data_Per_SearchProgram.data_PerType_Peptide.data_Per_AnnotationType_Name_Map_Key_AnnotationName ) {
                    data_Per_SearchProgram.data_PerType_Peptide.data_Per_AnnotationType_Name_Map_Key_AnnotationName = new Map()
                }
                let data_Per_AnnotationType_Name = data_Per_SearchProgram.data_PerType_Peptide.data_Per_AnnotationType_Name_Map_Key_AnnotationName.get( reportedPeptideFilterableAAnnotationType.name );
                if ( ! data_Per_AnnotationType_Name ) {
                    data_Per_AnnotationType_Name = new Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_AnnotationType_Name();
                    data_Per_AnnotationType_Name.annotationType_Name = reportedPeptideFilterableAAnnotationType.name
                    data_Per_SearchProgram.data_PerType_Peptide.data_Per_AnnotationType_Name_Map_Key_AnnotationName.set( reportedPeptideFilterableAAnnotationType.name, data_Per_AnnotationType_Name );
                }

                if ( reportedPeptideFilterableAAnnotationType.defaultFilterValue !== undefined && reportedPeptideFilterableAAnnotationType.defaultFilterValue !== null ) {

                    if ( ! data_Per_AnnotationType_Name.defaultValues_From_AnnotationType_Records_Set ) {
                        data_Per_AnnotationType_Name.defaultValues_From_AnnotationType_Records_Set = new Set()
                    }
                    data_Per_AnnotationType_Name.defaultValues_From_AnnotationType_Records_Set.add( reportedPeptideFilterableAAnnotationType.defaultFilterValue );
                }
            }
        }
    }

    //  Apply defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result to data structure

    {
        if (
            ( defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result.defaultFilter_Cutoffs_Overrides_PSM
                && defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result.defaultFilter_Cutoffs_Overrides_PSM.defaultFilter_Cutoffs_Overrides_Per_SearchProgramName
                && defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result.defaultFilter_Cutoffs_Overrides_PSM.defaultFilter_Cutoffs_Overrides_Per_SearchProgramName.size > 0 )
            || ( defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result.defaultFilter_Cutoffs_Overrides_ReportedPeptide
                && defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result.defaultFilter_Cutoffs_Overrides_ReportedPeptide.defaultFilter_Cutoffs_Overrides_Per_SearchProgramName
                && defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result.defaultFilter_Cutoffs_Overrides_ReportedPeptide.defaultFilter_Cutoffs_Overrides_Per_SearchProgramName.size > 0 )
            || ( defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result.defaultFilter_Cutoffs_Overrides_MatchedProtein
            && defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result.defaultFilter_Cutoffs_Overrides_MatchedProtein.defaultFilter_Cutoffs_Overrides_Per_SearchProgramName
            && defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result.defaultFilter_Cutoffs_Overrides_MatchedProtein.defaultFilter_Cutoffs_Overrides_Per_SearchProgramName.size > 0 ) ) {

            //  Have Overrides so apply them

            for ( const mapEntry_For_Per_SearchProgram of set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result.data_Per_SearchProgram_Map_Key_searchProgramName.entries() ) {

                const result_For_Per_SearchProgram = mapEntry_For_Per_SearchProgram[ 1 ]

                const searchProgram_name = result_For_Per_SearchProgram.searchProgram_name

                if ( result_For_Per_SearchProgram.data_PerType_Peptide ) {

                    _get_defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Data_Per_Type({
                        searchProgram_name,
                        resultData_PerType: result_For_Per_SearchProgram.data_PerType_Peptide,
                        defaultFilter_Cutoffs_Overrides_PerType: defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result.defaultFilter_Cutoffs_Overrides_ReportedPeptide
                    });
                }

                if ( result_For_Per_SearchProgram.data_PerType_PSM ) {

                    _get_defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Data_Per_Type({
                        searchProgram_name,
                        resultData_PerType: result_For_Per_SearchProgram.data_PerType_PSM,
                        defaultFilter_Cutoffs_Overrides_PerType: defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Result.defaultFilter_Cutoffs_Overrides_PSM
                    });
                }
            }
        }
    }
}

const _get_defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval_Data_Per_Type = function (
    {
        searchProgram_name, resultData_PerType, defaultFilter_Cutoffs_Overrides_PerType
    } : {
        searchProgram_name: string
        resultData_PerType: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_Type_PSM_Peptide_Protein

        defaultFilter_Cutoffs_Overrides_PerType: DefaultFilter_Cutoffs_Overrides_ProjectWide_PerType_PSM_ReportedPeptide_MatchedProtein
    }
) : void {

    if ( ! defaultFilter_Cutoffs_Overrides_PerType ) {
        //  NO defaults for this type
        return; // EARLY RETURN
    }
    if ( ! defaultFilter_Cutoffs_Overrides_PerType.defaultFilter_Cutoffs_Overrides_Per_SearchProgramName ) {
        //  NO defaults for this type
        return; // EARLY RETURN
    }
    const defaultFilter_Cutoffs_Overrides_For_SearchProgramName = defaultFilter_Cutoffs_Overrides_PerType.defaultFilter_Cutoffs_Overrides_Per_SearchProgramName.get( searchProgram_name );
    if ( ! defaultFilter_Cutoffs_Overrides_For_SearchProgramName ) {
        //  NO defaults for this searchProgram_name
        return; // EARLY RETURN
    }
    if ( ! defaultFilter_Cutoffs_Overrides_For_SearchProgramName.defaultFilter_Cutoffs_Overrides_Per_AnnotationTypeName ) {
        //  NO defaults for this searchProgram_name
        return; // EARLY RETURN
    }

    for ( const mapEntry_For_Per_AnnotationType_Name of resultData_PerType.data_Per_AnnotationType_Name_Map_Key_AnnotationName.entries() ) {

        const entry_For_For_AnnotationType_Name = mapEntry_For_Per_AnnotationType_Name[ 1 ];
        const annotationType_Name = entry_For_For_AnnotationType_Name.annotationType_Name;

        const defaultFilter_Cutoffs_Overrides_For_AnnotationTypeName = defaultFilter_Cutoffs_Overrides_For_SearchProgramName.defaultFilter_Cutoffs_Overrides_Per_AnnotationTypeName.get( annotationType_Name );

        if ( defaultFilter_Cutoffs_Overrides_For_AnnotationTypeName ) {
            //  Have overrides for this Type and searchProgram_name and annotationType_Name.  Apply them

            entry_For_For_AnnotationType_Name.defaultValue_ProjectWide_Number_FromDB = defaultFilter_Cutoffs_Overrides_For_AnnotationTypeName.defaultValue_ProjectWide_Number;
            entry_For_For_AnnotationType_Name.defaultValue_ProjectWide_String_FromDB = defaultFilter_Cutoffs_Overrides_For_AnnotationTypeName.defaultValue_ProjectWide_String;
            entry_For_For_AnnotationType_Name.defaultValue_ProjectWide_String_InProgress = defaultFilter_Cutoffs_Overrides_For_AnnotationTypeName.defaultValue_ProjectWide_String;
        }
    }

}

/**
 *
 */
const _populate_Arrays_From_Maps_And_Sort__ROOT = function (  result: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result ) : void {

    result.data_Per_SearchProgram_Array = [];

    for ( const mapEntry of result.data_Per_SearchProgram_Map_Key_searchProgramName.entries() ) {

        const mapValue = mapEntry[ 1 ]
        result.data_Per_SearchProgram_Array.push( mapValue );

        _populate_Arrays_From_Maps_And_Sort__Result_Per_SearchProgram( mapValue );
    }

    result.data_Per_SearchProgram_Array.sort( (a,b) => {
        return  a.searchProgram_name.localeCompare( b.searchProgram_name);
    })
}

/**
 *
 */
const _populate_Arrays_From_Maps_And_Sort__Result_Per_SearchProgram = function (  result_Per_SearchProgram: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_SearchProgram ) {

    _populate_Arrays_From_Maps_And_Sort__Result_Per_Type_PSM_Peptide_Protein( result_Per_SearchProgram.data_PerType_Peptide );
    _populate_Arrays_From_Maps_And_Sort__Result_Per_Type_PSM_Peptide_Protein( result_Per_SearchProgram.data_PerType_PSM );
}

/**
 *
 */
const _populate_Arrays_From_Maps_And_Sort__Result_Per_Type_PSM_Peptide_Protein = function (  result_Per_Type_PSM_Peptide_Protein: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_Type_PSM_Peptide_Protein ) {

    if ( ! result_Per_Type_PSM_Peptide_Protein ) {
        //  No data so EXIT
        return; // EARLY RETURN
    }

    result_Per_Type_PSM_Peptide_Protein.data_Per_AnnotationType_Name_Array = [];

    for ( const mapEntry of result_Per_Type_PSM_Peptide_Protein.data_Per_AnnotationType_Name_Map_Key_AnnotationName.entries() ) {

        const data_Per_AnnotationType_Name = mapEntry[ 1 ];
        result_Per_Type_PSM_Peptide_Protein.data_Per_AnnotationType_Name_Array.push( data_Per_AnnotationType_Name )

        if ( data_Per_AnnotationType_Name.defaultValues_From_AnnotationType_Records_Set && data_Per_AnnotationType_Name.defaultValues_From_AnnotationType_Records_Set.size > 0 ) {

            const defaultValues_From_AnnotationType_Records_Array = Array.from( data_Per_AnnotationType_Name.defaultValues_From_AnnotationType_Records_Set );
            defaultValues_From_AnnotationType_Records_Array.sort( (a,b) => {
                if ( a < b ) {
                    return -1;
                }
                if ( a > b ) {
                    return 1;
                }
                return 0;
            })
            data_Per_AnnotationType_Name.defaultValues_From_AnnotationType_Records_DisplayString = defaultValues_From_AnnotationType_Records_Array.join( ", " );
        }
    }

    result_Per_Type_PSM_Peptide_Protein.data_Per_AnnotationType_Name_Array.sort( (a,b) => {
        return  a.annotationType_Name.localeCompare( b.annotationType_Name);
    })
}
